import React, { Component } from 'react'
import { connect } from 'react-redux'
import Columns from 'react-bulma-components/lib/components/columns'

import MdVerif from 'react-ionicons/lib/MdDoneAll'

import ReInputCard from '../Input/ReInputCard'
import ReButton from '../Buttons/ReButton'
import ReDropdown from '../Util/ReDropdown'
import ActionIcon from '../Util/ActionIcon'
import ReModal from '../Modals/ReModal'
import ReEditAttribute from '../Profile/ReEditAttribute'

import './card.scss'

class UserAttributeCard extends Component {
  // TODO: separate this component out for reuse in the future
  state = {
    showDropDownIdx: -1,
    showEditModal: false,
    currentAttr: null
  }

  combineAttrValues = values => {
    return Object.values(values).reduce((accum, value) => {
      return accum.concat(' ', value)
    }, '')
  }

  copyToClipboard = details => {
    const text = this.combineAttrValues(details)
    let el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style = { display: 'hidden', position: 'absolute', left: '-9999px' }
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
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
              <ActionIcon
                name={attrType.actions[0].action_icon}
                fill="#C4C4C4"
                width="2.5em"
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
                  copy={() => this.copyToClipboard(attr.details)}
                  edit={() =>
                    this.setState({ currentAttr: attr, showEditModal: true })
                  }
                  close={() => this.setState({ showDropDownIdx: -1 })}
                />
              )}
            </Columns.Column>
            <Columns.Column size={2} className="card-attribute-icon">
              {attr.verified_at && <MdVerif color="#1BBC9B" fontSize="2rem" />}
              {!attr.verified_at && (
                <ReButton text="Resend" type="small" width="70px" />
              )}
            </Columns.Column>
          </Columns>
          {!attr.verified_at && (
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

  renderEditModal = () => {
    return (
      <ReModal
        close={() => this.setState({ showEditModal: false })}
        show={this.state.showEditModal}
        modal={{ closeOnBlur: true, showClose: true }}
      >
        <ReEditAttribute
          attribute={this.state.currentAttr}
          collection={this.state.currentAttr.collection}
          onEdit={() => this.setState({ showEditModal: false })}
        />
      </ReModal>
    )
  }

  render() {
    const { header } = this.props
    return (
      <div className="card">
        {this.state.showEditModal && this.renderEditModal()}
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
