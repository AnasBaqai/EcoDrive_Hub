import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Drawer,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { getCars, deleteCar } from "../../services/api";
import { Car } from "../../types/car";
import { debounce } from "lodash";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SpeedIcon from "@mui/icons-material/Speed";

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Card
    sx={{
      height: "100%",
      background: "rgba(108, 99, 255, 0.02)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(108, 99, 255, 0.1)",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: (theme) => `0 8px 24px 0 ${theme.palette.primary.main}15`,
        border: "1px solid rgba(108, 99, 255, 0.2)",
      },
    }}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              lineHeight: 1,
            }}
          >
            {value.toFixed(1)}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const CarList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [cars, setCars] = useState<Car[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Stats calculation
  const stats = useMemo(() => {
    if (!cars.length) return { avgAccel: 0, avgRange: 0, avgEfficiency: 0 };
    return {
      avgAccel: cars.reduce((acc, car) => acc + car.AccelSec, 0) / cars.length,
      avgRange: cars.reduce((acc, car) => acc + car.Range_Km, 0) / cars.length,
      avgEfficiency:
        cars.reduce((acc, car) => acc + car.Efficiency_WhKm, 0) / cars.length,
    };
  }, [cars]);

  // Create a debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1); // Reset to first page on search
      }, 500),
    []
  );

  const fetchCars = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getCars({
        search: searchTerm,
        page: page,
        limit: pageSize,
      });

      setCars(response.cars);
      setTotalRows(response.total);

      // Update page if it was adjusted by backend
      if (response.page !== page) {
        setPage(response.page);
      }

      // If we get no results and we're not on the first page,
      // go back to the last page with results
      if (response.cars.length === 0 && page > 1) {
        setPage(Math.max(1, response.totalPages));
      }
    } catch (error) {
      setError("Failed to fetch cars. Please try again later.");
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, page, pageSize]);

  // Fetch cars when dependencies change
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleGridReady = useCallback(() => {
    fetchCars();
  }, [fetchCars]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handlePageChange = useCallback(
    (newPage: number, newPageSize: number) => {
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
        setPage(1); // Reset to first page when changing page size
      } else {
        setPage(newPage);
      }
    },
    [pageSize]
  );

  const handleView = (car: Car) => {
    navigate(`/cars/${car._id}`);
  };

  const handleDelete = async (car: Car) => {
    try {
      await deleteCar(car._id);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const drawerWidth = 280;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor={isMobile ? "left" : "left"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: { xs: "100%", md: drawerWidth },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { xs: "85%", sm: drawerWidth },
            boxSizing: "border-box",
            border: "none",
            background: "rgba(108, 99, 255, 0.02)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              fontWeight: 600,
              background: "linear-gradient(45deg, #6C63FF, #FF6584)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Discover Electric Cars
          </Typography>
          <SearchBar
            value={inputValue}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
        }}
      >
        <Box
          sx={{
            mb: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              background: "linear-gradient(45deg, #6C63FF, #FF6584)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              textAlign: { xs: "center", sm: "left" },
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Electric Cars Catalog
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            justifyContent={{ xs: "center", sm: "flex-end" }}
          >
            <IconButton
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              color="primary"
              sx={{
                width: { xs: "44px", sm: "40px" },
                height: { xs: "44px", sm: "40px" },
                backgroundColor: "background.paper",
                "&:hover": {
                  backgroundColor: "background.default",
                },
              }}
            >
              {viewMode === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
            </IconButton>
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                color="primary"
                sx={{
                  width: { xs: "44px", sm: "40px" },
                  height: { xs: "44px", sm: "40px" },
                  backgroundColor: "background.paper",
                  "&:hover": {
                    backgroundColor: "background.default",
                  },
                }}
              >
                <FilterListIcon />
              </IconButton>
            )}
          </Stack>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 3, sm: 4 } }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Average Acceleration"
              value={stats.avgAccel}
              icon={<SpeedIcon sx={{ color: "white", fontSize: "1.5rem" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Average Range"
              value={stats.avgRange}
              icon={
                <ElectricCarIcon sx={{ color: "white", fontSize: "1.5rem" }} />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Average Efficiency"
              value={stats.avgEfficiency}
              icon={
                <BatteryChargingFullIcon
                  sx={{ color: "white", fontSize: "1.5rem" }}
                />
              }
            />
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            width: "100%",
            backgroundColor: "background.paper",
            borderRadius: { xs: 2, sm: 3 },
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(108, 99, 255, 0.1)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              border: "1px solid rgba(108, 99, 255, 0.2)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #6C63FF, #FF6584)",
            },
          }}
        >
          <DataGrid
            rowData={cars}
            totalRows={totalRows}
            page={page}
            pageSize={pageSize}
            onGridReady={handleGridReady}
            onViewClick={handleView}
            onDeleteClick={handleDelete}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </Paper>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        sx={{
          bottom: { xs: 16, sm: 24 },
        }}
      >
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{
            width: { xs: "100%", sm: "auto" },
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
