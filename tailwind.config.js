module.exports = {
  content: [
    './app/views/**/*.html.slim',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Petrona', 'serif']
      },
      fontSize: {
        xxs: ['10px', '8px']
      },
      colors: {
        'icon': '#78a5b4'
      }
    }
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#5bb7d6",
          "secondary": "#93d1a3",
          "accent": "#056382",
          "neutral": "#291334",
          "base-100": "#F7FAFB",
          "base-200": "#eaf6f9",
          "info": "#c9e0e8",
          "success": "#cce5ff",
          "warning": "#ffcccc",
          "error": "#ff3232",
        }
      }
    ]
  }
}
