import React from 'react'
import PhoneInput from 'react-phone-input-2'

import Input from './Input'

import 'react-phone-input-2/lib/high-res.css'

type Props = {
  defaultCountry?: string
  name: string
  type?: string
  value: string
  label: string
  meta: {
    pristine?: boolean
    touched?: boolean
    error?: string
    warning?: boolean
  }
  autoFocus?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputPhone = ({ defaultCountry = 'us', ...props }: Props) => {
  return (
    <Input
      type="phone"
      {...props}
      component={
        <PhoneInput
          country={defaultCountry}
          inputProps={{
            name: props.name,
            autoFocus: props.autoFocus
          }}
          enableSearch
          disableSearchIcon
          autoFormat
        />
      }
      autoFocus
    />
  )
}

export default InputPhone
