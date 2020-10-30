import React from 'react'
import { IUserAttribute, AttributeType } from '../../store/store'

import AttributeForm from './AttributeForm'

type Props = {
  attribute: any
}

const EditAttribute = ({ attribute }: Props) => {
  return (
    <div>
      Attribute Preview Card
      {/* <AttributeForm attribute={attribute} /> */}
    </div>
  )
}

export default EditAttribute
