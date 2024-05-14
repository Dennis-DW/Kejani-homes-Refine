import { AuthProvider, Refine } from "@pankod/refine-core";
import {
  CssBaseline,
  ErrorComponent,
  GlobalStyles,
  ReadyPage,
  RefineSnackbarProvider,
  notificationProvider,
} from "@pankod/refine-mui";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleOutline,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { Header, Layout, Sider, Title } from "components/layout";
import { ColorModeContextProvider } from "contexts";
import { CredentialResponse } from "interfaces/google";
import {
  LandlordProfile,
  Landlord,
  AllProperties,
  CreateProperty,
  Home,
  Login,
  MyProfile,
  PropertyDetail,
  EditProperty,
} from "pages";
import { parseJwt } from "utils/parse-jwt";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      // Save user to MongoDB
      if (profileObj) {
        try {
          const response = await fetch("https://kejani-homes.onrender.com/api/v1/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          // Save user to local storage if response status is 200
          if (response.status === 200) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid: data._id,
              })
            );
          }
        } catch (error) {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
          return Promise.reject(error);
        }
      }

      // Store the token in local storage
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },

    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("https://kejani-homes.onrender.com/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "properties",
              list: AllProperties,
              show: PropertyDetail,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
            {
              name: "Landlords/Agents",
              list: Landlord,
              show: LandlordProfile,
              icon: <PeopleOutline />,
            },
            {
              name: "Messages",
              list: Home,
              icon: <ChatBubbleOutline />,
            },
            {
              name: "MyProfile",
              options: { label: "My Profile" },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
            {
              name: "reviews",
              list: Home,
              icon: <StarOutlineRounded />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
