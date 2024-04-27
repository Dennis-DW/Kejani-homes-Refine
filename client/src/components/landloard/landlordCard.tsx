import React from "react";
import { LandlordCardProp, InfoBarProps } from "interfaces/landloard";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack
  flex={1}
  minWidth={{xs:"100%",sm: 280}}
  gap={1.5}
  direction={"row"}
  >
    {icon}
    <Typography
    color={"#808191"}
    fontSize={15}
    >{name}</Typography>
  </Stack>
);

const landlordCard = ({
  id,
  name,
  email,
  avatar,
  noOfProperties,
}: LandlordCardProp) => {
  const { data: currentUser } = useGetIdentity();
  const generateLink = () => {
    if (currentUser.email === email) return "/my-profile";
    return `/landlords/show/${id}`;
  };

  return (
    <Box
      component={Link}
      to={generateLink()}
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&hover": {
          boxShadow: "0 20px 55px 4px rgba(176 ,176, 176,0.1)",
        },
      }}
    >
      <img
        src={avatar}
        alt={name}
        width={95}
        height={95}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        flex={1}
        gap={{ xs: 4, sm: 2 }}
      >
        <Stack
          gap={2}
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <Typography fontSize={28} fontWeight={500} color={"#111242d"}>
            {name}
          </Typography>
          <Typography fontSize={14} color={"#808191"}>
            Kejani Homes Real-Estate
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
        >
          <InfoBar
            icon={<EmailOutlined sx={{ color: "#808191" }} />}
            name={email}
          />
          <InfoBar
            icon={<Place sx={{ color: "#808191" }} />}
            name={"Nairobi"}
          />
          <InfoBar
            icon={<LocationCity sx={{ color: "#808191" }} />}
            name={`${ noOfProperties} Properties`}
          />
          <InfoBar
            icon={<Phone sx={{ color: "#808191" }} />}
            name={"+254 730 000 000"}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default landlordCard;
