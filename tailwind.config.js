module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: "Poppins",
    },
    extend: {
      fontSize: {
        xxs: ".6rem",
      },

      minHeight: {
        screenx: "90vh",
        screenxx: "70vh",
      },
      height: {
        screenx: "90vh",
        screenxx: "70vh",
      },
    },
    variants: {},
  },
  plugins: [],
};
