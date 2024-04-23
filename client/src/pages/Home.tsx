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
  return (
    <Box>
      <Typography fontWeight={700} fontSize={25} color="#471d3f">
        Dashboard
      </Typography>
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
      <Stack mt={5} width={"100%"} direction={{ xs: "column", lg: "row" }} gap={2}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  );
};

export default Home;
