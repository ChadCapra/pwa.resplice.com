import React, { Component } from 'react'
import { connect } from 'react-redux'
import Columns from 'react-bulma-components/lib/components/columns'

import ReVerifyAttribute from '../Profile/ReVerifyAttribute'
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
    showVerifyModal: false,
    currentAttr: null
  }

  handleDropdownAction = (action, currentAttr) => {
    switch (action) {
      case 'copy':
        this.copyToClipboard(currentAttr.value)
        console.log(this.state.showDropDownIdx)
        this.setState({ showDropDownIdx: -1 })
        break
      case 'edit':
        this.setState({ currentAttr, showDropDownIdx: -1, showEditModal: true })
        break
      case 'verify':
        this.setState({
          currentAttr,
          showDropDownIdx: -1,
          showVerifyModal: true
        })
        break
      default:
    }
  }

  combineAttrValues = attr => {
    return Object.values(attr).reduce((accum, value) => {
      if (!value) return accum
      return accum.concat(' ', value)
    }, '')
  }

  copyToClipboard = value => {
    const text = this.combineAttrValues(value)
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
    const { attrs, types } = this.props
    return attrs.map((attr, idx) => {
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
                name={attrType.actions[0].icon}
                fill="#C4C4C4"
                width="2.5em"
              />
            </Columns.Column>
            <Columns.Column
              className="card-attribute-text"
              size={7}
              onClick={() => this.setState({ showDropDownIdx: idx })}
            >
              <span className="card-attribute-text-name">{attr.name}</span>
              <span>{this.combineAttrValues(attr.value)}</span>
              {idx === this.state.showDropDownIdx && (
                <ReDropdown
                  isUserAttribute
                  items={[]}
                  onClick={action => this.handleDropdownAction(action, attr)}
                  close={() => this.setState({ showDropDownIdx: -1 })}
                />
              )}
            </Columns.Column>
            <Columns.Column size={1} className="card-attribute-icon" />
          </Columns>
        </div>
      )
    })
  }

  renderEditModal = () => (
    <ReModal
      onClose={() => this.setState({ showEditModal: false })}
      show={this.state.showEditModal}
      headerText="Edit Attribute"
    >
      <ReEditAttribute
        attribute={this.state.currentAttr}
        collection={this.state.currentAttr.collection}
        onEdit={() => this.setState({ showEditModal: false })}
      />
    </ReModal>
  )

  renderVerifyModal = () => (
    <ReModal
      onClose={() => this.setState({ showVerifyModal: false })}
      show={this.state.showVerifyModal}
      headerText="Verify Attribute"
    >
      <ReVerifyAttribute
        attribute={this.state.currentAttr}
        onVerify={() => this.setState({ showVerifyModal: false })}
      />
    </ReModal>
  )

  render() {
    const { header } = this.props
    return (
      <div className="card">
        {this.state.showEditModal && this.renderEditModal()}
        {this.state.showVerifyModal && this.renderVerifyModal()}
        <div className="card-header">{header}</div>
        {this.props.types.length > 0 && this.renderAttributes()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { types: state.attributeState.types }
}

export default connect(mapStateToProps)(UserAttributeCard)
