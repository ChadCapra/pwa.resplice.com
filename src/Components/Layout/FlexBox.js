import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import styles from './FlexBox.module.scss'

const FlexBox = React.forwardRef(
  ({ children, className, fill, direction, justify, align, ...props }, ref) => {
    const FlexStyle = cx(styles.FlexBox, {
      [className]: className,
      [styles.Fill]: fill,
      [styles.DirectionColumn]: direction === 'column',
      [styles.DirectionRow]: direction === 'row',
      [styles.JustifyCenter]: justify === 'center',
      [styles.JustifyStart]: justify === 'start',
      [styles.JustifyEnd]: justify === 'end',
      [styles.JustifyBetween]: justify === 'between',
      [styles.JustifyAround]: justify === 'around',
      [styles.JustifyEvenly]: justify === 'evenly',
      [styles.JustifyStretch]: justify === 'stretch',
      [styles.JustifyNormal]: justify === 'normal',
      [styles.AlignCenter]: align === 'center',
      [styles.AlignStart]: align === 'start',
      [styles.AlignEnd]: align === 'end',
      [styles.AlignStretch]: align === 'stretch',
      [styles.AlignNormal]: align === 'normal'
    })
    return (
      <div className={FlexStyle} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)

FlexBox.propTypes = {
  fill: PropTypes.bool,
  direction: PropTypes.oneOf(['column', 'row']),
  justify: PropTypes.oneOf([
    'center',
    'start',
    'end',
    'between',
    'around',
    'evenly',
    'stretch',
    'normal'
  ]),
  align: PropTypes.oneOf(['center', 'start', 'end', 'stretch', 'normal'])
}

export default FlexBox
