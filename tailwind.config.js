/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],

    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                light: {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    ...require('daisyui/src/colors/themes')[
                        '[data-theme=light]'
                    ],
                    primary: '#000036',
                    '--rounded-btn': '0',
                    '.box-glow': {
                        'box-shadow': '0 0 6px #BF8643, 0 0 12px #BF8643',
                    },
                },
                dark: {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    ...require('daisyui/src/colors/themes')[
                        '[data-theme=dark]'
                    ],
                    primary: '#F3F3F3',
                    'primary-content': '#000036',
                    '--rounded-btn': '0',
                    '.box-glow': {
                        'box-shadow': '0 0 6px #BF8643, 0 0 12px #BF8643',
                    },
                },
            },
        ],
    },
    plugins: [require('daisyui')],
}
