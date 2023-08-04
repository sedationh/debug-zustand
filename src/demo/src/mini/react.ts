import { useSyncExternalStore } from 'react'
import { StateCreator, StoreApi, createStore } from './vanilla.ts'

type Create = {
  <T>(createState: StateCreator<T>): () => T
  <T>(): (createState: StateCreator<T>) => () => T
}

export const create = (<T>(createState: StateCreator<T> | undefined) => {
  console.log('sedationh create')
  return createState ? createImpl(createState) : createImpl
}) as Create

export const createImpl = <T>(createState: StateCreator<T>) => {
  const api = createStore(createState)
  return () => useStore(api)
}

export function useStore<TState>(api: StoreApi<TState>) {
  const slice = useSyncExternalStore(api.subscribe, api.getState)
  return slice
}
