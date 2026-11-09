/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "med-emerald": "#087F5B",
        "med-forest": "#064E3B",
        "med-bg": "#F8FAF9",
        "med-mint": "#B7F0D3",
        "med-charcoal": "#172B25",
        "med-surface": "#FFFFFF",
        "med-muted": "#EFF5F2",
        "med-border": "#DCE8E2",
      },
    },
  },
  plugins: [],
};
