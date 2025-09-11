module.exports = {
  // Enable dark mode using the `.dark` class on the root element
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/members/**/*.{js,jsx,ts,tsx,css}'
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'primary-light': 'hsl(var(--primary-light))',
        'primary-dark': 'hsl(var(--primary-dark))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        'secondary-accent': 'hsl(var(--secondary-accent))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        'accent-light': 'hsl(var(--accent-light))',
        success: 'hsl(var(--success))',
        'success-foreground': 'hsl(var(--success-foreground))',
        warning: 'hsl(var(--warning))',
        'warning-foreground': 'hsl(var(--warning-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
    },
  },
  plugins: [],
}
