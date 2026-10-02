import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart-context";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: {
    default: "Blessenzo Holdings | ICT Equipment & Services",
    template: "%s | Blessenzo Holdings",
  },
  description:
    "Blessenzo Holdings supplies genuine ICT hardware, software and support. Laptops, servers, networking, power solutions and more. Authorised via Tarsus, Pinnacle, Axiz, Mustek and leading OEMs. B-BBEE Level 1.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
                <ChatBot />
        </body>
    </html>
  );
}
