import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestRelationship } from '../../state/actions'

import ReInput from '../Form/ReInput'
import ReInputPhone from '../Form/ReInputPhone'
import ReButton from '../Button/ReButton'
import ReShareDropdown from './ReShareDropdown'
import MdClose from 'react-ionicons/lib/MdClose'
import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import ReAvatarThumbnail from '../Profile/Avatar/ReAvatarThumbnail'
import ReTags from '../Util/ReTags'
import ReModal from '../Modal/ReModal'
import ReCustomMessage from './ReCustomMessage'

import './share.scss'

/**
 * Share list component to show current share list
 */
class ReInvite extends Component {
  state = {
    showMenu: false,
    showCustomMessage: false,
    query: '',
    queryType: '',
    attribute: null,
    tags: [
      'Work',
      'Friend',
      'Family',
      'Service',
      'Neighbor',
      'School',
      'Happy'
    ],
    selectedTags: [],
    message: ''
  }

  handleAttrClick = () => {
    if (this.state.queryType === 'email') {
      this.setState({
        showMenu: false,
        attribute: { type: 'Email', value: this.state.query },
        query: '',
        queryType: ''
      })
    } else if (this.state.queryType === 'phone') {
      this.setState({
        showMenu: false,
        attribute: { type: 'Phone', value: this.state.query },
        query: '',
        queryType: ''
      })
    }
  }

  clearAttribute = () => {
    this.setState({
      attribute: null
    })
  }

  handleContactClick = id => {
    console.log(id)
  }

  handleInputChange = value => {
    let numsOnly = /^[+0-9()-\s]+$/
    // eslint-disable-next-line
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.test(value)) {
      this.setState({ queryType: 'email' })
    } else if (numsOnly.test(value) && value.length > 2) {
      if (this.state.queryType !== 'phone' && value[0] !== '+') {
        value = '1' + value
      }
      this.setState({ queryType: 'phone' })
    } else {
      this.setState({ queryType: '' })
    }

    this.setState({ query: value })
  }

  handleTagChange = tag => {
    let tags = [...this.state.selectedTags]
    const tagIdx = tags.findIndex(t => t === tag)
    if (tagIdx >= 0) {
      tags.splice(tagIdx, 1)
    } else {
      tags.push(tag)
    }
    this.setState({ tags: [...this.state.tags, ...tags], selectedTags: tags })
  }

  handleRequest = () => {
    this.props.requestRelationship({
      phone_or_email: this.state.attribute.value,
      message: this.state.message,
      tags: this.state.selectedTags
    })
  }

  renderIcon = item => {
    if (item.type === 'Email') {
      return <MdMail fontSize="2em" color="white" />
    } else if (item.type === 'Phone') {
      return <MdCall fontSize="2em" color="white" />
    } else {
      return <ReAvatarThumbnail avatar={item.avatar} uuid={item.value} />
    }
  }

  render() {
    return (
      <div className="share-list">
        <h1 className="invite-header" style={{ marginBottom: 0 }}>
          Invite
        </h1>
        {!this.state.attribute && (
          <div className="share-list-input-container">
            {this.state.queryType === 'phone' ? (
              <ReInputPhone
                label="Phone"
                meta={{
                  pristine: true,
                  touched: false,
                  error: '',
                  warning: ''
                }}
                onChange={value => {
                  this.handleInputChange(value)
                }}
                input={{ value: this.state.query }}
                inputExtraProps={{ autoFocus: true }}
              />
            ) : (
              <ReInput
                type="text"
                label="Email or Phone"
                meta={{
                  pristine: true,
                  touched: false,
                  error: '',
                  warning: ''
                }}
                onChange={e => this.handleInputChange(e.target.value)}
                input={{ value: this.state.query }}
                autoFocus
              />
            )}
            {this.state.query.length > 0 && (
              <ReShareDropdown
                query={this.state.query}
                queryType={this.state.queryType}
                handleAttrClick={this.handleAttrClick}
                handleContactClick={this.handleContactClick}
              />
            )}
          </div>
        )}
        <div className="invite-attribute-container">
          {this.state.attribute && (
            <div className="share-list-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="share-list-icon">
                  {this.renderIcon(this.state.attribute)}
                </div>
                <div>{this.state.attribute.value}</div>
              </div>
              <MdClose
                fontSize="2em"
                color="#1BBC9B"
                onClick={() => this.clearAttribute()}
              />
            </div>
          )}
        </div>

        <div className="share-list-footer">
          <ReButton
            type="secondary"
            text={
              this.state.message ? 'Edit Custom Message' : 'Add Custom Message'
            }
            width="300px"
            onClick={() => this.setState({ showCustomMessage: true })}
          />
          <ReButton
            type="primary"
            text="Invite"
            width="175px"
            disabled={!this.state.attribute}
            loading={this.props.loading}
            onClick={this.handleRequest}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.shareState.loading
  }
}

export default connect(
  mapStateToProps,
  { requestRelationship }
)(ReInvite)
