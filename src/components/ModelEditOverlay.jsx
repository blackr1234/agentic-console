"use client";

import { useState } from "react";
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	Divider,
	FormControl,
	FormControlLabel,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import {
	Bot,
	Box as BoxIcon,
	BrainCircuit,
	Check,
	Cloud,
	Cpu,
	DollarSign,
	KeyRound,
	Link,
	LockKeyhole,
	Maximize2,
	Send,
	SquareFunction,
	Thermometer,
	X,
	Zap,
} from "lucide-react";

const PROVIDERS = ["Ollama", "OpenAI", "Azure OpenAI", "Open Router", "Local", "Alibaba cloud", "Red Hat AI"];

const LLM_TYPES = ["text", "voice", "image", "multimodal"];

export default function ModelEditOverlay({ open, onClose }) {
	const [provider, setProvider] = useState("Red Hat AI");
	const [endpointUrl, setEndpointUrl] = useState("https://voxtral-mini-3b.apps.mf.chislai.io/v1");
	const [apiKey, setApiKey] = useState("");
	const [llmType, setLlmType] = useState("voice");
	const [temperature, setTemperature] = useState("0.7");
	const [maxContext, setMaxContext] = useState("32768");
	const [maxOutput, setMaxOutput] = useState("8192");
	const [costInput, setCostInput] = useState("0");
	const [costOutput, setCostOutput] = useState("0");
	const [apiVersion, setApiVersion] = useState("");

	const [useDefaultImageProcessor, setUseDefaultImageProcessor] = useState(false);
	const [canProcessImages, setCanProcessImages] = useState(false);
	const [enableStreaming, setEnableStreaming] = useState(true);

	const handleVerifyAndUpdate = () => {
		console.log({
			provider,
			endpointUrl,
			apiKey,
			llmType,
			temperature,
			maxContext,
			maxOutput,
			costInput,
			costOutput,
			apiVersion,
			useDefaultImageProcessor,
			canProcessImages,
			enableStreaming,
		});

		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth={false}
			disableScrollLock
			slotProps={{
				paper: {
					component: Paper,
					elevation: 24,
					sx: {
						width: {
							xs: "100%",
							sm: "calc(100vw - 48px)",
						},
						height: {
							xs: "100%",
							sm: "calc(100vh - 48px)",
						},
						maxWidth: "none",
						maxHeight: "none",
						m: {
							xs: 0,
							sm: 3,
						},
						borderRadius: {
							xs: 0,
							sm: 2,
						},
						overflow: "hidden",
						display: "flex",
						flexDirection: "column",
					},
				},
				backdrop: {
					sx: {
						backgroundColor: "rgba(15, 23, 42, 0.5)",
						backdropFilter: "blur(2px)",
					},
				},
			}}
		>
			{/* Header */}
			<Box
				sx={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					px: {
						xs: 3,
						sm: 4,
					},
					py: 3,
					flexShrink: 0,
				}}
			>
				<Box>
					<Typography
						variant="h6"
						sx={{
							fontWeight: 700,
							mb: 0.5,
						}}
					>
						Edit Voxtral Mini 3B
					</Typography>

					<Typography variant="body2" color="text.secondary">
						View and edit the configuration for Voxtral Mini 3B
					</Typography>
				</Box>

				<IconButton
					onClick={onClose}
					aria-label="Close"
					sx={{
						mt: -0.5,
					}}
				>
					<X size={21} />
				</IconButton>
			</Box>

			<Divider />

			{/* Scrollable content */}
			<Box
				sx={{
					flex: 1,
					overflowY: "auto",
					px: {
						xs: 3,
						sm: 4,
						md: 5,
					},
					py: 3,
				}}
			>
				<Box
					sx={{
						maxWidth: 1600,
						mx: "auto",
					}}
				>
					{/* Top configuration section */}
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								lg: "1fr 1fr",
							},
							gap: 3,
						}}
					>
						{/* Left column */}
						<Stack spacing={3}>
							<FormControl fullWidth>
								<InputLabel id="provider-label">Provider *</InputLabel>

								<Select
									labelId="provider-label"
									value={provider}
									label="Provider *"
									onChange={(event) => setProvider(event.target.value)}
									startAdornment={
										<Box
											sx={{
												display: "flex",
												mr: 1,
												color: "text.secondary",
											}}
										>
											<Cloud size={18} />
										</Box>
									}
								>
									{PROVIDERS.map((item) => (
										<MenuItem key={item} value={item}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<Box
								sx={{
									display: "grid",
									gridTemplateColumns: {
										xs: "1fr",
										sm: "1fr 1fr",
									},
									gap: 2,
								}}
							>
								<Field
									label="Max Context"
									icon={<Maximize2 size={17} />}
									value={maxContext}
									onChange={setMaxContext}
									helperText="Maximum number of context tokens the model can process"
								/>

								<Field
									label="Max Output"
									icon={<Send size={17} />}
									value={maxOutput}
									onChange={setMaxOutput}
									helperText="Maximum number of tokens the model can generate"
								/>
							</Box>

							<Field
								label="API Version"
								icon={<Zap size={17} />}
								value={apiVersion}
								onChange={setApiVersion}
								placeholder="Enter API version (e.g., 2024-02)"
								helperText="Optional: Specify API version for providers that require it (e.g., Azure OpenAI)"
							/>
						</Stack>

						{/* Right column */}
						<Stack spacing={3}>
							<Field
								label="Endpoint URL"
								icon={<Link size={17} />}
								value={endpointUrl}
								onChange={setEndpointUrl}
							/>

							<Field
								label="API Key"
								icon={<KeyRound size={17} />}
								value={apiKey}
								onChange={setApiKey}
								placeholder="Enter API key"
								type="password"
							/>

							<Box
								sx={{
									display: "grid",
									gridTemplateColumns: {
										xs: "1fr",
										sm: "1fr 1fr",
									},
									gap: 2,
								}}
							>
								<FormControl fullWidth>
									<InputLabel id="llm-type-label">LLM Type *</InputLabel>

									<Select
										labelId="llm-type-label"
										value={llmType}
										label="LLM Type *"
										onChange={(event) => setLlmType(event.target.value)}
										startAdornment={
											<Box
												sx={{
													display: "flex",
													mr: 1,
													color: "text.secondary",
												}}
											>
												<Bot size={17} />
											</Box>
										}
									>
										{LLM_TYPES.map((item) => (
											<MenuItem key={item} value={item}>
												{item}
											</MenuItem>
										))}
									</Select>
								</FormControl>

								<Field
									label="LLM Temperature"
									icon={<Thermometer size={17} />}
									value={temperature}
									onChange={setTemperature}
									helperText="Value between 0 and 1 (lower for more deterministic responses)"
								/>
							</Box>

							<Box
								sx={{
									display: "grid",
									gridTemplateColumns: {
										xs: "1fr",
										sm: "1fr 1fr",
									},
									gap: 2,
								}}
							>
								<Field
									label="Cost Input"
									icon={<DollarSign size={17} />}
									value={costInput}
									onChange={setCostInput}
									helperText="Cost per input token (e.g., 0.000001)"
								/>

								<Field
									label="Cost Output"
									icon={<DollarSign size={17} />}
									value={costOutput}
									onChange={setCostOutput}
									helperText="Cost per output token (e.g., 0.000002)"
								/>
							</Box>
						</Stack>
					</Box>

					{/* Options */}
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								lg: "1fr 1fr",
							},
							gap: 2,
							mt: 3,
						}}
					>
						<OptionCard
							checked={useDefaultImageProcessor}
							onChange={setUseDefaultImageProcessor}
							icon={<BoxIcon size={19} />}
							title="Use Default Image Processor"
							description="Enable to use the default image processor"
						/>

						<OptionCard
							checked={canProcessImages}
							onChange={setCanProcessImages}
							icon={<BrainCircuit size={19} />}
							title="Can Process Images"
							description="Enable if this model can process images"
						/>

						<OptionCard
							checked={enableStreaming}
							onChange={setEnableStreaming}
							icon={<SquareFunction size={19} />}
							title="Enable Streaming"
							description="Enable to use streaming responses from this model"
						/>
					</Box>
				</Box>
			</Box>

			{/* Footer */}
			<Divider />

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					gap: 1.5,
					px: {
						xs: 3,
						sm: 4,
					},
					py: 2,
					flexShrink: 0,
					backgroundColor: "background.paper",
				}}
			>
				<Button
					variant="outlined"
					onClick={onClose}
					sx={{
						minWidth: 84,
					}}
				>
					Cancel
				</Button>

				<Button
					variant="contained"
					onClick={handleVerifyAndUpdate}
					startIcon={<Check size={18} />}
					sx={{
						minWidth: 170,
						px: 2.5,
					}}
				>
					Verify and Update
				</Button>
			</Box>
		</Dialog>
	);
}

