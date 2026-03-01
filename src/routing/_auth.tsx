// router.tsx (o un file dedicato)
import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from './route'
import { userAuthState } from '../storing/store'

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated', // Usiamo un ID invece di un path perché è una rotta di layout
  beforeLoad: () => {
    const { username } = userAuthState.getState()
    if (!username) {
      throw redirect({ to: '/login' })
    }
  },
})