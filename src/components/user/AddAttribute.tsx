import React, { useState } from 'react'
import { AttributeType } from '../../store/store'

import AddAttributeForm from './AddAttributeForm'
import AttributeTypeSelect from '../shared/attribute/AttributeTypeSelect'

const AddAttribute = () => {
  const [attributeType, setAttributeType] = useState<AttributeType | null>(null)

  return attributeType ? (
    <AddAttributeForm
      attributeType={attributeType}
      onBack={() => setAttributeType(null)}
    />
  ) : (
    <AttributeTypeSelect onSelect={type => setAttributeType(type)} />
  )
}

export default AddAttribute
