import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const baseTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00BFA6", // Bright teal
      light: "#33FFDA",
      dark: "#008C7A",
    },
    secondary: {
      main: "#FF4B8B", // Bright pink
      light: "#FF7EB3",
      dark: "#CC3366",
    },
    background: {
      default: "#0A1929", // Deep navy
      paper: "#132F4C", // Lighter navy
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B2BAC2",
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
            backgroundColor: "rgba(19, 47, 76, 0.8)",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease-in-out",
            // "&:hover": {
            //   backgroundColor: "rgba(19, 47, 76, 0.95)",
            //   "& .MuiOutlinedInput-notchedOutline": {
            //     borderColor: "#00BFA6",
            //   },
            // },
            "&.Mui-focused": {
              backgroundColor: "#1E3A5F",
              boxShadow: "0 0 0 2px rgba(0, 191, 166, 0.2)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00BFA6",
                borderWidth: 2,
              },
            },
            "& input": {
              color: "#FFFFFF",
              "&::placeholder": {
                color: "#B2BAC2",
                opacity: 1,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 191, 166, 0.2)",
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#132F4C",
          backgroundImage: "none",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.4)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(0, 191, 166, 0.05) 0%, rgba(255, 75, 139, 0.05) 100%)",
            pointerEvents: "none",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.4)",
          borderRadius: 16,
          backgroundColor: "#132F4C",
          "&.ag-theme-material": {
            "--ag-background-color": "#132F4C",
            "--ag-foreground-color": "#FFFFFF",
            "--ag-secondary-foreground-color": "#B2BAC2",
            "--ag-row-hover-color": "rgba(0, 191, 166, 0.08)",
            "--ag-selected-row-background-color": "rgba(0, 191, 166, 0.16)",
            "--ag-header-background-color": "#1E3A5F",
            "--ag-odd-row-background-color": "#1A3251",
            "--ag-control-panel-background-color": "#132F4C",
            "--ag-subheader-background-color": "#1E3A5F",
            "--ag-input-focus-border-color": "#00BFA6",
            "--ag-border-color": "rgba(0, 191, 166, 0.2)",
            "--ag-secondary-border-color": "rgba(0, 191, 166, 0.1)",
            "--ag-header-column-separator-color": "rgba(0, 191, 166, 0.2)",
            "--ag-input-border-color": "rgba(0, 191, 166, 0.3)",
            "--ag-input-focus-box-shadow": "0 0 2px rgba(0, 191, 166, 0.3)",
            "& input": {
              color: "#FFFFFF !important",
              backgroundColor: "#1E3A5F !important",
              border: "1px solid rgba(0, 191, 166, 0.3) !important",
              "&:focus": {
                backgroundColor: "#2A4870 !important",
                border: "2px solid #00BFA6 !important",
                boxShadow: "0 0 0 2px rgba(0, 191, 166, 0.2) !important",
              },
            },
            "& .ag-header-cell:hover": {
              backgroundColor: "transparent !important",
            },
            "& .ag-popup": {
              backgroundColor: "#1E3A5F !important",
              border: "1px solid rgba(0, 191, 166, 0.2) !important",
            },
            "& .ag-popup-child": {
              backgroundColor: "#1E3A5F !important",
            },
            "& .ag-menu": {
              backgroundColor: "#1E3A5F !important",
            },
            "& .ag-menu-option": {
              backgroundColor: "#1E3A5F !important",
            },
            "& .ag-menu-option-active": {
              backgroundColor: "#1E3A5F !important",
            },
            "& .ag-filter-toolpanel-header": {
              backgroundColor: "#1E3A5F !important",
            },
            "& .ag-filter-toolpanel-group-item:hover": {
              backgroundColor: "transparent !important",
            },
            "& .ag-filter-apply-panel": {
              backgroundColor: "#1E3A5F !important",
            },
            "& .ag-floating-filter-input": {
              "&:hover": {
                backgroundColor: "#1E3A5F !important",
              },
            },
            "& .ag-header-cell-hover": {
              backgroundColor: "transparent !important",
            },
            "& .ag-header-cell-moving": {
              backgroundColor: "transparent !important",
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "1rem",
          "@media (min-width:600px)": {
            padding: "1.5rem",
          },
          "@media (min-width:900px)": {
            padding: "2rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 20px",
          borderRadius: 12,
        },
        contained: {
          boxShadow: "0px 4px 12px rgba(0, 191, 166, 0.25)",
          background: "linear-gradient(45deg, #00BFA6, #00D4BB)",
          "&:hover": {
            background: "linear-gradient(45deg, #00D4BB, #00E6CC)",
            boxShadow: "0px 6px 16px rgba(0, 191, 166, 0.35)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
          borderRadius: 16,
          backgroundColor: "#1E3A5F",
          "@media (min-width:600px)": {
            borderRadius: 20,
          },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12,
          color: "#00BFA6",
          "&:hover": {
            backgroundColor: "rgba(0, 191, 166, 0.08)",
          },
        },
      },
    },
  },
} as ThemeOptions);

// Apply responsive font sizes and create the final theme
export const theme = responsiveFontSizes(baseTheme, {
  breakpoints: ["sm", "md", "lg"],
  factor: 0.5,
});
