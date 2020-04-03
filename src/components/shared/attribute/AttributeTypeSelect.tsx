import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  RespliceState,
  AttributeType,
  IEntityAttributeWithType
} from '../../../store/store'

import Flex from '../layout/Flex'
import AttributeCard from './AttributeCard'
import Attribute from './Attribute'
import ActionIcon from '../util/ActionIcon'

const Container = styled(Flex)`
  box-sizing: border-box;
  max-width: ${props => props.theme['mobile-max-width']};
  overflow: auto;
  margin: auto;
  padding: 2em 0;
`

const CardContainer = styled.div`
  padding: 0 2em;
  margin: 0.5em 0;
`

type Props = {
  attributeTypes: AttributeType[] | null
  onSelect: (attributeType: AttributeType) => void
}

const AttributeTypeSelect = ({ attributeTypes, onSelect }: Props) => {
  // useEffect(() => {
  //   if (!attrType && attrTouched) {
  //     const topPos = 50
  //     const cards = [...document.querySelectorAll(`.${cardStyles.TypeCard}`)]
  //     // If an attribute type is not selected,
  //     // For each card calculate the position from default pos
  //     // And add the expand animation
  //     cards.forEach(card => {
  //       const posFromTop = topPos - card.getBoundingClientRect().y
  //       card.style.setProperty('--pixels-from-pos', `${posFromTop}px`)
  //       card.classList.add(cardStyles.ExpandCard)

  //       // Remove expand animation after animation has finished
  //       setTimeout(() => {
  //         card.classList.remove(cardStyles.ExpandCard)
  //       }, 500)
  //     })
  //   }
  // }, [attrType, attrTouched])

  // const handleTypeChange = (newAttrType, cardIdx) => {
  //   const topPos = 50
  //   // Get array of card elements
  //   const cards = [...document.querySelectorAll(`.${cardStyles.TypeCard}`)]

  //   if (!attrType) {
  //     // For each card calcuate the position from the top
  //     // And add the collapse animation
  //     cards.forEach((card, idx) => {
  //       const posFromTop = topPos - card.getBoundingClientRect().y
  //       card.style.setProperty('--pixels-from-top', `${posFromTop}px`)
  //       card.classList.add(cardStyles.CollapseCard)
  //       if (idx === cardIdx) {
  //         card.classList.add(cardStyles.TopCard)
  //       }
  //     })
  //     // Set the attribute after animation has finished
  //     setTimeout(() => {
  //       setAttrType(newAttrType)
  //       setAttrTouched(true)
  //     }, 500)
  //   } else {
  //     // Reset the attribute type
  //     setAttrType(null)
  //   }
  // }

  const getTypeValue = (value: Dictionary<string | null>) => {
    const typeValue: Dictionary<string> = {}
    Object.keys(value).forEach(val => {
      typeValue[val] = 'XXXXXXXXX'
    })
    return typeValue
  }

  return (
    <Container direction="column" fill justify="start">
      {attributeTypes &&
        attributeTypes.map(type => {
          const actions = type.actions.filter(
            action => !(action.name === 'verify')
          )
          return (
            <CardContainer key={type.name} onClick={() => onSelect(type)}>
              <AttributeCard collectionName={type.name}>
                <Attribute
                  attribute={
                    {
                      name: type.name,
                      value: getTypeValue(type.value_template)
                    } as IEntityAttributeWithType
                  }
                  leftIcon={
                    <ActionIcon
                      name={actions[0].icon}
                      width="2.5em"
                      fill="var(--brand-primary)"
                      clickable
                      onClick={() => {}}
                    />
                  }
                  rightIcon={
                    <ActionIcon
                      name={actions[1].icon}
                      width="2.5em"
                      fill="var(--brand-primary)"
                      clickable
                      onClick={() => {}}
                    />
                  }
                />
              </AttributeCard>
            </CardContainer>
          )
        })}
    </Container>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    attributeTypes: state.utilState.attributeTypes
  }
}

export default connect(mapStateToProps)(AttributeTypeSelect)
