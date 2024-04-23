import React from "react";
import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@pankod/refine-mui";
import { PropertyCardProps } from "interfaces/property";

const propertyCard = ({
  id,
  title,
  location,
  price,
  photo,
}: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/show/${id}`}
      sx={{
        maxWidth: 400,
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
        color: "inherit",
        "&:hover": {
          boxShadow: "0 22px 44px 2px rgba(176, 176, 176, 0.1)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        height="180"
        width="100%"
        image={photo}
        alt={title}
        sx={{
          borderRadius: 2,
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: "5px",
          gap: 5,
          direction: "row",
        }}
      >
        <Stack direction="column" spacing={1}>
          <Typography
            gutterBottom

            component="div"
            sx={{
              fontWeight: 200,
              color: "#0d1321",
            }}
          >
            {title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Place
              sx={{
                color: "#0d1321",
                fontSize: 20,
                marginTop: 2,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Stack>
        </Stack>
        <Box
          px={1.5}
          py={0.5}
          bgcolor="#dadefa"
          height={"fit-content"}
          // sx={{ flexGrow: 1 }}
        >
          {" "}
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontWeight: 700,
              color: "#0d1321",
            }}
          >
            ksh{price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default propertyCard;
