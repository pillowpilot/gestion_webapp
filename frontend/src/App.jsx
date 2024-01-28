import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CommonLayout from './layouts/root/RootLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/profile/ProfilePage';
import CompaniesPage from './pages/companies/CompaniesPage';
import PropertiesPage from './pages/properties/PropertiesListPage';
import PropertyDetailsPage from './pages/properties/PropertiesDetailsPage';
import PropertiesMapPage from './pages/properties/PropertiesMapPage';
import NewPropertyPage from './pages/properties/create/PropertiesCreatePage';
import LotsPage from './pages/lots/LotsListPage';
import NewLotPage from './pages/lots/LotsCreatePage';
import LotDetailsPage from './pages/lots/LotsDetailsPage';
import UsersPage from './pages/users/UsersListPage';
import UserDetailsPage from './pages/users/details/UsersDetailsPage';
import LoginPage from './pages/login/LoginPage';
import InferenceFormPage from './pages/inference/InferenceCreatePage';
import NotFoundPage from './pages/notfound/NotFound';
import InferencesListPage from './pages/inference/InferencesListPage';
import InferenceDetailsPage from './pages/inference/InferenceDetailsPage';
import UserNewPage from './pages/users/UsersNewPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthContext from './contexts/AuthProvider';
import { Api } from './api/client';
import './i18n/i18n';


const queryClient = new QueryClient();

const Logout = () => {
  const { onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate("/login");
  });

  return <span>Loading...</span>;
};

const RootComponent = () => {
  const { auth } = useContext(AuthContext);
  if(!auth.isAuthenticated) return <Navigate to="/login" />;
  return <CommonLayout />;
};

const LoginComponent = () => {
  const { auth } = useContext(AuthContext);
  if(auth.isAuthenticated) return <Navigate to="/" />;
  return <LoginPage />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      }, {
        path: "profile",
        element: <ProfilePage />,
      }, {
        path: "companies",
        element: <CompaniesPage />,
      }, {
        path: "properties",
        children: [
          {
            path: "",
            element: <PropertiesPage />,
          }, {
            path: ":id",
            children: [
              {
                path: "",
                element: <PropertyDetailsPage />,
              },
              {
                path: "map",
                element: <PropertiesMapPage />
              }
            ]
          }, {
            path: "new",
            element: <NewPropertyPage />,
          }
        ]
      }, {
        path: "lots",
        children: [
          {
            path: "",
            element: <LotsPage />,
          },
          {
            path: ":id",
            element: <LotDetailsPage />
          },
          {
            path: "new",
            element: <NewLotPage />
          }
        ]
      }, {
        path: "users",
        children: [
          {
            path: "",
            element: <UsersPage />,
          },
          {
            path: ":id",
            element: <UserDetailsPage />,
          },
          {
            path: "new",
            element: <UserNewPage />,
          }
        ],
      },{
        path: "inference",
        children: [
          {
            path: "",
            element: <InferencesListPage />,
          },
          {
            path: ":id",
            element: <InferenceDetailsPage />,
          },
          {
            path: "new",
            element: <InferenceFormPage />,
          }
        ],
      }
    ],
  }, {
    path: "/login",
    element: <LoginComponent />,
  }, {
    path: "/logout",
    element: <Logout />,
  }
]);

function App() {
  const { auth, setAuth } = useContext(AuthContext);
  const theme = createTheme();

  useEffect(() => {
    const retrieveUserDataFromServer = async () => {
      const data = (await Api.whoami()).data;
      setAuth({
        ...auth,
        id: data.id,
        email: data.email,
        firstname: data.first_name,
        lastname: data.last_name,
        role: data.is_company_manager? 'Manager' : 'User',
        company: {
          id: data.company.id,
          name: data.company.name,
        }
      });
    };

    if(auth.isAuthenticated) retrieveUserDataFromServer();
  }, [auth.isAuthenticated]);



  return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
  )
}

export default App;
