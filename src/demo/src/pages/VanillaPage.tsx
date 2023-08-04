import { useEffect, useState } from 'react'
import { createStore } from '../mini/vanilla.ts'

const vStore = createStore<{
  count: number
  increase: () => void
}>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}))

function VanillaPage() {
  const [v, setV] = useState(() => vStore.getState())
  useEffect(() => {
    return vStore.subscribe((state) => {
      setV(state)
    })
  }, [])

  return (
    <div>
      VanillaPage
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

export default VanillaPage
