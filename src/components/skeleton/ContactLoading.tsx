import React from 'react'
import styled from 'styled-components'

import Card from '../shared/card/Card'
import Flex from '../shared/layout/Flex'
import styles from './Loading.module.scss'

const Container = styled.div`
  padding: 1.5em;
`

const AvatarSkel = styled.div`
  height: 50px;
  width: 50px;
  background-color: white;
  border-radius: 25px;
`
const TextSkel = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 1.5em;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 4px;
`

const ContactLoading = () => {
  return (
    <Container>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
        <Card.Layout key={idx}>
          <Card.Body className={styles.Skeleton}>
            <Flex justify="start">
              <AvatarSkel />
              <Flex
                direction="column"
                justify="center"
                grow
                style={{ marginLeft: '1em', overflow: 'hidden' }}
              >
                <TextSkel width="75%" />
                <TextSkel width="35%" />
              </Flex>
            </Flex>
          </Card.Body>
        </Card.Layout>
      ))}
    </Container>
  )
}

export default ContactLoading
