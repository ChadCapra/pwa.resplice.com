import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buildShare } from '../../actions'
import { Redirect } from 'react-router-dom'

import ReInputCustom from '../Input/ReInputCustom'
import ReButton from '../Buttons/ReButton'
import ReShareDropdown from './ReShareDropdown'
import MdClose from 'react-ionicons/lib/MdClose'
import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'

import './share.scss'

/**
 * Share list component to show current share list
 */
class ReShareList extends Component {
  state = {
    showMenu: false,
    query: '',
    queryType: '',
    shareList: [],
    phone_details: [],
    email_details: [],
    contactList: [],
    continue: false
  }

  handleAttrClick = () => {
    if (this.state.queryType === 'email') {
      const shareList = [...this.state.shareList]
      const email_details = [...this.state.email_details]
      shareList.push({ value: this.state.query, email: this.state.query })
      email_details.push({ email: this.state.query })
      this.setState({
        showMenu: false,
        shareList,
        email_details,
        query: '',
        queryType: ''
      })
    } else if (this.state.queryType === 'phone') {
      const shareList = [...this.state.shareList]
      const phone_details = [...this.state.phone_details]
      shareList.push({
        value: this.state.query,
        country_code: '',
        phone_number: this.state.query,
        extension: ''
      })
      phone_details.push({
        country_code: '',
        phone_number: this.state.query,
        extension: ''
      })
      this.setState({
        showMenu: false,
        shareList,
        phone_details,
        query: '',
        queryType: ''
      })
    }
  }

  clearLists = () => {
    this.setState({ shareList: [], contactList: [] })
  }

  buildLists = () => {
    this.props.buildShare(
      this.state.contactList,
      this.state.phone_details,
      this.state.email_details
    )
    this.setState({ continue: true })
  }

  removeFromShareList = idx => {
    const shareList = [...this.state.shareList]
    shareList.splice(idx, 1)
    this.setState({ shareList })
  }

  handleContactClick = id => {
    console.log(id)
  }

  handleInputChange = value => {
    let numsOnly = /^[0-9]+$/
    // eslint-disable-next-line
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.test(value)) {
      this.setState({ queryType: 'email' })
    } else if (numsOnly.test(value) && value.length > 6) {
      this.setState({ queryType: 'phone' })
    } else {
      this.setState({ queryType: '' })
    }

    this.setState({ query: value })
  }

  renderIcon = item => {
    if (item.email) {
      return <MdMail fontSize="2em" color="white" />
    } else if (item.phone_number) {
      return <MdCall fontSize="2em" color="white" />
    } else {
      return <div>{item.profile_pic}</div>
    }
  }

  render() {
    if (this.state.continue) return <Redirect push to="/share/attributes" />
    return (
      <div className="share-list">
        <h1 className="share-list-header">Add by Phone, Email, or Contact</h1>
        <div className="share-list-input-container">
          <ReInputCustom
            onFocus={() => {
              this.setState({ showMenu: true })
            }}
            onChange={e => this.handleInputChange(e.target.value)}
            value={this.state.query}
          />
          {this.state.showMenu && (
            <ReShareDropdown
              query={this.state.query}
              queryType={this.state.queryType}
              handleAttrClick={this.handleAttrClick}
              handleContactClick={this.handleContactClick}
              close={() => this.setState({ showMenu: false })}
            />
          )}
        </div>
        <div className="share-list-container">
          {this.state.shareList.map((item, idx) => {
            return (
              <div className="share-list-item" key={idx}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="share-list-icon">{this.renderIcon(item)}</div>
                  <div>{item.value}</div>
                </div>
                <MdClose
                  className="share-list-close"
                  fontSize="2em"
                  color="#1BBC9B"
                  onClick={() => this.removeFromShareList(idx)}
                />
              </div>
            )
          })}
        </div>

        <div className="share-list-footer">
          <ReButton
            type="secondary"
            text="Clear"
            width="175px"
            onClick={this.clearLists}
          />
          <ReButton
            type="primary"
            text="Share"
            width="175px"
            onClick={this.buildLists}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { buildShare }
)(ReShareList)
