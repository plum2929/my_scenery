module.exports = {
  content: [
    './app/views/**/*.html.slim',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
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
          "base-100": "#ffffff",
          "base-200": "#eaf6f9",
          "info": "#4799ea",
          "success": "#a3ccf4",
          "warning": "#ffd865",
          "error": "#ff3232",
        }
      }
    ]
  }
}
