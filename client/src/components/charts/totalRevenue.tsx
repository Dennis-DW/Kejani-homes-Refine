import React from "react";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import ReactApexChart from "react-apexcharts";

import { ArrowCircleUpRounded } from "@mui/icons-material";
import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

const totalRevenue = () => {
  return (
    <Box
      id="chart"
      p={5}
      display="flex"
      flex={1}
      bgcolor={"#f5f5f5"}
      flexDirection={"column"}
      borderRadius={5}
      minHeight={200}
    >
      <Typography fontSize="18px" gap={2} fontWeight={700} color={"#0d1321"}>
        Total Revenue
      </Typography>
      <Stack my="15px" direction={"row"} flexWrap={"wrap"}>
        <Typography fontSize={30} gap={5} fontWeight={700} color={"#252323"}>
          ksh102,102,050,779
        </Typography>
        <Stack
          direction={"row"}
          display={"flex"}
          alignItems={"center"}
          gap={1}
          bgcolor={"#ffe6e6"}
          borderRadius={2}
          p={1}
        >
          <ArrowCircleUpRounded fontSize={"small"} />
          <Stack>
            <Typography fontSize={18} fontWeight={700} color={"#0d1321"}>
              20%
            </Typography>
            <Typography fontSize={14} color={"#252323"}>
              Than last month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        options={TotalRevenueOptions}
        series={TotalRevenueSeries}
        type="area"
        height={300}
      />
    </Box>
  );
};

export default totalRevenue;
