import React from "react";
import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";
import { Profile } from "components";

const LandLordProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });
  

  const landLordProfile = data?.data ?? {};
  // Validate user profile data
  if (!landLordProfile.name || !landLordProfile.email || !landLordProfile.avatar || !landLordProfile.allProperties) {
    return <div>User profile data is incomplete.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Profile
      type="Landlord Profile"
      name={landLordProfile?.name}
      avatar={landLordProfile?.avatar}
      email={landLordProfile?.email}
      properties={landLordProfile?.allProperties}
    />
  );
};

export default LandLordProfile;

