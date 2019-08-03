import React, { memo } from 'react'
import PropTypes from 'prop-types'

import MdExit from 'react-ionicons/lib/MdExit'
import MdHome from 'react-ionicons/lib/MdHome'

import styles from './Header.module.css'

const Header = memo(({ children, icon }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'exit':
        return <MdExit fontSize="2em" color={styles.Brand} />
      case 'home':
        return <MdHome fontSize="2em" color={styles.Brand} />
      default:
        throw new Error('Icon prop must be `exit` or `home`')
    }
  }

  return (
    <div className={styles.Header}>
      {children}
      {renderIcon()}
    </div>
  )
})

Header.propTypes = {
  icon: PropTypes.oneOf(['exit', 'home'])
}

export default Header
