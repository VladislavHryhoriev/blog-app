import Header from '@/components/Header';
import '@/styles/globals.scss';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
	title: 'Modern Blog',
	description: 'New Modern Blog',
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
