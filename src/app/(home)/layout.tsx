import NavBar from "@/components/Home/NavBar";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="flex-grow">
                <NavBar />
                {children}
            </div>

        </div>
    );
}