import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ReAddAttributeForm from './ReAddAttributeForm'
import CardList from '../Card/CardList'
import TypeCard from '../Card/TypeCard'

const ReAddAttribute = ({ groupUuid, onAttributeAdd, types }) => {
  const [attrType, setAttrType] = useState({})
  const [attrTouched, setAttrTouched] = useState(false)

  useEffect(() => {
    if (!Object.keys(attrType).length && attrTouched) {
      const topPos = 50
      const cards = [...document.querySelectorAll('.type-card')]
      // If an attribute type is not selected,
      // For each card calculate the position from default pos
      // And add the expand animation
      cards.forEach(card => {
        const posFromTop = topPos - card.getBoundingClientRect().y
        card.style.setProperty('--pixels-from-pos', `${posFromTop}px`)
        card.classList.add('expand-card')

        // Remove expand animation after animation has finished
        setTimeout(() => {
          card.classList.remove('expand-card')
        }, 500)
      })
    }
  }, [attrType, attrTouched])

  const handleTypeChange = (newAttrType, cardIdx) => {
    const topPos = 50
    // Get array of card elements
    const cards = [...document.querySelectorAll('.type-card')]

    if (!Object.keys(attrType).length) {
      // For each card calcuate the position from the top
      // And add the collapse animation
      cards.forEach((card, idx) => {
        const posFromTop = topPos - card.getBoundingClientRect().y
        card.style.setProperty('--pixels-from-top', `${posFromTop}px`)
        card.classList.add('collapse-card')
        if (idx === cardIdx) {
          card.classList.add('top-card')
        }
      })
      // Set the attribute after animation has finished
      setTimeout(() => {
        setAttrType(newAttrType)
        setAttrTouched(true)
      }, 500)
    } else {
      // Reset the attribute type
      setAttrType({})
    }
  }

  return (
    <div className="add-attribute">
      {Object.keys(attrType).length ? (
        <ReAddAttributeForm
          groupUuid={groupUuid}
          onCardClick={handleTypeChange}
          attrType={attrType}
          onAttributeAdd={onAttributeAdd}
        />
      ) : (
        <div className="add-attribute-body">
          <CardList
            list={Object.values(types)}
            Card={TypeCard}
            onClick={handleTypeChange}
          />
        </div>
      )}
    </div>
  )
}

ReAddAttribute.propTypes = {
  groupUuid: PropTypes.string,
  onAttributeAdd: PropTypes.func.isRequired,
  types: PropTypes.object.isRequired
}

export default ReAddAttribute
