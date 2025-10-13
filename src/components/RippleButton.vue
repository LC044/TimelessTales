<template>
    <div class="ripple-wrapper" @click="createRipple">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };
  </script>
  
  <style scoped>
  .ripple-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(147, 51, 234, 0.5);
    transform: scale(0);
    animation: ripple-effect 0.6s linear;
  }
  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  </style>
  