import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import AuthContext from "./contexts/AuthProvider";
import { Api } from "./api/client";
import "./i18n/i18n";
import "./App.css";

// Pages
import CommonLayout from "./layouts/root/RootLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/LoginPage";
import NotFoundPage from "./pages/notfound/NotFound";
import { DetailLot, ListLots, LotMap, CreateLot } from "./pages/lots";
import { ListUsers, CreateUser, DetailsUser } from "./pages/users";
import {
  ListProperties,
  CreateProperty,
  DetailProperty,
  PropertyMap,
} from "./pages/properties";
import {
  DetailInference,
  CreateInference,
  ListInferences,
} from "./pages/inference";

const Logout = () => {
  const queryClient = useQueryClient();
  const { onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  queryClient.clear();
  useEffect(() => {
    onLogout();
    navigate("/login");
  });

  return <span>Loading...</span>;
};

const RootComponent = () => {
  const { auth } = useContext(AuthContext);
  if (!auth.isAuthenticated) return <Navigate to="/login" />;
  return <CommonLayout />;
};

const LoginComponent = () => {
  const { auth } = useContext(AuthContext);
  if (auth.isAuthenticated) return <Navigate to="/" />;
  return <LoginPage />;
};

function App() {
  const { auth, setAuth } = useContext(AuthContext);
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  console.log(auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootComponent />,
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "profile",
          element: <DetailsUser id={auth.id} />,
        },
        {
          path: "properties",
          children: [
            {
              path: "",
              element: <ListProperties />,
            },
            {
              path: ":id",
              children: [
                {
                  path: "",
                  element: <DetailProperty />,
                },
                {
                  path: "map",
                  element: <PropertyMap />,
                },
              ],
            },
            {
              path: "new",
              element: <CreateProperty />,
            },
          ],
        },
        {
          path: "lots",
          children: [
            {
              path: "",
              element: <ListLots />,
            },
            {
              path: ":id",
              children: [
                {
                  path: "",
                  element: <DetailLot />,
                },
                {
                  path: "map",
                  element: <LotMap />,
                },
              ],
            },
            {
              path: "new",
              element: <CreateLot />,
            },
          ],
        },
        {
          path: "users",
          children: [
            {
              path: "",
              element: <ListUsers />,
            },
            {
              path: ":id",
              element: <DetailsUser />,
            },
            {
              path: "new",
              element: <CreateUser />,
            },
          ],
        },
        {
          path: "inference",
          children: [
            {
              path: "",
              element: <ListInferences />,
            },
            {
              path: ":id",
              element: <DetailInference />,
            },
            {
              path: "new",
              element: <CreateInference />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <LoginComponent />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    }
  ]);

  useEffect(() => {
    const retrieveUserDataFromServer = async () => {
      const data = (await Api.whoami()).data;
      setAuth({
        ...auth,
        id: data.id,
        email: data.email,
        firstname: data.first_name,
        lastname: data.last_name,
        role: data.is_company_manager ? "Manager" : "User",
        company: {
          id: data.company.id,
          name: data.company.name,
        },
      });
    };

    if (auth.isAuthenticated) retrieveUserDataFromServer();
  }, [auth.isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
