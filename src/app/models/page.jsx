"use client";

import { useMemo, useState } from "react";
import {
	Box,
	Button,
	Chip,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	Select,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	Bot,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Cloud,
	Edit3,
	Image,
	Plus,
	RefreshCw,
	Search,
	Shield,
	Trash2,
	Video,
	Volume2,
	Workflow,
	Zap,
} from "lucide-react";

import ModelEditOverlay from "@/components/ModelEditOverlay";

const TABLE_COLUMNS = {
	drag: "36px",
	model: "minmax(240px, 2.4fr)",
	provider: "minmax(150px, 1fr)",
	type: "minmax(120px, 0.7fr)",
	status: "minmax(130px, 0.8fr)",
	context: "minmax(150px, 0.9fr)",
	features: "minmax(145px, 0.9fr)",
	updated: "minmax(180px, 1.1fr)",
	actions: "145px",
};

const tableColumns = Object.values(TABLE_COLUMNS).join(" ");

const models = [
	{
		id: 1,
		name: "gpt-5-chat",
		provider: "Azure OpenAI",
		type: "reasoning",
		status: "Disabled",
		context: "32K",
		output: "16K",
		features: ["IMG", "Stream"],
		updated: "Jun 17, 2026, 02:34 PM",
		icon: "openai",
	},
	{
		id: 2,
		name: "GPT 5.4",
		alias: "gpt-5.4",
		provider: "Azure OpenAI",
		type: "reasoning",
		status: "Active",
		context: "200K",
		output: "50K",
		features: ["IMG", "Stream"],
		updated: "Aug 19, 2026, 07:15 PM",
		icon: "openai",
	},
	{
		id: 3,
		name: "gpt-image-2",
		provider: "Azure OpenAI",
		type: "image",
		status: "Active",
		context: "N/A",
		output: "N/A",
		features: ["Stream"],
		updated: "Aug 20, 2026, 11:52 AM",
		icon: "openai",
	},
	{
		id: 4,
		name: "sora-2",
		provider: "Azure OpenAI",
		type: "video",
		status: "Disabled",
		context: "N/A",
		output: "N/A",
		features: ["Stream"],
		updated: "Jul 24, 2026, 05:56 PM",
		icon: "sora",
	},
	{
		id: 5,
		name: "DeepSeek-V4 Pro",
		alias: "DeepSeek-V4-Pro",
		provider: "Azure OpenAI",
		type: "reasoning",
		status: "Active",
		context: "242K",
		output: "35K",
		features: ["IMG", "Stream"],
		updated: "Aug 17, 2026, 03:32 PM",
		icon: "deepseek",
	},
	{
		id: 6,
		name: "Voxtral Mini 3B",
		alias: "RedHatAI/Voxtral-Mini-3B-2507-FP8-dynamic",
		provider: "Red Hat AI",
		type: "voice",
		status: "Active",
		context: "33K",
		output: "8K",
		features: ["Stream"],
		updated: "Aug 20, 2026, 01:30 PM",
		icon: "redhat",
	},
	{
		id: 7,
		name: "Whisper Large v3 Turbo",
		alias: "RedHatAI/whisper-large-v3-turbo-quantized.w4a16",
		provider: "Red Hat AI",
		type: "voice",
		status: "Active",
		context: "N/A",
		output: "N/A",
		features: ["Stream"],
		updated: "Aug 20, 2026, 01:30 PM",
		icon: "redhat",
	},
	{
		id: 8,
		name: "GPT-OSS 120B",
		alias: "RedHatAI/gpt-oss-120b",
		provider: "Red Hat AI",
		type: "reasoning",
		status: "Active",
		context: "131K",
		output: "33K",
		features: ["Stream"],
		updated: "Aug 20, 2026, 01:31 PM",
		icon: "redhat",
	},
	{
		id: 9,
		name: "Qwen3 Coder 480B",
		alias: "RedHatAI/Qwen3-Coder-480B-A35B-Instruct-FP8",
		provider: "Red Hat AI",
		type: "reasoning",
		status: "Active",
		context: "262K",
		output: "66K",
		features: ["Stream"],
		updated: "Aug 20, 2026, 01:30 PM",
		icon: "redhat",
	},
];

