type SetStateInternal<T> = (
  partial: T | Partial<T> | { (state: T): T | Partial<T> },
  replace?: boolean | undefined
) => void

export interface StoreApi<T> {
  setState: SetStateInternal<T>
  getState: () => T
  subscribe: (listener: (state: T, prevState: T) => void) => () => void
}

export type StateCreator<T> = (
  setState: StoreApi<T>['setState'],
  getState: StoreApi<T>['getState'],
  store: StoreApi<T>
) => T

type CreateStore = {
  <T>(createState: StateCreator<T>): StoreApi<T>
  <T>(): (createState: StateCreator<T>) => StoreApi<T>
}

type CreateStoreImpl = <T>(createImpl: StateCreator<T>) => StoreApi<T>

export const createStore = ((createState) => {
  return createState ? createStoreImpl(createState) : createStoreImpl
}) as CreateStore

export const createStoreImpl: CreateStoreImpl = (createState) => {
  type TState = ReturnType<typeof createState>
  let state: TState
  type Listener = (state: TState, prevState: TState) => void
  const listeners: Set<Listener> = new Set()

  const getState: StoreApi<TState>['getState'] = () => state

  const setState: StoreApi<TState>['setState'] = (partial, replace) => {
    const nextState =
      typeof partial === 'function'
        ? (partial as (state: TState) => TState)(state)
        : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      state =
        replace ?? typeof nextState !== 'object'
          ? (nextState as TState)
          : Object.assign({}, state, nextState)
      listeners.forEach((listener) => listener(state, previousState))
    }
  }

  const subscribe: StoreApi<TState>['subscribe'] = (listener) => {
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }

  const api = {
    setState,
    getState,
    subscribe,
  }

  state = createState(setState, getState, api)

  return api
}
