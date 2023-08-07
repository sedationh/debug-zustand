import { produce } from 'immer'

const immer = (initializer) => (set, get, store) => {
  store.setState = (updater, replace, ...a) => {
    const nextState = typeof updater === 'function' ? produce(updater) : updater
    return set(nextState, replace, ...a)
  }
  return initializer(store.setState, get, store)
}

export { immer }
