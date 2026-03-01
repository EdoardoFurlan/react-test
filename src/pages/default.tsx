import { createRoute, redirect } from '@tanstack/react-router'
import { authLayoutRoute } from '../routing/_auth'

export const defaultRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({
      to: '/login',
    })
  },
})