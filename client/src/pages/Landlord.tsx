import React from "react";
import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";
import { LandlordCard } from "components";

const Landlords = () => {
  const { data, isLoading, isError } = useList({
    resource: "api/v1/users",
  });
  const allLandlords = data?.data ?? [];

  // alert(allLandlords[0].email);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color={"#11142d"}>
        Landlords / Agents Lists
      </Typography>
      <Box
        mt={"20px"}
        sx={{
          display: "flex",
          flex: "wrap",
          gap: "20px",
          backgroundColor: "#fcfcfc",
        }}
      >
        {allLandlords.map((Landlord) => (
          <LandlordCard
            key={Landlord._id}
            id={Landlord._id}
            name={Landlord._name}
            email={Landlord._email}
            avatar={Landlord._avatar}
            noOfProperties={Landlord.allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Landlords;
