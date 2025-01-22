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

  const handleGridReady = () => {
    fetchCars();
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = useCallback(
    (value: string) => {
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handlePageChange = (newPage: number, newPageSize: number) => {
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setPage(1);
    } else {
      setPage(newPage);
    }
  };

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
        background:
          "linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(108, 99, 255, 0.05) 100%)",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {icon}
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          }}
        >
          {value.toFixed(1)}
        </Typography>
      </CardContent>
    </Card>
  );

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
            backgroundImage:
              "linear-gradient(180deg, rgba(108, 99, 255, 0.05) 0%, rgba(255, 101, 132, 0.05) 100%)",
          },
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            Filters
          </Typography>
          <SearchBar
            value={inputValue}
            onChange={handleInputChange}
            onSearch={handleSearch}
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
            mb: { xs: 2, sm: 3, md: 4 },
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
            }}
          >
            EcoDrive Hub
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
          sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Avg. Acceleration"
              value={stats.avgAccel}
              icon={
                <SpeedIcon
                  color="primary"
                  sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Avg. Range"
              value={stats.avgRange}
              icon={
                <ElectricCarIcon
                  color="primary"
                  sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Avg. Efficiency"
              value={stats.avgEfficiency}
              icon={
                <BatteryChargingFullIcon
                  color="primary"
                  sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
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
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
