import React, { memo } from 'react'
// import { create } from '../mini/react.ts'
import { create } from '../mini-js/react.js'

const useBearStore = create((set) => ({
  bears: 0,
  count: 100,
  increase: (by = 1) => set((state) => ({ bears: state.bears + by })),
  decrease: (by = 1) =>
    set((state) => {
      const bears = state.bears - by
      return {
        bears,
      }
    }),
  reset: () => set({ bears: 0 }),

  increaseCount: () => set((state) => ({ count: state.count + 1 })),
}))

export default function MiniBearsPage() {
  const bearsStore = useBearStore()
  const { bears, count, increase, decrease, reset, increaseCount } = bearsStore
  return (
    <div>
      <h3>BearsPage</h3>

      <button onClick={() => increase()}>increase {bears}</button>
      <button onClick={() => decrease()}>decrease {bears}</button>
      <button onClick={() => reset()}>reset</button>

      <button onClick={() => increaseCount()}>count: {count}</button>

      <Child />
    </div>
  )
}

const Child = memo(() => {
  console.log('sedationh Child render')
  const bears = useBearStore((state) => state.bears)

  return (
    <div>
      <h3>Child</h3>
      <p>{bears}</p>
    </div>
  )
})
