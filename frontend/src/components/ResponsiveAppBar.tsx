import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../store/AppContext";

interface Page {
  title: string;
  route: string;
  id: string;
}

const createPage = (title: string, route: string, id: string): Page => ({
  title,
  route,
  id,
});

const createPages = (token: string | undefined, isAdmin: boolean) => {
  const pages: Page[] = [];
  if (token && isAdmin) {
    pages.push(createPage("Admin", "/admin/users", "app-bar-admin-users"));
  }
  if (token) {
    pages.push(createPage("Notes", "/notes", "app-bar-notes"));
    pages.push(createPage("Create", "/create-note", "app-bar-create-note"));
  }
  return pages;
};

const settings = (token: string | undefined) => {
  if (token) {
    return [
      { title: "Profile", route: "/profile", id: "app-bar-profile" },
      { title: "Account", route: "/account", id: "app-bar-account" },
      { title: "Dashboard", route: "/dashboard", id: "app-bar-dashboard" },
      { title: "Sign Out", route: "/sign-out", id: "app-bar-sign-out" },
    ];
  }
  return [];
};

const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { token, isAdmin } = useMyContext();

  const renderClosedMenu = () => (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {createPages(token, isAdmin).map((page) => (
          <MenuItem
            id={`closed-${page.id}`}
            key={`key-closed-${page.id}`}
            onClick={(_event) => navigate(page.route)}
          >
            <Typography sx={{ textAlign: "center" }}>{page.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  const renderOpenMenu = () => (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {createPages(token, isAdmin).map((page) => (
        <Button
          id={`open-${page.id}`}
          key={`key-open-${page.id}`}
          onClick={(_event) => navigate(page.route)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );

  const renderUserMenu = () => (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          id="open-settings"
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings(token).map((setting) => (
          <MenuItem
            id={setting.id}
            key={setting.title}
            onClick={(_event) => navigate(setting.route)}
          >
            <Typography sx={{ textAlign: "center" }}>
              {setting.title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SecNot
          </Typography>
          {renderClosedMenu()}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SecureNotes
          </Typography>
          {renderOpenMenu()}
          {token && renderUserMenu()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
