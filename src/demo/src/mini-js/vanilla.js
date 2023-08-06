const createStoreImpl = (createState) => {
  let state
  const listeners = new Set()

  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial

    if (!Object.is(nextState, state)) {
      const previousState = state
      // https://docs.pmnd.rs/zustand/guides/immutable-state-and-merging#replace-flag
      // However, as this is a common pattern, set actually merges state, and we can skip the ...state part:
      state =
        replace ?? typeof nextState !== 'object'
          ? nextState
          : Object.assign({}, state, nextState)
      listeners.forEach((listener) => listener(state, previousState))
    }
  }

  const getState = () => state

  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const destroy = () => listeners.clear()

  const api = { setState, getState, subscribe, destroy }

  state = createState(setState, getState, api)

  return api
}
const createStore = (createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl

export { createStore }
