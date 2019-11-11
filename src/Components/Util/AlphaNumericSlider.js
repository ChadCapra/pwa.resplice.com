import React from 'react'
import PropTypes from 'prop-types'
// import { useGesture } from 'react-use-gesture'
// import { useSpring, animated } from 'react-spring'

const buildLetterList = list => {
  return list.reduce((map, item, idx) => {
    const letter = /[0-9]/.test(item.name[0]) ? '#' : item.name[0].toUpperCase()
    if (!map[letter]) map[letter] = idx
    return map
  }, {})
}

const AlphaNumericSlider = ({ list, onClick }) => {
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

AlphaNumericSlider.propTypes = {
  list: PropTypes.array.isRequired,
  onClick: PropTypes.func
}

export default AlphaNumericSlider
