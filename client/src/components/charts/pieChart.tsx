import React from "react";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import { PieChartProps } from "interfaces/home";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pl={3.5}
      py={2}
      gap={2}
      borderRadius={8}
      minHeight={200}
      width={"fitContent"}
      bgcolor="#FFFFFF"
    >
      <Stack>
        <Typography fontWeight={500} fontSize={15} color="#471d3f">
          {title}
        </Typography>
        <Typography fontWeight={700} fontSize={25} mt={1} color="#471d3f">
          {value}
        </Typography>
      </Stack>
      <ReactApexChart
        options={{
          chart: {
            type: "donut",
          },
          colors,
          legend: {
            show: false,
          },
          labels: [],
        }}
        series={series}
        type="donut"
        width="280"
      />
    </Box>
  );
};

export default PieChart;
