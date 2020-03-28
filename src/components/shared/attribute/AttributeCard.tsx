import React from 'react'
import styled from 'styled-components'

import Card from '../card/Card'

type Props = {
  collectionName: string
  children: React.ReactNode
}

const CardHeading = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
  color: var(--brand-primary);
`

const AttributeCard = ({ collectionName, children }: Props) => {
  return (
    <Card.Layout>
      <Card.Header>
        <CardHeading>{collectionName}</CardHeading>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card.Layout>
  )
}

export default AttributeCard
