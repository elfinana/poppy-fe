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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        white: '#ffffff',
        gray50: '#f7f8fa',
        gray100: '#ebedf4',
        gray200: '#d7d8db',
        gray300: '#c0c2c5',
        gray400: '#a1a4a9',
        gray500: '#898c8e',
        gray600: '#78797c',
        gray700: '#616264',
        gray800: '#424242',
        gray900: '#212121',
        black: '#000000',
        blue100: '#f3f6ff',
        blue200: '#e0e8ff',
        blue300: '#b3c6fc',
        blue400: '#9bb6ff',
        blue500: '#7c9df8',
        blue600: '#698df3',
        blue700: '#5885fc',
        blue800: '#5c7add',
        purple500: '#b99af7', // use 90% of opacity
        purple600: '#b199e2',
        purple700: '#9b7cd9',
        yellow: '#faca60',
        warning: '#eb535d',
        informative: '#5599ff',
        background: 'hsl(var(--background))', // required
        foreground: 'hsl(var(--foreground))', // required
        border: 'hsl(var(--border))', // required
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
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
      width: {
        mobile: '375px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
