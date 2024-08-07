module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
            sans: ['Roboto', 'Arial', 'Calibri', 'sans-serif'],
            serif: ['Times New Roman', 'Merriweather', 'Cambria', 'serif'],
            mono: ['Menlo', 'monospace'],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#006CB2",
            "secondary": "#212121",
            "accent": "#008968",
            "neutral": "#003334",
            "base-100": "#f5f5f5",
            "info": "#00aaec",
            "success": "#76ad00",
            "warning": "#955d00",
            "error": "#ef4b6e",
          },
        },
      ],
    },
  };
