export const getTheme = (isDark) =>
  isDark
    ? {
        background: "#111A16",
        surface: "#1A2721",
        surfaceMuted: "#24352D",
        text: "#ECF2EE",
        secondaryText: "#A1B2A8",
        border: "#34473D",
        accent: "#66D49D",
        accentSoft: "#213E30",
        danger: "#FF8175",
        dangerSoft: "#432824",
        safe: "#66D49D",
      }
    : {
        background: "#F3F5F4",
        surface: "#FFFFFF",
        surfaceMuted: "#E9EFEC",
        text: "#17221D",
        secondaryText: "#65746C",
        border: "#DEE6E1",
        accent: "#147D57",
        accentSoft: "#E0F3E8",
        danger: "#C84036",
        dangerSoft: "#FBE9E5",
        safe: "#147D57",
      };
