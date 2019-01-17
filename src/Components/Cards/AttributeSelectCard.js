import React, { Component } from 'react'
import { connect } from 'react-redux'
import Columns from 'react-bulma-components/lib/components/columns'

import RenderIcon from '../Util/RenderIcon'

import './card.scss'

class AttributeSelectCard extends Component {
  combineAttrValues = values => {
    return Object.values(values).reduce((accum, value) => {
      return accum.concat(' ', value)
    }, '')
  }

  renderAttributes = () => {
    const { attrs } = this.props
    return attrs.map((attr, idx) => {
      const attrType = this.props.types.find(
        el => el.id === attr.attributeTypeId
      )
      return (
        <div key={attr.id}>
          <Columns className="card-attribute" breakpoint="mobile">
            <Columns.Column className="card-icon" size={1}>
              <RenderIcon
                icon={attrType.actions[0].icon}
                color="#C4C4C4"
                fontSize="2.5rem"
              />
            </Columns.Column>
            <Columns.Column className="card-attribute-text">
              <span className="card-attribute-text-name">{attr.name}</span>
              <span>{this.combineAttrValues(attr.values)}</span>
            </Columns.Column>
            <Columns.Column size={2} className="card-attribute-icon">
              CB
            </Columns.Column>
          </Columns>
        </div>
      )
    })
  }

  render() {
    const { header } = this.props
    return (
      <div className="card">
        <div className="card-header">{header}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { types: state.attributes.types }
}

export default connect(mapStateToProps)(AttributeSelectCard)
