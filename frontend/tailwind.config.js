/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        accent: "var(--accent)",
        ink: "var(--text-primary)",
        muted: "var(--text-secondary)",
        line: "var(--border-soft)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.08)",
        lift: "0 24px 60px rgba(15, 23, 42, 0.14)",
        glow: "0 10px 30px rgba(245, 158, 11, 0.22)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(245, 158, 11, 0.0)" },
          "50%": { boxShadow: "0 16px 32px rgba(245, 158, 11, 0.18)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-160%) skewX(-18deg)" },
          "100%": { transform: "translateX(240%) skewX(-18deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.7s ease forwards",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
      backgroundImage: {
        hero:
          "radial-gradient(circle at 15% 20%, rgba(245, 158, 11, 0.14), transparent 22%), radial-gradient(circle at 80% 0%, rgba(245, 158, 11, 0.1), transparent 20%), radial-gradient(circle at 72% 78%, rgba(15, 23, 42, 0.05), transparent 28%), linear-gradient(135deg, #ffffff 0%, #fff9ee 52%, #f8fafc 100%)",
      },
    },
  },
  plugins: [],
};
