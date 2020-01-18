import React, { useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

type Props = {
  children: React.ReactNodeArray
}

const Swiper = ({ children }: Props) => {
  const index = useRef(0)
  const [props, set] = useSprings(children.length, (idx: number) => ({
    x: idx * window.innerWidth,
    scale: 1,
    display: 'block'
  }))
  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], distance, cancel }: any) => {
      if (down && distance > window.innerWidth / 3)
        cancel(
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            children.length - 1
          ))
        )
      set((idx: number) => {
        if (idx < index.current - 1 || idx > index.current + 1)
          return { display: 'none' }
        if (mx < 30 && mx > -30) return
        const x = (idx - index.current) * window.innerWidth + (down ? mx : 0)
        const scale = down ? 1 - distance / window.innerWidth / 2 : 1
        return { x, scale, display: 'block' }
      })
    }
  )
  return props.map(({ x, display, scale }: any, idx: number) => (
    <animated.div
      {...bind()}
      key={idx}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display,
        x
      }}
    >
      <animated.div
        style={{
          width: '100%',
          height: '100%',
          scale
        }}
      >
        {children[idx]}
      </animated.div>
    </animated.div>
  ))
}

export default Swiper