function Field({ label, icon, value, onChange, placeholder, helperText, type = "text" }) {
	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 0.75,
					mb: 0.75,
				}}
			>
				<Box
					sx={{
						display: "flex",
						color: "text.secondary",
					}}
				>
					{icon}
				</Box>

				<Typography
					variant="body2"
					sx={{
						fontWeight: 600,
					}}
				>
					{label}
				</Typography>

				{label === "Provider" || label === "Endpoint URL" || label === "LLM Type" ? (
					<Typography
						component="span"
						color="error"
						sx={{
							fontWeight: 700,
						}}
					>
						*
					</Typography>
				) : null}
			</Box>

			<TextField
				fullWidth
				size="small"
				type={type}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				helperText={helperText}
				slotProps={{
					input: {
						startAdornment:
							type === "password" ? <LockKeyhole size={17} style={{ marginRight: 8 }} /> : undefined,
					},
				}}
			/>
		</Box>
	);
}

function OptionCard({ checked, onChange, icon, title, description }) {
	return (
		<Box
			component="label"
			sx={{
				display: "flex",
				alignItems: "flex-start",
				gap: 1,
				border: 1,
				borderColor: "divider",
				borderRadius: 2,
				p: 2,
				cursor: "pointer",
				transition: "all 0.2s ease",
				"&:hover": {
					borderColor: "primary.main",
					backgroundColor: "action.hover",
				},
			}}
		>
			<Checkbox
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
				sx={{
					mt: -0.5,
					ml: -1,
				}}
			/>

			<Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 0.75,
						mb: 0.5,
					}}
				>
					{icon}

					<Typography
						variant="body2"
						sx={{
							fontWeight: 600,
						}}
					>
						{title}
					</Typography>
				</Box>

				<Typography variant="caption" color="text.secondary">
					{description}
				</Typography>
			</Box>
		</Box>
	);
}