const typeConfig = {
	reasoning: {
		label: "reasoning",
		icon: <Bot size={13} />,
		bg: "rgba(201, 142, 56, 0.11)",
		color: "#93611d",
	},
	image: {
		label: "image",
		icon: <Image alt="" size={13} />,
		bg: "rgba(78, 120, 150, 0.1)",
		color: "#526d7f",
	},
	video: {
		label: "video",
		icon: <Video size={13} />,
		bg: "rgba(78, 120, 150, 0.1)",
		color: "#526d7f",
	},
	voice: {
		label: "voice",
		icon: <Volume2 size={13} />,
		bg: "rgba(78, 120, 150, 0.1)",
		color: "#526d7f",
	},
};

const tableGridSx = {
	display: "grid",
	gridTemplateColumns: tableColumns,
	width: "max-content",
	minWidth: "100%",
	boxSizing: "border-box",
};

const headerCellSx = {
	display: "flex",
	width: "100%",
	height: "100%",
	minWidth: 0,
	alignItems: "center",
	justifyContent: "flex-start",
	textAlign: "left",
	fontSize: 14,
	fontWeight: 700,
	color: "#465365",
};

const rowCellSx = {
	display: "flex",
	minWidth: 0,
	alignItems: "center",
	justifyContent: "flex-start",
};

const modelAvatarConfig = {
	openai: {
		bgcolor: "#08683f",
		color: "#ffffff",
		icon: <Bot size={24} strokeWidth={1.8} />,
	},
	sora: {
		bgcolor: "#e9eef7",
		color: "#3b5a88",
		icon: <Bot size={23} />,
	},
	deepseek: {
		bgcolor: "#eef2ff",
		color: "#173f98",
		icon: <Workflow size={24} />,
	},
	redhat: {
		bgcolor: "#f5f1ee",
		color: "#a20e1d",
		icon: <Zap size={21} fill="currentColor" />,
	},
};

function ModelAvatar({ type }) {
	const config = modelAvatarConfig[type] ?? modelAvatarConfig.redhat;

	return (
		<Box
			sx={{
				width: 40,
				height: 40,
				flexShrink: 0,
				borderRadius: "50%",
				display: "grid",
				placeItems: "center",
				bgcolor: config.bgcolor,
				color: config.color,
			}}
		>
			{config.icon}
		</Box>
	);
}

function ModelTypeChip({ type }) {
	const config = typeConfig[type];

	return (
		<Chip
			size="small"
			icon={config.icon}
			label={config.label}
			sx={{
				height: 28,
				bgcolor: config.bg,
				color: config.color,
				borderRadius: "6px",
				fontWeight: 600,
				fontSize: 13,
				"& .MuiChip-icon": {
					color: "inherit",
					ml: 0.8,
				},
			}}
		/>
	);
}

function StatusChip({ status }) {
	const active = status === "Active";

	return (
		<Chip
			size="small"
			icon={
				active ? (
					<RefreshCw size={13} />
				) : (
					<Box
						sx={{
							width: 13,
							height: 13,
							border: "1.5px solid currentColor",
							borderRadius: "50%",
							display: "grid",
							placeItems: "center",
							fontSize: 9,
							fontWeight: 700,
						}}
					>
						×
					</Box>
				)
			}
			label={status}
			sx={{
				height: 30,
				px: 0.3,
				bgcolor: active ? "rgba(28, 154, 97, 0.1)" : "rgba(190, 70, 70, 0.09)",
				color: active ? "#168153" : "#9d3c3c",
				borderRadius: "6px",
				fontWeight: 600,
				fontSize: 13,
				"& .MuiChip-icon": {
					color: "inherit",
				},
			}}
		/>
	);
}

function FeatureChip({ feature }) {
	const isImage = feature === "IMG";

	return (
		<Chip
			size="small"
			icon={isImage ? <Image alt="" size={12} /> : <Zap size={12} />}
			label={feature}
			sx={{
				height: 28,
				bgcolor: isImage ? "rgba(194, 137, 67, 0.1)" : "rgba(28, 115, 173, 0.1)",
				color: isImage ? "#986324" : "#17648e",
				borderRadius: "6px",
				fontWeight: 700,
				fontSize: 13,
				"& .MuiChip-icon": {
					color: "inherit",
					ml: 0.8,
				},
			}}
		/>
	);
}

