import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { themeStore } from "@/features/theme";


export function ChangeThemeButton() {
    const dispatch = useDispatch();
    const isDark = useSelector(themeStore.selectors.isDark);

    return (
        <Button
            isIconOnly
            variant="light"
            onPress={() => dispatch(themeStore.actions.toggleTheme())}
            size="lg"
        >
            {isDark ? '🌙' : '☀️'}
        </Button>
    );
}
