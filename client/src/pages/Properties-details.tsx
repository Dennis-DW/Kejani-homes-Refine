import React from "react";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";

import { CustomButton } from "components";

const PropertyDetail = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();
  const { data, isLoading, isError } = queryResult;

  // console.log(data);

  const propertyDetails = data?.data ?? {};

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>an Error has occurred...</div>;
  }

  return (
    <Box borderRadius={2} p="20px" width={"fit-content"} bgcolor={"#fcfcfc"}>
      <Typography
        borderRadius={2}
        variant="h4"
        fontWeight="bold"
        fontSize={24}
        mb={4}
        color={"#11142"}
      >
        Property Details
      </Typography>
      <Box
        mt={2}
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <Box flex={1} maxWidth={765}>
          <img
            src={propertyDetails.photo}
            alt={propertyDetails.title}
            height={345}
            style={{ objectFit: "cover", borderRadius: 8 }}
            className="property_details_imag"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetail;
