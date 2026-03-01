import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from './route'

export const defaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({
      to: '/login',
    })
  },
})