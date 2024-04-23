import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { propertyReferralsInfo } from "constants/index";

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => {
  return (
    <Box width={"100%"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={14} fontWeight={500} color={"#252323"}>
          {title}
        </Typography>
        <Typography fontSize={14} fontWeight={500} color={"#252323"}>
          {percentage}%
        </Typography>
      </Stack>
      <Box
        width={"100%"}
        height={10}
        bgcolor={"#ffe6e6"}
        borderRadius={2}
        mt={1}
        position={"relative"}
      >
        <Box
          position={"absolute"}
          top={0}
          left={0}
          height={"100%"}
          width={`${percentage}%`}
          bgcolor={color}
          borderRadius={2}
        />
         
        </Box>
    </Box>
  );
};

const propertyReferrals = () => {
  return (
    <Box
      id="chart"
      p={3}
      bgcolor={"#f5f5f5"}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={5}
      minHeight={500}
    >
      <Typography fontSize="18px" gap={2} fontWeight={700} color={"#0d1321"}>
        Property Referrals
      </Typography>
      <Stack my="15px" direction={"column"} flexWrap={"wrap"} gap={4}>
        {propertyReferralsInfo.map((bar) => (
          <ProgressBar key={bar.title} {...bar} />
        ))}
      </Stack>
    </Box>
  );
};

export default propertyReferrals;
