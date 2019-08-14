import React from 'react'
import PropTypes from 'prop-types'

import MdExit from 'react-ionicons/lib/MdExit'
import MdHome from 'react-ionicons/lib/MdHome'

import styles from './Header.module.scss'

const Header = React.memo(({ children, icon, onIconClick }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'exit':
        return <MdExit fontSize="2.5em" color="#1bbc9b" onClick={onIconClick} />
      case 'home':
        return <MdHome fontSize="2.5em" color="#1bbc9b" onClick={onIconClick} />
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
