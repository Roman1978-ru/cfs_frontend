import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { rootRouter } from "./root.router";

import './index.css';

export function App() {
    return (
        <ReduxProvider store={store}>
            <RouterProvider router={rootRouter}/>
        </ReduxProvider>
    );
}

createRoot(document.getElementById('root')!).render(
    <App/>
);

