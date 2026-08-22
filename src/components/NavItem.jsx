import Link from "next/link";
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";

export default function NavItem({ icon, label, href, selected = false, collapsed = false, onClick }) {
	const button = (
		<ListItemButton
			component={Link}
			href={href}
			selected={selected}
			onClick={onClick}
			sx={{
				borderRadius: 2,
				minHeight: 40,
				px: collapsed ? 1 : 2,
				justifyContent: collapsed ? "center" : "flex-start",

				"&.Mui-selected": {
					bgcolor: "#dcecff",
				},

				"&.Mui-selected:hover": {
					bgcolor: "#dcecff",
				},
			}}
		>
			<ListItemIcon
				sx={{
					minWidth: collapsed ? 0 : 36,
					mr: collapsed ? 0 : 1,
					justifyContent: "center",

					"& svg": {
						fontSize: 20,
					},
				}}
			>
				{icon}
			</ListItemIcon>

			{!collapsed && (
				<ListItemText
					primary={label}
					slotProps={{
						primary: {
							sx: {
								fontWeight: selected ? 600 : 500,
							},
						},
					}}
				/>
			)}
		</ListItemButton>
	);

	if (collapsed) {
		return (
			<Tooltip title={label} placement="right" arrow>
				{button}
			</Tooltip>
		);
	}

	return button;
}
