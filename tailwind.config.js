module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: '8px',
      },
      colors: {
        'chai-red': "#FF2A2A",
        'error-red': 'rgba(255, 101, 66, 1)',
        'grey': "#8F8F8F"
      },
      keyframes: {
        fade: {
          '100%': { backgroundColor: 'rgba(0,0,0,0.5)' },
        },
        modal: {
          '0%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '0.5', backgroundColor: 'black' },
          '100%': { opacity: '0', display: 'none' },
        },
        modalOut: {
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        "notification-open": {
          '0%': { transform: 'translate(100%)' },
        },
        "notification-close": {
          "50%": { opacity: 0.5 },
          "100%": { height: "0px", padding: "0px" }
        },
        "sidebar-close": {
          '100%': { transform: 'translate(100%)', display: 'none' },
        },
        "drawer-open": {
          '0%': { transform: 'translate(0, 100%)' }
        },
        "drawer-close": {
          '100%': { transform: 'translate(0, 100%)' }
        },
        "slick-loader": {
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        fade: 'fade 0.1s linear 1 normal forwards',
        modal: 'modal 0.1s linear 1 normal forwards',
        modalOut: 'modalOut 0.1s linear 1 normal forwards',
        fadeOut: 'fadeOut 0.1s linear 1 normal forwards',
        'notification-slide': 'notification-open 0.3s linear 1 normal forwards',
        'notification-close': 'notification-close 0.2s linear 1 normal forwards',
        'sidebar-close': 'sidebar-close 0.2s linear 1 normal forwards',
        'spin-fast': 'spin 0.5s linear infinite',
        'drawer-open': 'drawer-open 0.3s linear 1 normal forwards',
        'drawer-close': 'drawer-close 0.3s linear 1 normal forwards',
        'slick-loader': 'slick-loader 1s infinite linear'
      },
      boxShadow: {
        'itemBlue': '0 2px 30px -10px rgba(59, 130, 246, var(--tw-border-opacity))',
        'red': '0 2px 20px -5px #dc2626',
      }
    },
  },
  plugins: [],
}
