import { useEffect, useState } from "react";
import Link from "next/link";

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function NavGroup({ title, icon, items, collapsed, defaultOpen = false }) {
	const hasActiveItem = items.some((item) => item.selected);

	const [open, setOpen] = useState(defaultOpen || hasActiveItem);

	// Track the previous value so we only react to *changes* in hasActiveItem,
	// not every render. This is React's recommended "adjust state during
	// render" pattern instead of doing it in an effect.
	const [prevHasActiveItem, setPrevHasActiveItem] = useState(hasActiveItem);
	if (hasActiveItem !== prevHasActiveItem) {
		setPrevHasActiveItem(hasActiveItem);
		if (hasActiveItem) {
			setOpen(true);
		}
	}

	/* Collapsed sidebar */
	if (collapsed) {
		return (
			<Tooltip title={title} placement="right" arrow>
				<ListItemButton
					selected={hasActiveItem}
					sx={{
						minHeight: 40,
						justifyContent: "center",
						borderRadius: 2,
						px: 1,
						my: 0.5,
					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							justifyContent: "center",
						}}
					>
						{icon}
					</ListItemIcon>
				</ListItemButton>
			</Tooltip>
		);
	}

	/* Expanded sidebar */
	return (
		<>
			<ListItemButton
				onClick={() => setOpen((current) => !current)}
				sx={{
					borderRadius: 2,
					minHeight: 40,
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 36,
					}}
				>
					{icon}
				</ListItemIcon>

				<ListItemText
					primary={title}
					slotProps={{
						primary: {
							fontWeight: hasActiveItem ? 600 : 500,
						},
					}}
				/>

				{open ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
			</ListItemButton>

			<Collapse in={open} timeout="auto" unmountOnExit>
				<List
					disablePadding
					sx={{
						pl: 4,
					}}
				>
					{items.map((item) => (
						<ListItemButton
							key={item.href}
							component={Link}
							href={item.href}
							selected={item.selected}
							sx={{
								minHeight: 34,
								borderRadius: 2,
							}}
						>
							<ListItemText
								primary={
									<Typography
										component="span"
										sx={{
											fontSize: 14,
											fontWeight: item.selected ? 700 : 400,
										}}
									>
										{item.label}
									</Typography>
								}
							/>
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</>
	);
}
