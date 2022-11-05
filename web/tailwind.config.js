/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        inherit: "inherit",
        none: "none"
      },
      minHeight: (theme) => ({
        ...theme("spacing")
      }),
      maxHeight: (theme) => ({
        ...theme("spacing")
      }),
      minWidth: (theme) => ({
        ...theme("spacing")
      }),
      maxWidth: (theme) => ({
        ...theme("spacing")
      })
    }
  },
  plugins: [require("@tailwindcss/line-clamp")]
};