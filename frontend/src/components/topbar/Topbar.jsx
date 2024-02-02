import { useState } from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Typography,
  Avatar,
  IconButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const pages = [
  {
    i18n: "topbar.dashboard",
    to: "dashboard",
  },
  {
    i18n: "topbar.users",
    to: "users",
  },
  {
    i18n: "topbar.properties",
    to: "properties",
  },
  {
    i18n: "topbar.lots",
    to: "lots",
  },
  {
    i18n: "topbar.inferences",
    to: "inference",
  },
];

const AvatarButton = ({ src = "" }) => {
  const { t } = useTranslation();

  const [anchorElement, setAnchorElement] = useState(null);

  const handleOpenAccountMenu = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenAccountMenu}>
        <Avatar src={src} />
      </IconButton>

      <Menu
        id="account-menu"
        open={Boolean(anchorElement)}
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleCloseAccountMenu}
      >
        <MenuItem component={NavLink} to={"profile"} onClick={handleCloseAccountMenu}>
          <Avatar sx={{ width: 28, height: 28, mr: 1 }} />
          {t("topbar.profile")}
        </MenuItem>

        <Divider />

        <MenuItem component={NavLink} to={"logout"} onClick={handleCloseAccountMenu}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("topbar.logout")}
        </MenuItem>
      </Menu>
    </>
  );
};

const DesktopTopBarContent = () => {
  const { t } = useTranslation();

  return (
    <Toolbar sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
      <AgricultureIcon sx={{ mr: 1 }} />

      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>

      <Box sx={{ flexGrow: 1, gap: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            component={NavLink}
            to={page.to}
            key={t(page.i18n)}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              "&.active": { bgcolor: "primary.dark" },
            }}
          >
            {t(page.i18n)}
          </Button>
        ))}
      </Box>

      <AvatarButton />
    </Toolbar>
  );
};

const MobileTopBarContent = () => {
  const { t } = useTranslation();
  const [anchorElement, setAnchorElement] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElement(null);
  };

  return (
    <Toolbar sx={{ display: { sx: "flex", md: "none" } }}>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
        }}
      >
        <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="appbar-menu"
          open={Boolean(anchorElement)}
          anchorEl={anchorElement}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.i18n}
              onClick={handleCloseNavMenu}
              component={NavLink}
              to={page.to}
              sx={{ "&.active": { bgcolor: "primary.light" } }}
            >
              <Typography textAlign="center">{t(page.i18n)}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <AvatarButton />
    </Toolbar>
  );
};

const Topbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <DesktopTopBarContent />
        <MobileTopBarContent />
      </Container>
    </AppBar>
  );
};

export default Topbar;
