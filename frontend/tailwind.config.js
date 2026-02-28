/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eef0ff',
                    100: '#dfe2ff',
                    200: '#c4c8ff',
                    300: '#a2a8ff',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4640de',
                    700: '#3730b3',
                    800: '#2f2b8f',
                    900: '#262470',
                },
                secondary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7e22ce',
                    800: '#6b21a8',
                    900: '#581c87',
                },
                accent: {
                    50: '#fef3c7',
                    100: '#fde68a',
                    200: '#fcd34d',
                    300: '#fbbf24',
                    400: '#f59e0b',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#92400e',
                    900: '#78350f',
                },
            },
            fontFamily: {
                clash: ['var(--font-clash)', 'sans-serif'],
                epilogue: ['var(--font-epilogue)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
            },
            spacing: {
                'section': '4rem',
                'card': '1.5rem',
                'container': '1rem',
            },
            fontSize: {
                'hero': '3.5rem',
                'heading1': '2.5rem',
                'heading2': '2rem',
                'heading3': '1.5rem',
                'body': '1rem',
                'small': '0.875rem',
            },
            lineHeight: {
                'relaxed': '1.6',
                'loose': '1.8',
            },
        },
    },
    plugins: [],
};
