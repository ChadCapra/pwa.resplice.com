import React from 'react'

import { RegionDropdown } from 'react-country-region-selector'
import Input from './Input'

type Props = {
  country: string
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

const InputCountry = ({ country, ...props }: Props) => {
  return <Input {...props} component={<RegionDropdown country={country} />} />
}

export default InputCountry
