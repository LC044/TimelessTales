<template>
  <div
    class="device"
    :style="{...deviceStyle, transformOrigin: 'top left'}"
    @pointerdown.self.stop
  >
    <div class="head" @pointerdown.prevent="startDrag" @pointerup="endDrag" @pointercancel="endDrag">
      <div>
        <div class="title">{{ label }}</div>
        <div class="small">{{ viewW }}×{{ viewH }} @ {{ (scale*100).toFixed(0) }}%</div>
      </div>
      <div>
        <button class="small-btn" @click.stop="resetPosition">重置</button>
      </div>
    </div>

    <div class="viewport">
      <div class="screen" :style="{width:viewW + 'px', height: viewH + 'px'}">
        <iframe
          v-if="validUrl"
          :src="sanitizedSrc"
          class="inner-frame"
          ref="iframeEl"
        ></iframe>
        <div v-else class="empty-msg">
          无效或为空 URL<br/>请在上方输入有效网址（以 http/https 开头）
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export default {
  name: 'DevicePreview',
  props: {
    url: { type: String, default: '' },
    label: { type: String, default: '设备' },
    // device viewport in CSS pixels (模拟真实设备视口)
    viewW: { type: Number, required: true },
    viewH: { type: Number, required: true },
    // initial position (x,y) in px relative to workspace
    initX: { type: Number, default: 50 },
    initY: { type: Number, default: 50 },
    scalePercent: {
      type: Number,
      default: 100
    }
    // container scale (optional) - not used here but kept for extension
  },
  emits: ['update:position'],
  setup(props, ctx) {
    const pos = ref({ x: props.initX, y: props.initY })
    const scale = ref(1) // real scale factor (1 = 100%)
    const localScalePercent = ref(100)

    // compute scale based on provided percent
    const onScaleChange = () => {
      scale.value = props.scalePercent / 100
    }

    // initialize
    onScaleChange()

    const dragging = ref(false)
    const dragStart = ref({ x: 0, y: 0 })
    const startPos = ref({ x: 0, y: 0 })
    const el = ref(null)

    const deviceStyle = computed(() => {
      // scale为当前实际宽度除以viewW得到的比例
    //   scale.value = el.value.offsetWidth / props.viewW
      return {
        transform: `scale(${props.scalePercent / 100})`,
        left: props.initX + 'px',
        top: props.initY + 'px',
        width: (props.viewW) + 'px',
        height: (props.viewH) + 'px',
      }
    })

    const iframeStyle = computed(() => {
      // Scale the real iframe so that its internal viewport equals the specified viewW/viewH
      // We'll render the iframe at 100% of the .screen size and then scale its content via CSS transform.
      // Here, we trust the iframe to render responsiveness. The `transform: scale(scale)` will visually zoom.
      return {
        transform: `scale(${props.scalePercent / 100})`,
        width: props.viewW + 'px',
        height: props.viewH + 'px',
      }
    })

    // Basic url sanitizer (ensure protocol)
    const sanitizedSrc = computed(() => {
      if (!props.url) return ''
      try {
        const u = new URL(props.url)
        return u.href
      } catch (e) {
        // try adding https
        try {
          const u2 = new URL('https://' + props.url)
          return u2.href
        } catch (e2) {
          return ''
        }
      }
    })

    const validUrl = computed(() => !!sanitizedSrc.value)

    function startDrag(e) {
      // pointerdown already captured on handle
      dragging.value = true
      dragStart.value = { x: e.clientX, y: e.clientY }
      startPos.value = { x: props.initX, y: props.initY }
      // capture pointer to this element so we continue receiving pointermove/up
      e.target.setPointerCapture(e.pointerId)
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    }

    function onMove(e) {
      if (!dragging.value) return
      const dx = e.clientX - dragStart.value.x
      const dy = e.clientY - dragStart.value.y
      pos.value.x = Math.max(0, startPos.value.x + dx)
      pos.value.y = Math.max(0, startPos.value.y + dy)
      ctx.emit('update:position', { x: pos.value.x, y: pos.value.y })
    }

    function endDrag(e) {
      // called by pointerup handlers
      dragging.value = false
      try { e.target.releasePointerCapture(e.pointerId) } catch (err) {}
    }

    function onUp(e) {
      dragging.value = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    function resetPosition() {
      pos.value = { x: props.initX, y: props.initY }
      ctx.emit('update:position', { x: pos.value.x, y: pos.value.y })
    }

    function openInNewTab() {
      if (!sanitizedSrc.value) return
      window.open(sanitizedSrc.value, '_blank')
    }

    // watch prop url -> reset iframe scale to default
    watch(() => props.url, () => {
      localScalePercent.value = 100
      onScaleChange()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    })

    return {
      pos, deviceStyle, startDrag, endDrag, iframeStyle, sanitizedSrc, validUrl,
      localScalePercent, onScaleChange, openInNewTab, resetPosition,
      el,scale
    }
  }
}
</script>

<style scoped>
:root{
  --bg: #f3f4f6;
  --card: #ffffff;
  --accent: #4caf50;
  --muted: #9aa4ae;
}

*{box-sizing:border-box}
html,body,#app{height:100%; margin:0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial;}

body {
  background: linear-gradient(180deg,#f5f7fa,#e9eef3);
  padding: 20px;
}

/* Container layout */
.toolbar {
  display:flex;
  gap:10px;
  align-items:center;
  margin-bottom:12px;
}
.input-url {
  flex:1;
  display:flex;
  gap:8px;
  align-items:center;
}
.input-url input[type="text"]{
  width:100%;
  padding:10px 12px;
  border-radius:6px;
  border:1px solid #d0d7de;
  background:var(--card);
  outline:none;
}
.btn {
  padding:10px 12px;
  border-radius:6px;
  border:none;
  background:var(--accent);
  color:white;
  cursor:pointer;
}
.btn.secondary{
  background:#6b7280;
}

.controls {
  display:flex;
  gap:8px;
  align-items:center;
}

.workspace {
  position:relative;
  width: 100%;
  height: calc(100vh - 130px);
  background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4));
  border-radius:12px;
  border:1px solid rgba(0,0,0,0.04);
  box-shadow: 0 10px 30px rgba(22,28,37,0.06);
  overflow:hidden;
}