function DragHandle() {
	return (
		<Box
			sx={{
				...rowCellSx,
				height: "100%",
				color: "#7d8997",
				cursor: "grab",
			}}
		>
			<Box
				sx={{
					width: 14,
					display: "grid",
					gridTemplateColumns: "repeat(2, 3px)",
					gap: "3px",
				}}
			>
				{Array.from({ length: 6 }).map((_, index) => (
					<Box
						key={index}
						sx={{
							width: 3,
							height: 3,
							borderRadius: "50%",
							bgcolor: "#8e99a7",
						}}
					/>
				))}
			</Box>
		</Box>
	);
}

function TableHeader() {
	const headers = ["", "Model", "Provider", "Type", "Status", "Context / Output", "Features", "Updated", "Actions"];

	return (
		<Box
			sx={{
				...tableGridSx,
				minHeight: 54,
				px: 2.5,
				bgcolor: "#fafbfd",
				borderTop: "1px solid #e4e8ee",
				borderBottom: "1px solid #e4e8ee",
				alignItems: "stretch",
			}}
		>
			{headers.map((header, index) => (
				<Box
					key={`${header}-${index}`}
					sx={{
						...headerCellSx,
						...(header === "Features" && {
							px: 1.5,
						}),
						...(header === "Updated" && {
							px: 1,
						}),
						...(header === "Actions" && {
							px: 1,
						}),
					}}
				>
					{header}
				</Box>
			))}
		</Box>
	);
}

