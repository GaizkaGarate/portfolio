/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                black: '#0f0f0f',
                gray: '#3f3f3f',
                white: '#fff',
            },
            fontFamily: {
                sans: ['Inter', 'Geist Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
