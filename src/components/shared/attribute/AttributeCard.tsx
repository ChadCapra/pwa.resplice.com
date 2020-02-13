import React from 'react'
import styled from 'styled-components'

import Card from '../card/Card'

type Props = {
  collection: string
  children: React.ReactNode
}

const CardHeading = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
  color: var(--brand-primary);
`

const AttributeCard = ({ collection, children }: Props) => {
  return (
    <Card.Layout>
      <Card.Header>
        <CardHeading>{collection}</CardHeading>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card.Layout>
  )
}

export default AttributeCard
