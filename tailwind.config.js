module.exports = {
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    options: {
      sefelist: ["block", "hidden", "mt-8", "mx-auto"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
