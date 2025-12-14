import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { ChangeThemeButton } from "@/features/theme";

export function HeaderWidget() {
    return (
        <Navbar
            isBordered
            className="bg-background/40"
            maxWidth="xl"
        >
            <NavbarBrand>
                <Link href="/" color="foreground" className="font-bold text-xl">
                    ЦФР
                </Link>
            </NavbarBrand>
            {/*<NavbarContent className="hidden sm:flex gap-4" justify="center">*/}
            {/*    <NavbarItem>*/}
            {/*        <Link color="foreground" href="/">*/}
            {/*            Главная*/}
            {/*        </Link>*/}
            {/*    </NavbarItem>*/}
            {/*    <NavbarItem>*/}
            {/*        <Link color="foreground" href="/47">*/}
            {/*            47_UGTP_BEGIN_OPT*/}
            {/*        </Link>*/}
            {/*    </NavbarItem>*/}
            {/*</NavbarContent>*/}

            <NavbarContent justify="end">
                <NavbarItem>
                    <ChangeThemeButton />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
