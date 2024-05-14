import React from "react";
import { useList } from "@pankod/refine-core";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopLandlord,
} from "components";

import { Box, Stack, Typography } from "@pankod/refine-mui";

const Home = () => {
  // Fetching latest properties data
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: { pageSize: 5 },
    },
  });
  
  // Extracting the latest properties from data
  const latestProperties = data?.data ?? [];

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Error state
  if (isError) {
    return <div>Error</div>;
  }

  // Displaying dashboard components with latest properties
  return (
    <Box>
      {/* Dashboard title */}
      <Typography fontWeight={700} fontSize={25} color="#471d3f">
        Dashboard
      </Typography>
      
      {/* Pie charts section */}
      <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
        <PieChart
          title="Properties for Rent"
          value={600}
          series={[75, 25]}
          colors={["#4715BE", "#c6c5b9"]}
        />
        <PieChart
          title="Properties for Sale"
          value={550}
          series={[50, 40]}
          colors={["#4715BE", "#c6c5b9"]}
        />
        <PieChart
          title="Total Customers"
          value={550}
          series={[50, 40]}
          colors={["#4715BE", "#c6c5b9"]}
        />
        <PieChart
          title="Properties for Cities"
          value={545}
          series={[60, 45]}
          colors={["#4715BE", "#c6c5b9"]}
        />
      </Box>
      
      {/* Total revenue and property referrals section */}
      <Stack mt={5} width={"100%"} direction={{ xs: "column", lg: "row" }} gap={2}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
      
      {/* Latest properties section */}
      <Stack mt="25px" width="100%" flexWrap="wrap" direction="row" gap={4}>
        <TopLandlord />
        <Box
          flex={1}
          borderRadius={2}
          bgcolor="white"
          p={2}
          flexDirection={{ xs: "column", lg: "row" }}
          mt={5}
          minWidth={"100%"}
        >
          {/* Latest properties title */}
          <Typography fontWeight={700} fontSize={25} color="#471d3f">
            Latest Properties
          </Typography>
          <Box mt={2} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {/* Displaying each latest property as a card */}
            {latestProperties.map((property) => (
              <PropertyCard
                key={property._id}
                id={property.id}
                title={property.title}
                price={property.price}
                photo={property.photo}
                location={property.location}
              />
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
