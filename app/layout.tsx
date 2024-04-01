import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Browser",
  description: "Browse images using the Unsplash API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="container mx-auto px-10 my-10">
                    <Navigation />
                    <div>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
