"use client";
import { usePathname } from "next/navigation";
import { Box, IconButton, InputBase, List, Paper, Stack, Tooltip, Typography } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CodeIcon from "@mui/icons-material/Code";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";

const navigation = [
	{
		type: "item",
		label: "Home",
		icon: <RocketLaunchIcon />,
		href: "/",
	},
	{
		type: "item",
		label: "User Models",
		icon: <AutoAwesomeIcon />,
		href: "/models",
	},
	{
		type: "group",
		title: "Executions",
		icon: <PlayArrowIcon />,
		items: [
			{ label: "Workflow", href: "/executions/workflow" },
			{ label: "Human Tasks", href: "/executions/human-tasks" },
			{ label: "Scheduler", href: "/executions/scheduler" },
			{ label: "Queue Monitor", href: "/executions/queue-monitor" },
			{ label: "Workers", href: "/executions/workers" },
			{ label: "Event Monitor", href: "/executions/event-monitor" },
		],
	},
	{
		type: "group",
		title: "Agents",
		icon: <SmartToyIcon />,
		items: [
			{ label: "Executions", href: "/agents/executions" },
			{ label: "Secrets", href: "/agents/secrets" },
		],
	},
	{
		type: "group",
		title: "Definitions",
		icon: <CodeIcon />,
		items: [
			{ label: "Workflow", href: "/definitions/workflow" },
			{ label: "Agents", href: "/definitions/agents" },
		],
	},
];

function isActive(pathname, href) {
	if (href === "/") {
		return pathname === "/";
	}

	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar({ collapsed, setCollapsed, width }) {
	const pathname = usePathname();
	return (
		<Box
			sx={{
				width,
				height: "100vh",
				borderRight: 1,
				borderColor: "divider",
				transition: (theme) => theme.transitions.create("width"),
				overflow: "hidden",
				bgcolor: "background.paper",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* Fixed header and search */}
			<Box sx={{ p: 2, flexShrink: 0 }}>
				<Stack
					direction="row"
					sx={{
						justifyContent: collapsed ? "center" : "space-between",
						alignItems: "center",
						mb: 2,
					}}
				>
					{!collapsed && (
						<Typography variant="h5" fontWeight={700}>
							Sample
						</Typography>
					)}
					<Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
						<IconButton
							size="small"
							onClick={() => setCollapsed(!collapsed)}
							sx={{
								border: "1px solid",
								borderColor: "divider",
							}}
						>
							{collapsed ? <MenuIcon fontSize="small" /> : <MenuOpenIcon fontSize="small" />}
						</IconButton>
					</Tooltip>
				</Stack>
				{!collapsed && (
					<Paper
						sx={{
							display: "flex",
							alignItems: "center",
							px: 2,
							py: 0.75,
							borderRadius: 6,
						}}
						variant="outlined"
					>
						<SearchIcon fontSize="small" color="action" />
						<InputBase
							placeholder="Search"
							sx={{
								ml: 1,
								flex: 1,
							}}
						/>
						<Typography variant="caption" color="text.secondary">
							/
						</Typography>
					</Paper>
				)}
			</Box>
			{/* Scrollable navigation */}
			<Box
				sx={{
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					overflowX: "hidden",
					px: 2,
					pb: 2,
				}}
			>
				<List disablePadding>
					{navigation.map((entry) => {
						if (entry.type === "item") {
							return (
								<NavItem
									key={entry.label}
									icon={entry.icon}
									label={entry.label}
									href={entry.href}
									selected={isActive(pathname, entry.href)}
									collapsed={collapsed}
								/>
							);
						}
						const items = entry.items.map((item) => ({
							...item,
							selected: isActive(pathname, item.href),
						}));
						return (
							<NavGroup
								key={entry.title}
								title={entry.title}
								icon={entry.icon}
								items={items}
								collapsed={collapsed}
								defaultOpen={items.some((item) => item.selected)}
							/>
						);
					})}
				</List>
			</Box>
		</Box>
	);
}
