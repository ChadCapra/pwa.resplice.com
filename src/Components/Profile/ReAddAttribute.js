import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ReAddAttributeForm from './ReAddAttributeForm'
import TypeCardList from './TypeCardList'

import cardStyles from '../Card/Card.module.scss'

const ReAddAttribute = ({ groupUuid, onAttributeAdd, types }) => {
  const [attrType, setAttrType] = useState(null)
  const [attrTouched, setAttrTouched] = useState(false)

  useEffect(() => {
    if (!attrType && attrTouched) {
      const topPos = 50
      const cards = [...document.querySelectorAll(`.${cardStyles.TypeCard}`)]
      // If an attribute type is not selected,
      // For each card calculate the position from default pos
      // And add the expand animation
      cards.forEach(card => {
        const posFromTop = topPos - card.getBoundingClientRect().y
        card.style.setProperty('--pixels-from-pos', `${posFromTop}px`)
        card.classList.add(cardStyles.ExpandCard)

        // Remove expand animation after animation has finished
        setTimeout(() => {
          card.classList.remove(cardStyles.ExpandCard)
        }, 500)
      })
    }
  }, [attrType, attrTouched])

  const handleTypeChange = (newAttrType, cardIdx) => {
    const topPos = 50
    // Get array of card elements
    const cards = [...document.querySelectorAll(`.${cardStyles.TypeCard}`)]

    if (!attrType) {
      // For each card calcuate the position from the top
      // And add the collapse animation
      cards.forEach((card, idx) => {
        const posFromTop = topPos - card.getBoundingClientRect().y
        card.style.setProperty('--pixels-from-top', `${posFromTop}px`)
        card.classList.add(cardStyles.CollapseCard)
        if (idx === cardIdx) {
          card.classList.add(cardStyles.TopCard)
        }
      })
      // Set the attribute after animation has finished
      setTimeout(() => {
        setAttrType(newAttrType)
        setAttrTouched(true)
      }, 500)
    } else {
      // Reset the attribute type
      setAttrType(null)
    }
  }

  return (
    <div className="add-attribute">
      {attrType ? (
        <ReAddAttributeForm
          groupUuid={groupUuid}
          onCardClick={handleTypeChange}
          attrType={attrType}
          onAttributeAdd={onAttributeAdd}
        />
      ) : (
        <div className="add-attribute-body">
          <TypeCardList
            list={Object.values(types)}
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

const mapStateToProps = state => {
  return {
    types: state.userState.types
  }
}

export default connect(mapStateToProps)(ReAddAttribute)
