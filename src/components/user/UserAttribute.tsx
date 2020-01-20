import React from 'react'
import { IEntityAttributeWithType } from '../../store/store'

import Attribute from '../shared/attribute/Attribute'

type Props = {
  attribute: IEntityAttributeWithType
}

const UserAttribute = ({ attribute }: Props) => {
  return <Attribute attribute={attribute} />
}

export default UserAttribute
