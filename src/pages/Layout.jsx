// src/scenes/layout/Layout.jsx
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { Sidebar, Topbar } from "../global/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box className="admin-layout">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth={theme.customization.drawerWidth}
      />
      <Box flexGrow={1}>
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />
        <Box marginTop="50px">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
