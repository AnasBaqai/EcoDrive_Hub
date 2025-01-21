import { TextField, InputAdornment, Box, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useRef } from "react";

const StyledSearchBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  marginBottom: theme.spacing(3),
  position: "relative",
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    height: 56,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 3,
    transition: theme.transitions.create(
      ["background-color", "box-shadow", "border-color", "transform"],
      {
        duration: theme.transitions.duration.short,
      }
    ),
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      transform: "translateY(-1px)",
      boxShadow: `0 4px 20px 0 ${theme.palette.primary.main}15`,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.paper,
      transform: "translateY(-1px)",
      boxShadow: `0 4px 20px 0 ${theme.palette.primary.main}25`,
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 2,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
    transition: theme.transitions.create(["border-color", "border-width"], {
      duration: theme.transitions.duration.short,
    }),
  },
  "& .MuiInputAdornment-root": {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SearchBar = ({ value, onChange, disabled }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cursorPosition = e.target.selectionStart;
      onChange(e.target.value);
      // Restore cursor position after value change
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
      });
    },
    [onChange]
  );

  return (
    <StyledSearchBox>
      <StyledTextField
        fullWidth
        variant="outlined"
        placeholder="Search electric cars..."
        value={value}
        onChange={handleChange}
        disabled={disabled}
        inputRef={inputRef}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                color={disabled ? "disabled" : "primary"}
                sx={{
                  fontSize: 24,
                  transition: "color 0.2s ease-in-out",
                  opacity: disabled ? 0.5 : 0.8,
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      {/* <Tooltip title="Advanced Filters">
        <FilterButton color="primary" disabled={disabled}>
          <TuneIcon sx={{ fontSize: 24 }} />
        </FilterButton>
      </Tooltip> */}
    </StyledSearchBox>
  );
};
