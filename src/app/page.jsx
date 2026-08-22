"use client";

import { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
} from "recharts";
import { RefreshCw, Download, Search, Bell, Moon, Languages } from "lucide-react";

// ---- Mock data ----
const usageOverTime = [
	{ date: "2026-08-14", claude: 2.0, gpt: 0.5, gemini: 0.2 },
	{ date: "2026-08-15", claude: 3.0, gpt: 0.6, gemini: 0.3 },
	{ date: "2026-08-16", claude: 6.0, gpt: 1.0, gemini: 0.4 },
	{ date: "2026-08-17", claude: 38.0, gpt: 2.0, gemini: 0.5 },
	{ date: "2026-08-18", claude: 22.0, gpt: 1.8, gemini: 0.4 },
	{ date: "2026-08-19", claude: 15.0, gpt: 1.5, gemini: 0.3 },
	{ date: "2026-08-20", claude: 58.0, gpt: 2.4, gemini: 0.6 },
	{ date: "2026-08-21", claude: 4.0, gpt: 1.0, gemini: 0.3 },
];

const modelDistribution = [
	{ name: "Claude", value: 92, color: "#84cc16" },
	{ name: "GPT-4", value: 6, color: "#2563eb" },
	{ name: "Other", value: 2, color: "#a3a3a3" },
];

// ---- Shared style tokens ----
const colors = {
	bg: "#f8fafc",
	card: "#ffffff",
	border: "#e2e8f0",
	text: "#1e293b",
	subtext: "#94a3b8",
	blue: "#2563eb",
	emerald: "#10b981",
	purple: "#9333ea",
};

