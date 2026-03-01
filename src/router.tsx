import { createRouter } from "@tanstack/react-router";
import {rootRoute} from './route'
import {loginRoute} from './login'
import {homeRoute} from './home'
import {defaultRoute} from './default'

// 1. Creiamo l'albero delle rotte
const routeTree = rootRoute.addChildren([
  defaultRoute,
  loginRoute,
  homeRoute,
])

// 2. Creiamo l'istanza del router
export const router = createRouter({ routeTree })

// 3. Registriamo il router per il supporto a TypeScript (fondamentale per l'autocompletamento)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}