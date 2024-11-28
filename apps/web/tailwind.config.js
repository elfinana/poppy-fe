/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        gray: {
          50: '#f7f8fa',
          100: '#ebedf4',
          200: '#d7d8db',
          300: '#c0c2c5',
          400: '#a1a4a9',
          500: '#898c8e',
          600: '#78797c',
          700: '#616264',
          800: '#424242',
          900: '#212121',
        },
        black: '#000000',
        blue: {
          100: '#f3f6ff',
          200: '#e0e8ff',
          300: '#b3c6fc',
          400: '#9bb6ff',
          500: '#7c9df8',
          600: '#698df3',
          700: '#5885fc',
          800: '#5c7add',
        },
        purple: {
          500: '#b99af7', // use 90% of opacity
          600: '#b199e2',
          700: '#9b7cd9',
        },
        yellow: '#faca60',
        warning: '#eb535d',
        informative: '#5599ff',
        background: 'hsl(var(--background))', // required
        foreground: 'hsl(var(--foreground))', // required
        border: 'hsl(var(--border))', // required
      },
      fontSize: {
        h1: [
          '20px',
          {
            lineHeight: '24px',
            fontWeight: '600',
          },
        ],
        h2: [
          '17px',
          {
            lineHeight: '24px',
            fontWeight: '600',
          },
        ],
        h3: [
          '16px',
          {
            lineHeight: '20px',
            fontWeight: '600',
          },
        ],
        h4: [
          '15px',
          {
            lineHeight: '20px',
            fontWeight: '600',
          },
        ],
        b1: [
          '15px',
          {
            lineHeight: '20px',
            fontWeight: '500',
          },
        ],
        b2: [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '500',
          },
        ],
        b3: [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '400',
          },
        ],
        b3_com: [
          '14px',
          {
            lineHeight: '18px',
            fontWeight: '400',
          },
        ],
        b4: [
          '13px',
          {
            lineHeight: '16px',
            fontWeight: '500',
          },
        ],
        b5: [
          '13px',
          {
            lineHeight: '16px',
            fontWeight: '400',
          },
        ],
        c1: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '500',
          },
        ],
        c2: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '400',
          },
        ],
        c3: [
          '11px',
          {
            lineHeight: '14px',
            fontWeight: '500',
          },
        ],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      width: {
        mobile: '375px',
        343: '343px',
        300: '300px',
        240: '240px',
      },
      height: {
        48: '48px',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
