import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "@/components/ColorModeContext";
import Link from "next/link";

const Header: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const dark = theme.palette.mode === "dark";

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              MathBugs Blog
            </Typography>
          </Link>
          <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle dark mode">
            {dark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
