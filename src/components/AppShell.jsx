"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

export default function AppShell({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	const drawerWidth = collapsed ? 72 : 320;

	return (
		<Box sx={{ display: "flex", height: "100vh", bgcolor: "#fafafa" }}>
			<Sidebar collapsed={collapsed} setCollapsed={setCollapsed} width={drawerWidth} />

			<Box component="main" sx={{ flex: 1, overflow: "auto", p: 4 }}>
				{children}
			</Box>
		</Box>
	);
}
