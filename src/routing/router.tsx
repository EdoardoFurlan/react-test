import { createRouter } from "@tanstack/react-router";
import {rootRoute} from './route'
import {loginRoute} from '../pages/login'
import {homeRoute} from '../pages/home'
import {defaultRoute} from '../pages/default'
import {authLayoutRoute} from '../routing/_auth'



const authTree = authLayoutRoute.addChildren([
  defaultRoute,
  homeRoute
])


// 1. Creiamo l'albero delle rotte
const routeTree = rootRoute.addChildren([
  loginRoute,
  authTree
])

// 2. Creiamo l'istanza del router
export const router = createRouter({ routeTree })

// 3. Registriamo il router per il supporto a TypeScript (fondamentale per l'autocompletamento)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}