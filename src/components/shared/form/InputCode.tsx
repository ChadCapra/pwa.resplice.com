import React, { useState, useRef } from 'react'
import cx from 'classnames'

import styles from './Form.module.scss'
import Flex from '../layout/Flex'

type Props = {
  length: number
  label: string
  loading: boolean
  onComplete: (code: string) => void
}

const InputCode = ({ length, label, loading, onComplete }: Props) => {
  const [code, setCode] = useState([...Array(length)].map(() => ''))
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const processInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const num = e.target.value
    if (/[^0-9]/.test(num)) return
    const newCode = [...code]
    newCode[slot] = num
    setCode(newCode)
    if (slot !== length - 1) {
      inputs.current[slot + 1]!.focus()
    }
    if (newCode.every((num) => num !== '')) {
      onComplete(newCode.join(''))
    }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code]
      newCode[slot - 1] = ''
      setCode(newCode)
      inputs.current[slot - 1]!.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const [cOne, cTwo, cThree, cFour, cFive, cSix] = e.clipboardData
      .getData('text')
      .toUpperCase()
      .split('')
    const pastedCode = [cOne, cTwo, cThree, cFour, cFive, cSix]
    setCode(pastedCode)
    inputs.current[5]!.focus()
    onComplete(pastedCode.join(''))
  }

  const InputStyle = cx(styles.CodeInput, {
    [styles.Loading]: loading
  })

  return (
    <Flex direction="column" align="start">
      <label className={styles.CodeLabel}>{label}</label>
      <Flex justify="start" align="center">
        {code.map((num, idx) => {
          return (
            <input
              key={idx}
              className={InputStyle}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={(e) => processInput(e, idx)}
              onKeyUp={(e) => onKeyUp(e, idx)}
              onPaste={(e) => handlePaste(e)}
              ref={(ref) => inputs.current.push(ref)}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default InputCode
