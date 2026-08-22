"use client";

import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ArrowLeft, Compass, Home } from "lucide-react";

export default function NotFound() {
	return (
		<Box
			sx={{
				minHeight: "100dvh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				px: 3,
			}}
		>
			<Stack
				spacing={2}
				sx={{
					alignItems: "center",
					maxWidth: 440,
				}}
			>
				<Compass size={64} strokeWidth={1.25} />

				<Typography variant="h2" fontWeight={700}>
					404
				</Typography>

				<Typography variant="h6" fontWeight={600}>
					Page not found
				</Typography>

				<Typography variant="body2" color="text.secondary">
					{"The page you're looking for doesn't exist or may have been moved."}
				</Typography>

				<Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
					<Button
						variant="outlined"
						startIcon={<ArrowLeft size={18} />}
						onClick={() => window.history.back()}
					>
						Go back
					</Button>

					<Button component={Link} href="/" variant="contained" startIcon={<Home size={18} />}>
						Back to home
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
}
