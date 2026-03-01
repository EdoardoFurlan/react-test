import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
    component: () => (
        <>
            {/*TODO NAVBAR*/}
            <hr/>
            <Outlet></Outlet>
        </>
    ),
})