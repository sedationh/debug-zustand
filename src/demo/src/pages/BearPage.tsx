import React, { memo } from 'react'
import useBearStore from '../store/useBear.ts'

export default function BearsPage() {
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
