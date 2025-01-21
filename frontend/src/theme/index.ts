import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6C63FF",
      light: "#9D97FF",
      dark: "#4B45B3",
    },
    secondary: {
      main: "#FF6584",
      light: "#FF8FA3",
      dark: "#B34659",
    },
    background: {
      default: "#1A1A2E",
      paper: "#232342",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3CC",
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3.5rem",
      },
    },
    h2: {
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3rem",
      },
    },
    h3: {
      fontSize: "1.75rem",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2.5rem",
      },
    },
    h4: {
      fontSize: "1.5rem",
      "@media (min-width:600px)": {
        fontSize: "1.75rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2rem",
      },
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    h5: {
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1.75rem",
      },
    },
    h6: {
      fontSize: "1.1rem",
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1.5rem",
      },
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
    body1: {
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.75rem",
      "@media (min-width:600px)": {
        fontSize: "0.875rem",
      },
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6C63FF",
              },
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 0 2px rgba(108, 99, 255, 0.2)",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: {
            xs: 16,
            sm: 20,
          },
          backgroundImage: "none",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.25)",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2rem",
          },
          paddingBottom: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2rem",
          },
          paddingLeft: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2rem",
          },
          paddingRight: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: {
            xs: 8,
            sm: 12,
          },
          textTransform: "none",
          fontWeight: 600,
          padding: {
            xs: "6px 16px",
            sm: "8px 20px",
          },
        },
        contained: {
          boxShadow: "0px 4px 12px rgba(108, 99, 255, 0.25)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: {
            xs: 16,
            sm: 20,
          },
          backgroundImage: "none",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: {
            xs: 8,
            sm: 12,
          },
        },
      },
    },
  },
});

// Apply responsive font sizes and create the final theme
export const theme = responsiveFontSizes(baseTheme, {
  breakpoints: ["sm", "md", "lg"],
  factor: 0.5,
});
