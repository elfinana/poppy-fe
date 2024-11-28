/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        blue100: '#F3F6FF',
        blue300: '#B3C6FC',
        blue400: '#7C9DF8',
        blue500: '#698DF3',
        blue600: '#698DF3',
        blue700: '#5885FC',
        blue800: '#5C7ADD',
        gray50: '#F7F8FA',
        gray100: '#EBEDF4',
        gray200: '#DBDFE8',
        gray300: '#C1C5CD',
        gray400: '#A3A8B2',
        gray500: '#8B9097',
        gray600: '#787B85',
        gray700: '#646670',
        gray800: '#4A4D51',
        gray900: '#212121',
        red: '#EB535D',
        blue: '#5599FF',
        purple: '#B99AF790',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
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
          '14px',
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
            fontWeight: '600',
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
