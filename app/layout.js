import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WelcomePage from '@/components/WelcomePage';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata = {
    title: 'Sportech Sports Academy | World-Class Athletic Training',
    description: 'Developing world-class athletes across 11 sports for ages 4–21. Expert coaching, flexible programs, and a community built for excellence.',
    icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProvider>
                    <WelcomePage />
                    <CustomCursor />
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