function ModelRow({ model, setEditOverlayOpen }) {
	return (
		<Box
			sx={{
				...tableGridSx,
				minHeight: 86,
				px: 2.5,
				alignItems: "center",
				borderBottom: "1px solid #edf0f4",
				transition: "background-color 0.15s ease",
				"&:hover": {
					bgcolor: "#fafcff",
				},
			}}
		>
			<DragHandle />

			<Box sx={rowCellSx}>
				<Stack
					direction="row"
					spacing={2}
					sx={{
						minWidth: 0,
						alignItems: "center",
					}}
				>
					<ModelAvatar type={model.icon} />

					<Box sx={{ minWidth: 0 }}>
						<Typography
							sx={{
								fontSize: 16,
								fontWeight: 700,
								color: "#263241",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{model.name}
						</Typography>

						{model.alias && (
							<Typography
								sx={{
									mt: 0.2,
									fontSize: 13,
									color: "#536172",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{model.alias}
							</Typography>
						)}
					</Box>
				</Stack>
			</Box>

			<Box sx={rowCellSx}>
				<Stack
					direction="row"
					spacing={0.7}
					sx={{
						alignItems: "center",
					}}
				>
					<Cloud size={16} color="#59809a" />

					<Typography
						sx={{
							fontSize: 15,
							color: "#364352",
						}}
					>
						{model.provider}
					</Typography>
				</Stack>
			</Box>

			<Box sx={rowCellSx}>
				<ModelTypeChip type={model.type} />
			</Box>

			<Box sx={rowCellSx}>
				<StatusChip status={model.status} />
			</Box>

			<Box sx={rowCellSx}>
				<Stack spacing={0.4}>
					<Stack
						direction="row"
						spacing={0.8}
						sx={{
							alignItems: "center",
						}}
					>
						<Bot size={12} color="#7c8793" />

						<Typography
							sx={{
								fontSize: 14,
								color: "#4b5866",
							}}
						>
							{model.context}
						</Typography>
					</Stack>

					<Stack
						direction="row"
						spacing={0.8}
						sx={{
							alignItems: "center",
						}}
					>
						<Zap size={12} color="#7c8793" />

						<Typography
							sx={{
								fontSize: 14,
								color: "#4b5866",
							}}
						>
							{model.output}
						</Typography>
					</Stack>
				</Stack>
			</Box>

			<Box
				sx={{
					...rowCellSx,
					px: 1.5,
				}}
			>
				<Stack
					spacing={0.5}
					sx={{
						alignItems: "flex-start",
					}}
				>
					{model.features.map((feature) => (
						<FeatureChip key={feature} feature={feature} />
					))}
				</Stack>
			</Box>

			<Box
				sx={{
					...rowCellSx,
					px: 1,
				}}
			>
				<Typography
					sx={{
						fontSize: 14,
						color: "#4b5866",
						lineHeight: 1.6,
					}}
				>
					{model.updated}
				</Typography>
			</Box>

			<Box
				sx={{
					...rowCellSx,
					px: 1,
				}}
			>
				<Stack
					direction="row"
					spacing={0.5}
					sx={{
						alignItems: "center",
					}}
				>
					<Tooltip title="Edit" onClick={() => setEditOverlayOpen(true)}>
						<IconButton
							size="small"
							sx={{
								color: "#19855e",
							}}
						>
							<Edit3 size={20} />
						</IconButton>
					</Tooltip>

					<Tooltip title="Permissions">
						<IconButton
							size="small"
							sx={{
								color: "#61788f",
							}}
						>
							<Shield size={19} />
						</IconButton>
					</Tooltip>

					<Tooltip title="Delete">
						<IconButton
							size="small"
							sx={{
								color: "#a94d4d",
							}}
						>
							<Trash2 size={19} />
						</IconButton>
					</Tooltip>
				</Stack>
			</Box>
		</Box>
	);
}

export default function UserModelsPage() {
	const [search, setSearch] = useState("");
	const [provider, setProvider] = useState("all");
	const [type, setType] = useState("all");
	const [page, setPage] = useState(1);

	const filteredModels = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		return models.filter((model) => {
			const searchableText = [model.name, model.alias, model.provider].filter(Boolean).join(" ").toLowerCase();

			const matchesSearch = !searchValue || searchableText.includes(searchValue);

			const matchesProvider = provider === "all" || model.provider === provider;

			const matchesType = type === "all" || model.type === type;

			return matchesSearch && matchesProvider && matchesType;
		});
	}, [search, provider, type]);

	const handleRefresh = () => {
		setSearch("");
		setProvider("all");
		setType("all");
		setPage(1);
	};

	const [editOverlayOpen, setEditOverlayOpen] = useState(false);

	return (
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: "#f8fafc",
				p: {
					xs: 2,
					sm: 3,
				},
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 2,
					mb: 3,
				}}
			>
				<Box>
					<Typography
						component="h1"
						sx={{
							fontSize: {
								xs: 28,
								sm: 32,
							},
							fontWeight: 800,
							color: "#202a38",
							letterSpacing: "-0.7px",
						}}
					>
						User Models
					</Typography>

					<Typography
						sx={{
							mt: 0.5,
							color: "#53606e",
							fontSize: 15,
							fontWeight: 500,
						}}
					>
						{models.length} models available
					</Typography>
				</Box>

				<Button
					variant="contained"
					startIcon={<Plus size={18} />}
					onClick={() => setEditOverlayOpen(true)}
					sx={{
						flexShrink: 0,
						height: 40,
						px: 2,
						borderRadius: "8px",
						bgcolor: "#1438aa",
						textTransform: "none",
						fontWeight: 700,
						fontSize: 14,
						whiteSpace: "nowrap",
						boxShadow: "0 2px 6px rgba(28, 55, 150, 0.18)",
						"&:hover": {
							bgcolor: "#102e91",
						},
					}}
				>
					Add New Model
				</Button>
			</Box>

			<Paper
				elevation={0}
				sx={{
					border: "1px solid #dfe5ec",
					borderRadius: "10px",
					overflow: "hidden",
					bgcolor: "#ffffff",
					boxShadow: "0 2px 5px rgba(25, 42, 70, 0.03)",
				}}
			>
				<Stack
					direction="row"
					sx={{
						px: 2.5,
						py: 2.2,
						borderBottom: "1px solid #e7ebf0",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Stack
						direction="row"
						spacing={1.2}
						sx={{
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								color: "#35516c",
							}}
						>
							<Workflow size={25} strokeWidth={1.8} />
						</Box>

						<Typography
							sx={{
								fontSize: 20,
								fontWeight: 750,
								color: "#2b3645",
							}}
						>
							Available Models
						</Typography>
					</Stack>

					<Button
						variant="outlined"
						startIcon={<RefreshCw size={19} />}
						onClick={handleRefresh}
						sx={{
							height: 40,
							textTransform: "none",
							color: "#445263",
							borderColor: "#d6dde5",
							borderRadius: "8px",
							fontWeight: 600,
							px: 2,
							"&:hover": {
								borderColor: "#b9c4cf",
								bgcolor: "#f8fafc",
							},
						}}
					>
						Refresh
					</Button>
				</Stack>

				<Box
					sx={{
						p: 2.5,
						borderBottom: "1px solid #e7ebf0",
					}}
				>
					<Stack
						direction={{
							xs: "column",
							md: "row",
						}}
						spacing={1.8}
					>
						<TextField
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Search models, providers..."
							size="small"
							fullWidth
							sx={{
								maxWidth: {
									md: 470,
								},
								"& .MuiOutlinedInput-root": {
									height: 44,
									borderRadius: "8px",
									bgcolor: "#ffffff",
								},
							}}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<Search size={19} color="#647181" />
										</InputAdornment>
									),
								},
							}}
						/>

						<Select
							value={provider}
							onChange={(event) => setProvider(event.target.value)}
							fullWidth
							size="small"
							IconComponent={ChevronDown}
							sx={{
								maxWidth: {
									md: 470,
								},
								height: 44,
								borderRadius: "8px",
								color: "#6a7583",
							}}
						>
							<MenuItem value="all">All Providers</MenuItem>
							<MenuItem value="Azure OpenAI">Azure OpenAI</MenuItem>
							<MenuItem value="Red Hat AI">Red Hat AI</MenuItem>
						</Select>

						<Select
							value={type}
							onChange={(event) => setType(event.target.value)}
							fullWidth
							size="small"
							IconComponent={ChevronDown}
							sx={{
								maxWidth: {
									md: 470,
								},
								height: 44,
								borderRadius: "8px",
								color: "#6a7583",
							}}
						>
							<MenuItem value="all">All Types</MenuItem>
							<MenuItem value="reasoning">Reasoning</MenuItem>
							<MenuItem value="image">Image</MenuItem>
							<MenuItem value="video">Video</MenuItem>
							<MenuItem value="voice">Voice</MenuItem>
						</Select>
					</Stack>
				</Box>

				<Box
					sx={{
						width: "100%",
						overflowX: "auto",
						overflowY: "hidden",
					}}
				>
					<TableHeader />

					{filteredModels.map((model) => (
						<ModelRow key={model.id} model={model} setEditOverlayOpen={setEditOverlayOpen} />
					))}

					{filteredModels.length === 0 && (
						<Box
							sx={{
								py: 10,
								textAlign: "center",
							}}
						>
							<Typography
								sx={{
									fontSize: 17,
									fontWeight: 700,
									color: "#344152",
								}}
							>
								No models found
							</Typography>

							<Typography
								sx={{
									mt: 0.5,
									color: "#758190",
								}}
							>
								Try changing your search or filters.
							</Typography>
						</Box>
					)}
				</Box>

				<Box
					sx={{
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						gap: 2,
						px: 2.5,
						py: 1.5,
						minHeight: 66,
						borderTop: "1px solid #e7ebf0",
					}}
				>
					<Typography
						sx={{
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)",
							fontSize: 15,
							color: "#465363",
							fontWeight: 500,
							whiteSpace: "nowrap",
						}}
					>
						Showing 1 to {filteredModels.length} of {filteredModels.length} models
					</Typography>

					<Stack
						direction="row"
						spacing={0.8}
						sx={{
							alignItems: "center",
						}}
					>
						<IconButton
							disabled
							size="small"
							sx={{
								width: 36,
								height: 36,
								border: "1px solid #dfe5ec",
								borderRadius: "8px",
							}}
						>
							<ChevronLeft size={18} />
						</IconButton>

						<Button
							variant="outlined"
							onClick={() => setPage(1)}
							sx={{
								minWidth: 38,
								width: 38,
								height: 36,
								p: 0,
								borderRadius: "8px",
								borderColor: "#98a8b8",
								color: "#164170",
							}}
						>
							{page}
						</Button>

						<IconButton
							disabled
							size="small"
							sx={{
								width: 36,
								height: 36,
								border: "1px solid #dfe5ec",
								borderRadius: "8px",
							}}
						>
							<ChevronRight size={18} />
						</IconButton>
					</Stack>

					<Select
						value={10}
						size="small"
						sx={{
							height: 38,
							minWidth: 110,
							borderRadius: "8px",
							color: "#455363",
							fontSize: 14,
						}}
					>
						<MenuItem value={10}>10 / page</MenuItem>
						<MenuItem value={20}>20 / page</MenuItem>
						<MenuItem value={50}>50 / page</MenuItem>
					</Select>
				</Box>
			</Paper>

			<ModelEditOverlay open={editOverlayOpen} onClose={() => setEditOverlayOpen(false)} />
		</Box>
	);
}
