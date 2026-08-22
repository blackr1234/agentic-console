import { Inter } from "next/font/google";
import Providers from "@/providers";
import AppShell from "@/components/AppShell";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata = {
	title: "Agentic Console",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<AppShell>{children}</AppShell>
				</Providers>
			</body>
		</html>
	);
}
