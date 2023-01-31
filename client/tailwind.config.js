module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        nunito:["Nunito"],
        spectral:["Spectral"],
        hahmlet:["Hahmlet"],
        biorhyme:["BioRhyme"],
        cormorant:["Cormorant"],
        cormorantMedium:["Cormorant_Medium"]
      },
      backgroundImage:{
        'bgImage':"url('../public/img/bg_image.jpg')"
      }
    },
  },
  plugins: [],
}
