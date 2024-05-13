import React from 'react';
import { useList } from '@pankod/refine-core';
import { Box, Button, Stack, Typography } from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';

// Define the props for the LandlordProfile component
interface LandlordProfileProps {
  name: string;
  avatar: string;
}

// LandlordProfile component
const LandlordProfile: React.FC<LandlordProfileProps> = ({ name, avatar }) => (
  // Stack for displaying name and avatar
  <Stack direction="row" alignItems="center" gap="10px">
    {/* Display the avatar */}
    <img src={avatar} alt="agent" width={50} height={50} style={{ borderRadius: 15, objectFit: 'cover' }} />
    {/* Display the name */}
    <Box>
      <Typography fontSize={16} fontWeight={600} color="#11142D">{name}</Typography>
      {/* Additional information */}
      <Typography mt="2px" fontSize={14} fontWeight={500} color="#808191">Top landlord</Typography>
    </Box>
  </Stack>
);

// TopLandlord component
const TopLandlord: React.FC = () => {
  // Fetching data for top landlords
  const { data, isLoading, isError } = useList({
    resource: 'users',
    config: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // Extracting top landlords from data
  const topLandlords = data?.data ?? [];

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError) {
    return <div>Something went wrong!</div>;
  }

  // Displaying top landlords
  return (
    <Box
      p={4}
      id="chart"
      minWidth={490}
      bgcolor="#FCFCFC"
      display="flex"
      borderRadius="15px"
      flexDirection="column"
    >
      {/* Title and view all button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={18} fontWeight={600} color="#11142D">Top Landlords</Typography>
        {/* Button to view all landlords */}
        <Button
          component={Link}
          to="/landlords/Agents"
          variant="outlined"
          sx={{
            textTransform: 'capitalize',
            borderColor: '#E4E4E4',
            color: '#808191',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          View All
        </Button>
      </Stack>

      {/* Displaying top landlords' profiles */}
      <Box mt="25px" display="flex" flexDirection="column" gap={4}>
        {topLandlords.map((landlord) => (
          <LandlordProfile
            key={landlord._id}
            name={landlord.name}
            avatar={landlord.avatar}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TopLandlord;
