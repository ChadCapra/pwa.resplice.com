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

  checkAttributes = uuid => {
    if (
      this.props.attribute_shares.findIndex(as => as.attribute_uuid === uuid) >=
      0
    )
      return true
    else return false
  }

  renderAttributes = () => {
    const { attrs, types } = this.props
    return attrs.map(attr => {
      const attrType = types.find(el => el.id === attr.attribute_type_id)
      return (
        <div key={attr.uuid}>
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
              <span>{this.combineAttrValues(attr.value)}</span>
            </Columns.Column>
            <Columns.Column size={2} className="card-attribute-icon">
              <ReCheckbox
                onClick={() => this.handleAttributeSelect(attr)}
                checked={this.checkAttributes(attr.uuid)}
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
    types: state.attributeState.types,
    attribute_shares: state.shareState.attribute_shares
  }
}

export default connect(
  mapStateToProps,
  { toggleAttributeToShares }
)(AttributeSelectCard)
