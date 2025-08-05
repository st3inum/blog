import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";

import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";


import { useTheme } from "@mui/material/styles";
import { useColorMode } from "@/components/ColorModeContext";
import Link from "next/link";
import { useRouter } from "next/router";


const Header: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { mode, setMode, setSystemTheme, isSystemTheme } = useColorMode();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Posts', path: '/blog', icon: <ArticleIcon /> },
    { name: 'Tags', path: '/tags', icon: <LocalOfferIcon /> },
    { name: 'About Me', path: '/about', icon: <InfoIcon /> },
  ];
  
  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };
  
  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };
  
  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    if (newMode === 'system') {
      setSystemTheme();
    } else {
      setMode(newMode);
    }
    handleThemeMenuClose();
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isActive = (path: string) => {
    if (path === '/' && router.pathname !== '/') {
      return false;
    }
    return router.pathname.startsWith(path);
  };


  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0} 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        backgroundColor: isDark 
          ? 'rgba(18, 18, 18, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            justifyContent: "space-between",
            minHeight: { xs: 64, sm: 72 },
            py: { xs: 1, sm: 1.5 }
          }}
        >
          {/* Logo/Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: 'linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.2rem'
                  }}
                >
                  S
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    color: 'text.primary',
                    cursor: 'pointer',
                    fontSize: { xs: '1.25rem', sm: '1.4rem' },
                    letterSpacing: '0.5px'
                  }}
                >
                  steinum
                </Typography>
              </Box>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {/* Main Navigation Items */}
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link key={item.name} href={item.path} style={{ textDecoration: 'none' }}>
                    <Button
                      variant={active ? 'contained' : 'text'}
                      sx={{
                        borderRadius: '12px',
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        minWidth: 'auto',
                        ...(active ? {
                          background: 'linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                        } : {
                          color: 'text.primary',
                          '&:hover': {
                            backgroundColor: isDark 
                              ? 'rgba(255, 255, 255, 0.08)' 
                              : 'rgba(0, 0, 0, 0.04)',
                            transform: 'translateY(-1px)'
                          }
                        })
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleMobileMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Mobile drawer */}
          {isMobile && (
            <Drawer
              anchor="left"
              open={mobileMenuOpen}
              onClose={toggleMobileMenu}
              sx={{
                '& .MuiDrawer-paper': { 
                  width: 240, 
                  boxSizing: 'border-box',
                  background: theme.palette.background.default,
                  borderRight: `1px solid ${theme.palette.divider}`,
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    background: 'linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  steinum
                </Typography>
                <List>
                  {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                      <Link 
                        href={item.path}
                        style={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          width: '100%' 
                        }}
                        onClick={toggleMobileMenu}
                      >
                        <Button
                          fullWidth
                          color={isActive(item.path) ? "primary" : "inherit"}
                          sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            py: 1,
                            borderRadius: 2,
                            backgroundColor: isActive(item.path) 
                              ? theme.palette.mode === 'dark' 
                                ? 'rgba(99, 102, 241, 0.1)' 
                                : 'rgba(99, 102, 241, 0.05)'
                              : 'transparent',
                          }}
                          startIcon={item.icon}
                        >
                          {item.name}
                        </Button>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          )}
            
          {/* Theme Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '48px', justifyContent: 'flex-end' }}>
            <IconButton 
              color="inherit" 
              onClick={handleThemeMenuOpen}
              aria-label="theme settings"
              aria-controls="theme-menu"
              aria-haspopup="true"
              size="small"
              sx={{ cursor: 'pointer' }}
            >
              {isSystemTheme ? (
                <SettingsBrightnessIcon />
              ) : isDark ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
              <ArrowDropDownIcon fontSize="small" />
            </IconButton>
            <Menu
              id="theme-menu"
              anchorEl={themeMenuAnchor}
              keepMounted
              open={Boolean(themeMenuAnchor)}
              onClose={handleThemeMenuClose}
              disableScrollLock={true}
              sx={{
                '& .MuiPaper-root': {
                  minWidth: 180,
                  mt: 1,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Press Ctrl+Shift+K to toggle
                </Typography>
              </Box>
              <MenuItem onClick={() => handleThemeChange('light')} selected={!isSystemTheme && mode === 'light'}>
                <ListItemIcon>
                  <Brightness7Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Light</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleThemeChange('dark')} selected={!isSystemTheme && mode === 'dark'}>
                <ListItemIcon>
                  <Brightness4Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Dark</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleThemeChange('system')} selected={isSystemTheme}>
                <ListItemIcon>
                  <SettingsBrightnessIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>System</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
