import React from 'react'

import { CountryDropdown } from 'react-country-region-selector'
import Input from './Input'

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

const InputCountry = ({ defaultCountry = 'us', ...props }: Props) => {
  return <Input {...props} component={<CountryDropdown />} />
}

export default InputCountry
