import { useGetIdentity } from "@pankod/refine-core";
import {
  AppBar,
  Avatar,
  Stack,
  Toolbar,
  Typography,
} from "@pankod/refine-mui";

export const Header: React.FC = () => {

  const { data: user } = useGetIdentity();
  const shouldRenderHeader = true; // Set this to false to hide the header

  return shouldRenderHeader ? (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{ background: "#E6E8F0" }}
    >
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            {user?.name ? (
              <Typography variant="subtitle2">{user?.name}</Typography>
            ) : null}
            {user?.avatar ? (
              <Avatar src={user?.avatar} alt={user?.name} />
            ) : null}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null;
};
