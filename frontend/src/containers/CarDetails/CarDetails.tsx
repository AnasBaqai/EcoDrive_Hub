import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Skeleton,
} from "@mui/material";
import {
  ArrowBack,
  Speed,
  Battery90,
  Timer,
  ElectricCar,
  AttachMoney,
  Category,
  EventSeat,
  EvStation,
} from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";
import { getCarById } from "../../services/api";
import { Car } from "../../types/car";

const MetricCard = ({
  icon: Icon,
  value,
  label,
}: {
  icon: SvgIconComponent;
  value: string | number;
  label: string;
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        textAlign: "center",
        background: "linear-gradient(135deg, #2D3436 0%, #000000 100%)",
        color: "white",
        borderRadius: 3,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px 0 rgba(0,0,0,0.3)",
        },
      }}
    >
      <Icon sx={{ fontSize: 40, mb: 1, color: "#6C63FF" }} />
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 0.5, color: "white" }}
      >
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
        {label}
      </Typography>
    </Paper>
  );
};

const DetailRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: SvgIconComponent;
  label: string;
  value: string | number;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      p: 2,
      borderRadius: 2,
      background: "#2D3436",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        background: "#1E2122",
        transform: "translateX(4px)",
      },
    }}
  >
    <Icon sx={{ mr: 2, color: "#6C63FF" }} />
    <Typography sx={{ flex: 1, color: "rgba(255,255,255,0.7)" }}>
      {label}
    </Typography>
    <Typography sx={{ fontWeight: 500, color: "white" }}>{value}</Typography>
  </Box>
);

const LoadingSkeleton = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Skeleton
      width={100}
      height={40}
      sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.1)" }}
    />
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: "#2D3436" }}>
      <Skeleton
        variant="text"
        width="60%"
        height={60}
        sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
      />
      <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
      <Grid container spacing={4}>
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} md={4} key={i}>
            <Skeleton
              variant="rectangular"
              height={160}
              sx={{ borderRadius: 3, bgcolor: "rgba(255,255,255,0.1)" }}
            />
          </Grid>
        ))}
        {[1, 2].map((i) => (
          <Grid item xs={12} md={6} key={`details-${i}`}>
            <Skeleton
              variant="text"
              width="30%"
              height={40}
              sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }}
            />
            {[1, 2, 3, 4].map((j) => (
              <Skeleton
                key={`row-${j}`}
                variant="text"
                width="100%"
                height={40}
                sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Container>
);

export const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const data = await getCarById(id);
          setCar(data);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !car) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error" gutterBottom>
          {error || "Car not found"}
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{ bgcolor: "#6C63FF" }}
        >
          Back to List
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{
          mb: 3,
          borderRadius: 2,
          textTransform: "none",
          bgcolor: "#6C63FF",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateX(-4px)",
            bgcolor: "#5B52FF",
          },
        }}
      >
        Back to List
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #2D3436 0%, #000000 100%)",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#6C63FF",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {car.Brand} {car.Model}
        </Typography>
        <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />

        <Grid container spacing={4}>
          {/* Key Metrics */}
          <Grid item xs={12} md={4}>
            <MetricCard
              icon={Speed}
              value={`${car.TopSpeed_KmH} km/h`}
              label="Top Speed"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricCard
              icon={Battery90}
              value={`${car.Range_Km} km`}
              label="Range"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricCard
              icon={Timer}
              value={`${car.AccelSec}s`}
              label="0-100 km/h"
            />
          </Grid>

          {/* Specifications */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "#6C63FF", mb: 3 }}
            >
              Vehicle Details
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <DetailRow
                icon={Category}
                label="Body Style"
                value={car.BodyStyle}
              />
              <DetailRow
                icon={ElectricCar}
                label="Segment"
                value={car.Segment}
              />
              <DetailRow icon={EventSeat} label="Seats" value={car.Seats} />
              <DetailRow
                icon={EvStation}
                label="Power Train"
                value={car.PowerTrain}
              />
            </Box>
          </Grid>

          {/* Charging */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "#6C63FF", mb: 3 }}
            >
              Charging
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <DetailRow
                icon={Battery90}
                label="Efficiency"
                value={`${car.Efficiency_WhKm} Wh/km`}
              />
              <DetailRow
                icon={Speed}
                label="Fast Charge"
                value={`${car.FastCharge_KmH} km/h`}
              />
              <DetailRow
                icon={EvStation}
                label="Rapid Charge"
                value={car.RapidCharge}
              />
              <DetailRow
                icon={ElectricCar}
                label="Plug Type"
                value={car.PlugType}
              />
            </Box>
          </Grid>

          {/* Price */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: "linear-gradient(135deg, #6C63FF 0%, #5B52FF 100%)",
                color: "white",
                borderRadius: 3,
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 8px 24px 0 rgba(108,99,255,0.3)",
                },
              }}
            >
              <AttachMoney sx={{ fontSize: 40 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                €{car.PriceEuro.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