const styles = {
	page: {
		minHeight: "100vh",
		width: "100%",
		background: colors.bg,
		padding: "32px",
		fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
		color: colors.text,
		boxSizing: "border-box",
	},
	navBar: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 12,
		borderRadius: 16,
		border: `1px solid ${colors.border}`,
		background: colors.card,
		padding: "12px 20px",
		marginBottom: 24,
		boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
	},
	logoWrap: { display: "flex", alignItems: "center", gap: 8 },
	logoBox: {
		width: 32,
		height: 32,
		borderRadius: 8,
		background: "#0f172a",
		color: "#fff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: 700,
		fontSize: 14,
	},
	logoText: { fontSize: 18, fontWeight: 600, color: "#1e293b" },
	navRight: { display: "flex", alignItems: "center", gap: 16, color: "#94a3b8" },
	userPill: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		borderRadius: 999,
		border: `1px solid ${colors.border}`,
		padding: "4px 10px",
	},
	avatar: {
		width: 24,
		height: 24,
		borderRadius: "50%",
		background: "#f97316",
		color: "#fff",
		fontSize: 11,
		fontWeight: 700,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	userName: { fontSize: 12, fontWeight: 500, color: "#334155", lineHeight: 1.2 },
	adminBadge: {
		background: "#ecfccb",
		color: "#4d7c0f",
		fontSize: 10,
		fontWeight: 600,
		padding: "0 4px",
		borderRadius: 4,
		display: "inline-block",
	},
	headerRow: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
		marginBottom: 24,
	},
	h1: { fontSize: 30, fontWeight: 700, color: "#0f172a", margin: 0 },
	headerSub: { marginTop: 4, fontSize: 14, color: "#94a3b8" },
	searchWrap: { position: "relative" },
	searchIcon: {
		position: "absolute",
		left: 12,
		top: "50%",
		transform: "translateY(-50%)",
		color: "#cbd5e1",
		pointerEvents: "none",
	},
	searchInput: {
		width: 288,
		borderRadius: 999,
		border: `1px solid ${colors.border}`,
		background: "#fff",
		padding: "8px 16px 8px 36px",
		fontSize: 14,
		color: "#64748b",
		outline: "none",
		boxSizing: "border-box",
	},
	statRow: { display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 },
	statCard: {
		position: "relative",
		flex: "1 1 220px",
		minWidth: 220,
		overflow: "hidden",
		borderRadius: 16,
		border: `1px solid ${colors.border}`,
		background: colors.card,
		padding: 24,
		boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
	},
	statBlob: (bg) => ({
		position: "absolute",
		top: -24,
		right: -24,
		width: 112,
		height: 112,
		borderRadius: "50%",
		background: bg,
		opacity: 0.4,
		pointerEvents: "none",
	}),
	statLabelRow: {
		position: "relative",
		display: "flex",
		alignItems: "center",
		gap: 8,
		fontSize: 12,
		fontWeight: 600,
		letterSpacing: 0.4,
		color: "#64748b",
	},
	dot: (bg) => ({
		width: 8,
		height: 8,
		borderRadius: "50%",
		background: bg,
		display: "inline-block",
	}),
	statValue: {
		position: "relative",
		marginTop: 12,
		fontSize: 36,
		fontWeight: 700,
		color: "#0f172a",
	},
	statSub: { position: "relative", marginTop: 4, fontSize: 14, color: "#94a3b8" },
	controlsCard: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
		borderRadius: 16,
		border: `1px solid ${colors.border}`,
		background: colors.card,
		padding: 20,
		marginBottom: 24,
		boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
	},
	controlsTitle: { fontSize: 18, fontWeight: 600, color: "#1e293b", margin: 0 },
	controlsSub: { fontSize: 14, color: "#94a3b8", margin: "4px 0 0" },
	controlsRight: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 },
	dateBox: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		borderRadius: 8,
		border: `1px solid ${colors.border}`,
		padding: "8px 12px",
		fontSize: 14,
		color: "#475569",
	},
	refreshBtn: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		borderRadius: 8,
		background: colors.blue,
		color: "#fff",
		border: "none",
		padding: "8px 16px",
		fontSize: 14,
		fontWeight: 500,
		cursor: "pointer",
	},
	toggleGroup: {
		display: "flex",
		borderRadius: 8,
		border: `1px solid ${colors.border}`,
		padding: 4,
	},
	toggleBtn: (active) => ({
		borderRadius: 6,
		padding: "6px 12px",
		fontSize: 14,
		fontWeight: 500,
		border: "none",
		cursor: "pointer",
		background: active ? colors.blue : "transparent",
		color: active ? "#fff" : "#64748b",
	}),
	exportBtn: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		borderRadius: 8,
		background: colors.emerald,
		color: "#fff",
		border: "none",
		padding: "8px 16px",
		fontSize: 14,
		fontWeight: 500,
		cursor: "pointer",
	},
	chartGrid: {
		display: "grid",
		gridTemplateColumns: "1fr",
		gap: 16,
	},
	chartCard: {
		borderRadius: 16,
		border: `1px solid ${colors.border}`,
		background: colors.card,
		padding: 24,
		boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
	},
	chartTitleRow: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		marginBottom: 16,
	},
	chartTitleBar: (bg) => ({
		width: 4,
		height: 16,
		borderRadius: 2,
		background: bg,
		display: "inline-block",
	}),
	chartTitle: { fontSize: 16, fontWeight: 600, color: "#1e293b", margin: 0 },
};

function StatCard({ label, value, sublabel, dotColor, blobColor }) {
	return (
		<div style={styles.statCard}>
			<div style={styles.statBlob(blobColor)} />
			<div style={styles.statLabelRow}>
				<span style={styles.dot(dotColor)} />
				{label}
			</div>
			<div style={styles.statValue}>{value}</div>
			<div style={styles.statSub}>{sublabel}</div>
		</div>
	);
}

