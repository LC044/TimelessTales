/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: {
        // 1. 纯色值
        'light-bg': '#FAFAFA', // 自定义主色
        'light-bg1': '#f8fafc',
        'light-text1': '#333333',
        'light-text2': '#2C3E50',
        'light-text3': '#34495E',

        // 1. 浅色模式背景
        'light-beige': '#FAFAFA',
        'light-gray': '#F5F5F5',
        'light-warm-white': '#FDFDFD',
        
        // 2. 深色模式背景
        'dark-gray-blue': '#282C34',
        'dark-navy': '#1E293B',
        'dark-warm-gray': '#333333',
        
        // 3. 浅色背景下前景色
        'light-dark-gray': '#333333',
        'light-charcoal': '#2C3E50',
        'light-blue-gray': '#34495E',

        // 4. 深色背景下前景色
        'dark-warm-gray': '#E0E0E0', // 注意：与深色背景的“暖深灰”同名但色值不同？可调整为“dark-text-warm-gray”避免冲突
        'dark-blue-gray': '#CBD5E1',
        'dark-gray-yellow': '#E6E2AF',
        
        // 5. 辅助色（清新系）
        'accent-fresh-blue': '#4FC3F7',
        'accent-fresh-mint': '#4DB6AC',
        'accent-fresh-purple': '#9575CD',
        
        // 6. 辅助色（自然系）
        'accent-natural-brown': '#8D6E63',
        'accent-natural-gray-blue': '#78909C',
        'accent-natural-light-cyan': '#5F9EA0',
      },
  } },
  plugins: [],
}