/* Device card wrapper (draggable) */
.device {
  position:absolute;
  user-select:none;
  touch-action:none;
  display:flex;
  flex-direction:column;
  width: 320px; /* visual size before scaling */
  height: 220px;
  border-radius:8px;
  background: rgba(255,255,255,0.95);
  border:1px solid rgba(0,0,0,0.06);
  box-shadow: 0 6px 18px rgba(12,18,22,0.06);
  overflow:visible;
}

/* Header (drag handle) */
.device .head {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:8px 10px;
  border-bottom:1px solid rgba(0,0,0,0.04);
  cursor:grab;
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,245,245,0.98));
}
.device .head .title {
  font-size:13px;
  color:#24303a;
}
.device .head .small {
  font-size:12px;
  color:var(--muted);
}

/* viewport frame (centered iframe scaled inside) */
.viewport {
  position:relative;
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0px;
  background: #f8fafc;
}

/* The inner "screen" that will be scaled */
.screen {
  width:100%;
  height:100%;
  background:white;
  border-radius:6px;
  overflow:hidden;
  display:flex;
  justify-content:center;
  align-items:center;
  border:1px solid rgba(0,0,0,0.04);
  box-shadow: inset 0 -6px 18px rgba(0,0,0,0.02);
}

/* iframe scaled via transform */
.screen .inner-frame{
  transform-origin: top left;
  width: 100%;
  height: 100%;
  border:0;
}

/* small text when iframe not available */
.empty-msg{
  padding:10px;
  color:var(--muted);
  font-size:13px;
  text-align:center;
}

/* footer controls inside device (scale slider & reset) */
.device .footer {
  padding:8px;
  display:flex;
  gap:8px;
  align-items:center;
  border-top:1px solid rgba(0,0,0,0.04);
}
.device input[type=range]{width:120px}
.small-btn{padding:6px 8px; border-radius:6px; border:1px solid rgba(0,0,0,0.06); background:white; cursor:pointer; font-size:12px}

/* responsive small touches */
@media (max-width:900px){
  .workspace{height:calc(100vh - 200px)}
}

</style>
