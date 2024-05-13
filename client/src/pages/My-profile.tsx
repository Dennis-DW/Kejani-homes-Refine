import React from "react";
import { useGetIdentity, useOne } from "@pankod/refine-core";
import { Profile } from "components";

const MyProfile = () => {
  // Fetching user identity
  const { data: user } = useGetIdentity();

  // Fetching user profile based on user ID
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid,
  });
  // console.log("User object:", user);

  // Extracting user profile data
  const myProfile = data?.data?? {};

  // Validate user profile data
  if (!myProfile.name ||!myProfile.email ||!myProfile.avatar ||!myProfile.allProperties) {
    return <div>User profile data is incomplete.</div>;
  }

  // If loading, display loading message
  if (isLoading) return <div>Loading...</div>;

  // If error, display error message
  if (isError) return <div>Error...</div>;

  // Render user profile component
  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;

