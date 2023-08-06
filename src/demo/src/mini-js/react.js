import { useDebugValue } from 'react'
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector.js'
import { createStore } from './vanilla.js'

const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports

function useStore(api, selector = api.getState, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  )
  useDebugValue(slice)
  return slice
}

const createImpl = (createState) => {
  const api = createStore(createState)

  const useBoundStore = (selector, equalityFn) =>
    useStore(api, selector, equalityFn)

  return useBoundStore
}

const create = (createState) =>
  createState ? createImpl(createState) : createImpl

export { create }
