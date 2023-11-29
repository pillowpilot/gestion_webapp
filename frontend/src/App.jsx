import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Logo from './components/logo/Logo';
import { createTheme, Box, ThemeProvider, Grid } from '@mui/material';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Routes, Route, Outlet } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/profile/ProfilePage';
import CompaniesPage from './pages/companies/CompaniesPage';
import UsersPage from './pages/users/UsersPage';
import ReportsPage from './pages/reports/ReportsPage';
import LoginPage from './pages/login/LoginPage';
import './App.css'

const sidebarData = [{
  title: "Dashboard",
  Icon: DashboardIcon,
  to: "/dashboard",
}, {
  title: "Profile",
  Icon: AccountBoxIcon,
  to: "/profile",
}, {
  title: "Companies",
  Icon: BusinessIcon,
  to: "/companies",
}, {
  title: "Users",
  Icon: PeopleIcon,
  to: "/users",
}, {
  title: "Reports",
  Icon: BarChartIcon,
  to: "/reports",
}, {
  title: "Settings",
  Icon: SettingsApplicationsIcon,
  to: "/settings",
}, {
  title: "Login",
  Icon: LoginIcon,
  to: "/login",
}, {
  title: "Logout",
  Icon: LogoutIcon,
  to: "/logout",
}];

const CommonLayout = ({sidebarData}) => {
  return (
    <Grid container spacing={2} sx={{
      padding: 3,
    }}>
      <Grid item xs={2}>
        <Logo />
      </Grid>
      <Grid item xs={10}>
        <Topbar />
      </Grid>
      <Grid item xs={2}>
        <Sidebar data={sidebarData} />
      </Grid>
      <Grid item xs={10}>
        <Outlet/>
      </Grid>
    </Grid>
  );
};

function App() {
  const theme = createTheme();

  return (<ThemeProvider theme={theme}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<CommonLayout sidebarData={sidebarData}/>}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<h1>Settings</h1>} />
        <Route path="logout" element={<h1>Logout</h1>} />
      </Route>
    </Routes>

  </ThemeProvider>
  )
}

export default App;

/*<Grid container spacing={2} sx={{
        padding: 3,
      }}>
        <Grid item xs={2}>
          <Logo />
        </Grid>
        <Grid item xs={10}>
          <Topbar />
        </Grid>
        <Grid item xs={2}>
          <Sidebar data={sidebarData} />
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </Grid>
      </Grid>*/