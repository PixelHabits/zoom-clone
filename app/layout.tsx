import type { Metadata } from 'next';
import { Darker_Grotesque, Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { dark } from '@clerk/themes';
import { Toaster } from '@/components/ui/toaster';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "PixelHabit's Zoom-Clone",
	description: 'Thanks for checking out my project',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<ClerkProvider
				appearance={{
					elements: {
						socialButtonsIconButton: 'bg-zinc-950',
						socialButtonsProviderIcon__github: 'invert',
					},
					layout: {
						socialButtonsVariant: 'iconButton',
						logoImageUrl: 'icons/yoom-logo.svg',
					},
					baseTheme: dark,
					variables: {
						colorText: '#fff',
						colorPrimary: '#0E78F9',
						colorBackground: '#1c1f2e',
						colorInputBackground: '#252a41',
						colorInputText: '#fff',
					},
				}}
			>
				<body className={`${inter.className} bg-dark-2`}>
					{children}
					<Toaster />
				</body>
			</ClerkProvider>
		</html>
	);
}
