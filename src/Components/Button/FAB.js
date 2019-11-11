import React from 'react'

import MdCreate from 'react-ionicons/lib/MdCreate'
import MdAdd from 'react-ionicons/lib/MdAdd'
import MdRemove from 'react-ionicons/lib/MdRemove'
import FlexBox from '../Layout/FlexBox'

import styles from './Button.module.scss'

const FAB = ({
  children,
  type,
  text,
  background = '#1bbc9b',
  color = 'white',
  onClick
}) => {
  const renderIcon = () => {
    if (children) {
      return children
    }

    switch (type) {
      case 'edit':
        return <MdCreate color={color} fontSize="2.5em" />
      case 'add':
        return <MdAdd color={color} fontSize="2.5em" />
      case 'remove':
        return <MdRemove color={color} fontSize="2.5em" />
      default:
        throw new Error('This type is not supported')
    }
  }

  return (
    <FlexBox justify="end" align="center">
      {text && <span>{text}</span>}
      <div
        className={styles.FAB}
        style={{ backgroundColor: background }}
        onClick={onClick}
      >
        {renderIcon()}
      </div>
    </FlexBox>
  )
}

export default FAB
