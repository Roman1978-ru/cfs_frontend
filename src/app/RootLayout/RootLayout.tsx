import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { HeaderWidget } from "@/widgets/header";

export function RootLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    return (
        <HeroUIProvider locale="ru-RU" navigate={navigate} useHref={useHref}>
            <div id="background-root"></div>
            <main
                className="min-h-screen"
            >
                <HeaderWidget />
                {children}
            </main>
        </HeroUIProvider>
    )
}
