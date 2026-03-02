import { createRootRoute, Outlet, Link,  useNavigate } from "@tanstack/react-router";
import { userAuthState } from '../storing/store'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"



export const rootRoute = createRootRoute({
    component: () => {
        const { getUserData, logout } = userAuthState();
        const navigate = useNavigate();
        const handleLogout = () => {
            logout();
            navigate({ to: '/login' })
        }

        return(
        <>
            <header className="border-b p-4 flex justify-between items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="font-bold">My-react-App 🚀</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Logica Condizionale */}
          {getUserData()?.username && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Ciao, <strong>{getUserData()?.username}</strong>
              </span>
              <button 
                onClick={() => handleLogout()} 
                className="text-destructive hover:underline text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </>
        )

    },
})