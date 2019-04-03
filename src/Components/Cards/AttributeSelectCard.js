import React, { Component } from 'react'
import { connect } from 'react-redux'
import Columns from 'react-bulma-components/lib/components/columns'
import { toggleAttributeToShares } from '../../actions'

import ActionIcon from '../Util/ActionIcon'
import ReCheckbox from '../Input/ReCheckbox'

import './card.scss'

class AttributeSelectCard extends Component {
  combineAttrValues = values => {
    return Object.values(values).reduce((accum, value) => {
      return accum.concat(' ', value)
    }, '')
  }

  handleAttributeSelect = attribute => {
    this.props.toggleAttributeToShares({
      attribute_id: attribute.id,
      expires_at: null
    })
  }

  checkAttributes = id => {
    if (
      this.props.attribute_shares.findIndex(as => as.attribute_id === id) >= 0
    )
      return true
    else return false
  }

  renderAttributes = () => {
    const { attrs } = this.props
    return attrs.map(attr => {
      const attrType = this.props.types.find(
        el => el.id === attr.attribute_type_id
      )
      return (
        <div key={attr.id}>
          <Columns
            className="card-attribute"
            breakpoint="mobile"
            multiline={false}
          >
            <Columns.Column className="card-icon" size={1}>
              <ActionIcon
                name={attrType.actions[0].action_icon}
                fill="#C4C4C4"
                width="2.5em"
              />
            </Columns.Column>
            <Columns.Column className="card-attribute-text">
              <span className="card-attribute-text-name">{attr.name}</span>
              <span>{this.combineAttrValues(attr.details)}</span>
            </Columns.Column>
            <Columns.Column size={2} className="card-attribute-icon">
              <ReCheckbox
                onClick={() => this.handleAttributeSelect(attr)}
                checked={this.checkAttributes(attr.id)}
              />
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
        {this.renderAttributes()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    types: state.attributes.types,
    attribute_shares: state.shares.attribute_shares
  }
}

export default connect(
  mapStateToProps,
  { toggleAttributeToShares }
)(AttributeSelectCard)
