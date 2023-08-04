import React, { useSyncExternalStore } from 'react'
import { createStore } from '../mini/vanilla.ts'

const vStore = createStore<{
  count: number
  increase: () => void
}>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}))

function SyncExternalStore() {
  const v = useSyncExternalStore(vStore.subscribe, vStore.getState)
  return (
    <div>
      SyncExternalStore
      <button
        onClick={() => {
          v.increase()
        }}>
        increase
      </button>
      {v.count}
    </div>
  )
}

export default SyncExternalStore
