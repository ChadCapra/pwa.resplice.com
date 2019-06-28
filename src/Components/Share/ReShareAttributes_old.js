import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown'
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup'
import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import CardList from '../Card/CardList'
import AttributeSelectCard from '../Cards/AttributeSelectCard'
import ReButton from '../Button/ReButton'
import ReModal from '../Modal/ReModal'
import ReAvatar from '../Contact/ReAvatar'
import ReContact from '../Profile/ReProfileItem'
import ReInput from '../Form/ReInput'

const ShareConfirmModal = () => {
  return (
    <div className="share-confirm-modal">
      <p>Tell them how you know them or where you met them.</p>
      <ReInput
        type="text"
        label="Enter Share Message"
        meta={{ touched: false, error: false, warning: false }}
        input={{ value: '' }}
      />
    </div>
  )
}

class ReShareAttributes extends Component {
  state = {
    expandShareList: false,
    goBack: false,
    showConfirmModal: false,
    attributeList: []
  }

  toggleAttribute = attr => {
    const attributeList = [...this.state.attributeList]
    const attrIdx = attributeList.findIndex(a => a.uuid === attr.uuid)
    if (attrIdx >= 0) {
      attributeList.splice(attrIdx, 1)
    } else {
      attributeList.push(attr)
    }
    this.setState({ attributeList })
  }

  renderIcon = item => {
    if (item.type === 'Email') {
      return <MdMail fontSize="2em" color="white" />
    } else if (item.type === 'Phone') {
      return <MdCall fontSize="2em" color="white" />
    } else {
      return <ReAvatar avatar={item.avatar} uuid={item.value} />
    }
  }

  renderDropdownIcon = type => {
    if (type === 'Email') {
      return <MdMail fontSize="2em" color="white" />
    } else {
      return <MdCall fontSize="2em" color="white" />
    }
  }

  render() {
    if (this.state.goBack || !this.props.shareList.length)
      return <Redirect push to="/share" />

    return (
      <div className="share-attributes">
        {this.state.expandShareList ? (
          <>
            <div
              className="share-attributes-expand-header"
              onClick={() => this.setState({ expandShareList: false })}
            >
              <p>
                <span>{this.props.shareList.length}</span> items
              </p>
              <MdArrowDropup size="4em" color="#1BBC9B" />
            </div>
            <div className="share-attributes-dropdown">
              {this.props.shareList.map(item =>
                item.name ? (
                  <ReContact
                    key={item.value}
                    contact={{
                      uuid: item.value,
                      name: item.name,
                      avatar: item.avatar
                    }}
                    dummy
                  />
                ) : (
                  <div key={item.value} className="share-dropdown-value">
                    <div className="dropdown-icon">
                      {this.renderDropdownIcon(item.type)}
                    </div>
                    {item.value}
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <>
            <div
              className="share-attributes-header"
              onClick={() => this.setState({ expandShareList: true })}
            >
              <div className="share-attributes-icons">
                {this.props.shareList.slice(0, 4).map(item => (
                  <div key={item.value}>{this.renderIcon(item)}</div>
                ))}
              </div>
              <div className="share-attributes-stat">
                <p>
                  <span>{this.props.shareList.length}</span> items
                </p>
                <MdArrowDropdown size="3em" color="#1BBC9B" />
              </div>
            </div>
            <div className="share-attributes-body">
              <CardList
                Card={AttributeSelectCard}
                type="user"
                attributeList={this.state.attributeList}
                toggleAttribute={this.toggleAttribute}
              />
            </div>
          </>
        )}
        <div className="share-attributes-footer">
          <ReButton
            type="secondary"
            text="Back"
            width="175px"
            onClick={() => this.setState({ goBack: true })}
          />
          <ReButton
            type="primary"
            text="Share"
            width="175px"
            onClick={() => this.setState({ showConfirmModal: true })}
            disabled={!this.state.attributeList.length}
          />
        </div>

        <ReModal
          onClose={() => this.setState({ showConfirmModal: false })}
          show={this.state.showConfirmModal}
          headerText="Confirm Share"
        >
          <ShareConfirmModal />
        </ReModal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shareList: state.shareState.shareList
  }
}

export default connect(mapStateToProps)(ReShareAttributes)
