import React from 'react'
import PhoneInput from 'react-phone-input-2'

import Input from './Input'

import 'react-phone-input-2/dist/style.css'

type Props = {
  defaultCountry?: string
  name: string
  type?: string
  value: string
  label: string
  meta: {
    pristine?: boolean
    touched?: boolean
    error?: boolean
    warning?: boolean
  }
  autoFocus?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputPhone = ({ defaultCountry = 'us', ...props }: Props) => {
  return (
    <Input
      {...props}
      component={
        <PhoneInput
          defaultCountry={defaultCountry}
          inputExtraProps={{
            name: props.name,
            autoFocus: props.autoFocus
          }}
        />
      }
      autoFocus
    />
  )
}

export default InputPhone
