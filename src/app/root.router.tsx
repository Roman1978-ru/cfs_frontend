import { createBrowserRouter, Outlet } from "react-router-dom";
import { reactLazyImport } from "@/shared/react";
import { RootLayout } from "./RootLayout";

const { HomePage } = reactLazyImport(() => import('@/pages/home'));
const { Report47Page } = reactLazyImport(() => import('@/pages/Report47'));

export const rootRouter = createBrowserRouter([{
    path: "/",
    element: <RootLayout><Outlet/></RootLayout>,
    children: [
        {
            index: true,
            element: <HomePage/>,
        },
        {
            path: "47",
            element:  <Report47Page />,
        },
    ],
}]);
