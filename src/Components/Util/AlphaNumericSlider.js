import React from 'react'
import PropTypes from 'prop-types'
// import { useGesture } from 'react-use-gesture'
// import { useSpring, animated } from 'react-spring'

const AlphaNumericSlider = ({ list, onClick }) => {
  // const [{ local }, set] = useSpring(() => ({ local: [0, 0] }))
  // const bind = useGesture({ onDrag: ({ local }) => set({ local }) })

  return (
    <div className="alphanum-list">
      {list.map(letter => (
        <div key={letter} onClick={() => onClick(letter)}>
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
