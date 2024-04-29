import type { Metadata } from 'next';
import { Darker_Grotesque, Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { dark } from '@clerk/themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
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
				<body className={`${inter.className} bg-dark-2`}>{children}</body>
			</ClerkProvider>
		</html>
	);
}
