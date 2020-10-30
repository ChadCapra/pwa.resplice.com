import React from 'react'
// import { useGesture } from 'react-use-gesture'
// import { useSpring, animated } from 'react-spring'

const buildLetterList = (list: any) => {
  return list.reduce((map: any, item: any, idx: number) => {
    const letter = /[0-9]/.test(item.name[0]) ? '#' : item.name[0].toUpperCase()
    if (!map[letter]) map[letter] = idx
    return map
  }, {})
}

type Props = {
  list: any
  onClick: (idx: number) => void
}

const AlphaNumericSlider = ({ list, onClick }: Props) => {
  // const [{ local }, set] = useSpring(() => ({ local: [0, 0] }))
  // const bind = useGesture({ onDrag: ({ local }) => set({ local }) })
  const letterList = buildLetterList(list)

  return (
    <div className="alphanum-list">
      {Object.keys(letterList).map(letter => (
        <div key={letter} onClick={() => onClick(letterList[letter])}>
          {letter}
        </div>
      ))}
    </div>
  )
}

export default AlphaNumericSlider
