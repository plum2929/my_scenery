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
          "accent": "#f7bae8",
          "neutral": "#291334",
          "base-100": "#FAF7F5",
          "info": "#5b7ad6",
          "success": "#a3ccf4",
          "warning": "#ffd865",
          "error": "#ea4770",
        }
      }
    ]
  }
}
