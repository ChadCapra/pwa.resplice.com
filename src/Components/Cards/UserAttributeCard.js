import React, { Component } from 'react'
import { connect } from 'react-redux'
import Columns from 'react-bulma-components/lib/components/columns'

import MdVerif from 'react-ionicons/lib/MdDoneAll'

import ReInputCard from '../Input/ReInputCard'
import ReButton from '../Buttons/ReButton'
import ReDropdown from '../Util/ReDropdown'
import RenderIcon from '../Util/RenderIcon'

import './card.scss'

class UserAttributeCard extends Component {
  // TODO: separate this component out for reuse in the future
  state = {
    showDropDownIdx: -1
  }

  combineAttrValues = values => {
    return Object.values(values).reduce((accum, value) => {
      return accum.concat(' ', value)
    }, '')
  }

  copyToClipboard = details => {
    this.combineAttrValues(details)
  }

  renderAttributes = () => {
    const { attrs } = this.props
    return attrs.map((attr, idx) => {
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
              <RenderIcon
                icon={attrType.actions[0].action_icon}
                color="#C4C4C4"
                fontSize="2.5rem"
              />
            </Columns.Column>
            <Columns.Column
              className="card-attribute-text"
              onClick={() => this.setState({ showDropDownIdx: idx })}
            >
              <span className="card-attribute-text-name">{attr.name}</span>
              <span>{this.combineAttrValues(attr.details)}</span>
              {idx === this.state.showDropDownIdx && (
                <ReDropdown
                  items={[]}
                  userAttribute
                  copy={this.copyToClipboard(attr.details)}
                  close={() => this.setState({ showDropDownIdx: -1 })}
                />
              )}
            </Columns.Column>
            <Columns.Column size={2} className="card-attribute-icon">
              {attr.is_verified && <MdVerif color="#1BBC9B" fontSize="2rem" />}
              {!attr.is_verified && (
                <ReButton text="Resend" type="small" width="70px" />
              )}
            </Columns.Column>
          </Columns>
          {!attr.is_verified && (
            <Columns breakpoint="mobile">
              <Columns.Column size={1} />
              <Columns.Column className="card-input">
                <ReInputCard placeholder="Enter Verify Code" />
              </Columns.Column>
              <Columns.Column size={2} />
            </Columns>
          )}
        </div>
      )
    })
  }

  render() {
    const { header } = this.props
    return (
      <div className="card">
        <div className="card-header">{header}</div>
        {this.props.types.length > 0 && this.renderAttributes()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { types: state.attributes.types }
}

export default connect(mapStateToProps)(UserAttributeCard)