export default function UsageAnalyticsDashboard() {
	const [granularity, setGranularity] = useState("Day");
	const granularities = ["mins", "Hour", "Day", "Week"];

	const formatToken = (n) =>
		n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` : n;

	return (
		<div style={styles.page}>
			{/* Top nav */}
			<div style={styles.navBar}>
				<div style={styles.logoWrap}>
					<div style={styles.logoBox}>A</div>
					<span style={styles.logoText}>amidas.ai</span>
				</div>
				<div style={styles.navRight}>
					<Moon size={18} />
					<Languages size={18} />
					<div style={styles.userPill}>
						<div style={styles.avatar}>D</div>
						<div>
							<div style={styles.userName}>Demo Amidas</div>
							<span style={styles.adminBadge}>Admin</span>
						</div>
					</div>
					<Bell size={18} />
				</div>
			</div>

			{/* Header */}
			<div style={styles.headerRow}>
				<div>
					<h1 style={styles.h1}>Usage Analytics</h1>
					<p style={styles.headerSub}>Track your user metrics and usage</p>
				</div>
				<div style={styles.searchWrap}>
					<Search size={16} style={styles.searchIcon} />
					<input placeholder="Search by user name or email" style={styles.searchInput} />
				</div>
			</div>

			{/* Stat cards */}
			<div style={styles.statRow}>
				<StatCard
					label="TODAY USAGE"
					value="1,563,149"
					sublabel="tokens used today"
					dotColor={colors.blue}
					blobColor="#c7d2fe"
				/>
				<StatCard
					label="THIS WEEK"
					value="88,090,846"
					sublabel="tokens this week"
					dotColor={colors.emerald}
					blobColor="#a7f3d0"
				/>
				<StatCard
					label="THIS MONTH"
					value="161,496,762"
					sublabel="tokens this month"
					dotColor={colors.purple}
					blobColor="#fbcfe8"
				/>
			</div>

			{/* Controls */}
			<div style={styles.controlsCard}>
				<div>
					<h2 style={styles.controlsTitle}>Usage Analytics Controls</h2>
					<p style={styles.controlsSub}>Showing data for all users</p>
				</div>

				<div style={styles.controlsRight}>
					<div style={styles.dateBox}>
						2026-08-14 <span style={{ color: "#cbd5e1" }}>→</span> 2026-08-21
					</div>

					<button style={styles.refreshBtn}>
						<RefreshCw size={14} /> Refresh
					</button>

					<div style={styles.toggleGroup}>
						{granularities.map((g) => (
							<button
								key={g}
								onClick={() => setGranularity(g)}
								style={styles.toggleBtn(granularity === g)}
							>
								{g}
							</button>
						))}
					</div>

					<button style={styles.exportBtn}>
						<Download size={14} /> Export to CSV
					</button>
				</div>
			</div>

			{/* Charts */}
			<div
				style={{
					...styles.chartGrid,
					gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
				}}
			>
				{/* Line chart */}
				<div style={styles.chartCard}>
					<div style={styles.chartTitleRow}>
						<span style={styles.chartTitleBar(colors.blue)} />
						<h3 style={styles.chartTitle}>Usage Over Time</h3>
					</div>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={usageOverTime}>
							<CartesianGrid stroke="#f1f5f9" vertical={false} />
							<XAxis
								dataKey="date"
								tick={{ fontSize: 11, fill: "#94a3b8" }}
								axisLine={{ stroke: "#e2e8f0" }}
								tickLine={false}
							/>
							<YAxis
								tickFormatter={(v) => formatToken(v * 1_000_000)}
								tick={{ fontSize: 11, fill: "#94a3b8" }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip
								formatter={(v) => formatToken(v * 1_000_000)}
								contentStyle={{
									borderRadius: 10,
									border: "1px solid #e2e8f0",
									fontSize: 12,
								}}
							/>
							<Line
								type="monotone"
								dataKey="claude"
								stroke="#f59e0b"
								strokeWidth={2}
								dot={false}
								name="Claude"
							/>
							<Line
								type="monotone"
								dataKey="gpt"
								stroke="#6366f1"
								strokeWidth={2}
								dot={false}
								name="GPT-4"
							/>
							<Line
								type="monotone"
								dataKey="gemini"
								stroke="#0ea5e9"
								strokeWidth={2}
								dot={false}
								name="Gemini"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* Pie chart */}
				<div style={styles.chartCard}>
					<div style={styles.chartTitleRow}>
						<span style={styles.chartTitleBar(colors.emerald)} />
						<h3 style={styles.chartTitle}>Model Usage Distribution</h3>
					</div>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={modelDistribution}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								innerRadius={0}
								outerRadius={110}
							>
								{modelDistribution.map((entry, i) => (
									<Cell key={i} fill={entry.color} stroke="#fff" strokeWidth={2} />
								))}
							</Pie>
							<Tooltip
								formatter={(v) => `${v}%`}
								contentStyle={{
									borderRadius: 10,
									border: "1px solid #e2e8f0",
									fontSize: 12,
								}}
							/>
							<Legend
								verticalAlign="bottom"
								iconType="circle"
								wrapperStyle={{ fontSize: 12, color: "#64748b" }}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
