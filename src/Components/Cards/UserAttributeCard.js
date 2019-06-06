import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

  handleAction = (action, currentAttr) => {
    switch (action) {
      case 'call':
        window.open(`tel:${currentAttr.value.phone}`)
        break
      case 'sms':
        window.open(`sms:${currentAttr.value.phone}`)
        break
      case 'email':
        window.open(`mailto:${currentAttr.value.email}`)
        break
      case 'map':
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${this.combineAttrValues(
            currentAttr.value,
            '+'
          )}`
        )
        break
      case 'nav':
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${this.combineAttrValues(
            currentAttr.value,
            '+'
          )}&dir_action=navigate`
        )
        break
      case 'navigate':
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${this.combineAttrValues(
            currentAttr.value,
            ','
          )}&dir_action=navigate`
        )
        break
      case 'locate':
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${this.combineAttrValues(
            currentAttr.value,
            ','
          )}`
        )
        break
      case 'link':
        window.open(currentAttr.value.url)
        break
      case 'calendar':
        this.copyToClipboard(currentAttr.value)
        break
      case 'copy':
        this.copyToClipboard(currentAttr.value)
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

  combineAttrValues = (attr, delim) => {
    return Object.values(attr).reduce((accum, value, idx) => {
      if (!value) return accum
      if (idx < 1) return value
      return accum.concat(delim, value)
    }, '')
  }

  copyToClipboard = value => {
    const text = this.combineAttrValues(value, ' ')
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
    const { item, types } = this.props
    const attrs = item[1]
    return attrs.map((attr, idx) => {
      const attrType = types.find(el => el.id === attr.attribute_type_id)
      const actions = attrType.actions.filter(
        action => !action.unverified_only || !attr.verified_at
      )
      return (
        <React.Fragment key={attr.uuid}>
          <Columns
            className="card-attribute"
            breakpoint="mobile"
            multiline={false}
          >
            <Columns.Column
              size={1}
              onClick={() => this.handleAction(actions[0].name, attr)}
            >
              <ActionIcon name={actions[0].icon} fill="#C4C4C4" width="2.5em" />
            </Columns.Column>
            <Columns.Column
              className="card-attribute-text"
              size={7}
              onClick={() => this.setState({ showDropDownIdx: idx })}
            >
              <span className="card-attribute-text-name">{attr.name}</span>
              <span>{this.combineAttrValues(attr.value, ' ')}</span>
              {idx === this.state.showDropDownIdx && (
                <ReDropdown
                  isUserAttribute
                  items={actions}
                  onClick={action => this.handleAction(action, attr)}
                  close={() => this.setState({ showDropDownIdx: -1 })}
                />
              )}
            </Columns.Column>
            <Columns.Column
              size={1}
              onClick={() => this.handleAction(actions[1].name, attr)}
            >
              <ActionIcon name={actions[1].icon} fill="#C4C4C4" width="2.5em" />
            </Columns.Column>
          </Columns>
        </React.Fragment>
      )
    })
  }

  renderEditModal = () => (
    <ReModal
      onClose={() => this.setState({ showEditModal: false })}
      show={this.state.showEditModal}
      full
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
      full
    >
      <ReVerifyAttribute
        attribute={this.state.currentAttr}
        onVerify={() => this.setState({ showVerifyModal: false })}
      />
    </ReModal>
  )

  render() {
    return (
      <div className="card">
        {this.state.showEditModal && this.renderEditModal()}
        {this.state.showVerifyModal && this.renderVerifyModal()}
        <div className="card-header">{this.props.item[0]}</div>
        {this.props.types.length > 0 && this.renderAttributes()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { types: state.attributeState.types }
}

UserAttributeCard.propTypes = {
  item: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(UserAttributeCard)
