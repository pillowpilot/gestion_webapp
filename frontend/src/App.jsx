import Sidebar from './layouts/sidebar/Sidebar';
import Topbar from './layouts/topbar/Topbar';
import Logo from './components/logo/Logo';
import { createTheme, Box, ThemeProvider } from '@mui/material';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/profile/ProfilePage';
import CompaniesPage from './pages/companies/CompaniesPage';
import UsersPage from './pages/users/UsersPage';
import ReportsPage from './pages/reports/ReportsPage';
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
  title: "Logout",
  Icon: LogoutIcon,
  to: "/logout",
}];

function App() {
  const theme = createTheme();

  return (<ThemeProvider theme={theme}>
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: 2,
    }}>
      <Box sx={{
        flexBasis: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        gap: 2,

      }}>
        <Logo />
        <Sidebar data={sidebarData} />
      </Box>
      <Box sx={{
        flexBasis: "80%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}>
        <Box sx={{
          flexBasis: "15%",
        }}>
          <Topbar />
        </Box>
        <Box sx={{
          flexBasis: "85%",
          paddingRight: 5,
        }}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
  )
}

export default App
