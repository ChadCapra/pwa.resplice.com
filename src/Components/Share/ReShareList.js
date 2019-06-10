import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buildShare } from '../../actions'
import { Redirect } from 'react-router-dom'

import ReInput from '../Input/ReInput'
import ReInputPhone from '../Input/ReInputPhone'
import ReButton from '../Buttons/ReButton'
import ReShareDropdown from './ReShareDropdown'
import MdClose from 'react-ionicons/lib/MdClose'
import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import ReAvatar from '../Contact/ReAvatar'

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
    continue: false
  }

  handleAttrClick = () => {
    if (this.state.queryType === 'email') {
      const shareList = [...this.state.shareList]
      shareList.push({ type: 'Email', value: this.state.query })
      this.setState({
        showMenu: false,
        shareList,
        query: '',
        queryType: ''
      })
    } else if (this.state.queryType === 'phone') {
      const shareList = [...this.state.shareList]
      shareList.push({ type: 'Phone', value: this.state.query })
      this.setState({
        showMenu: false,
        shareList,
        query: '',
        queryType: ''
      })
    }
  }

  clearLists = () => {
    this.setState({ shareList: [] })
  }

  buildLists = () => {
    this.props.buildShare(this.state.shareList)
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

  renderIcon = item => {
    if (item.type === 'Email') {
      return <MdMail fontSize="2em" color="white" />
    } else if (item.type === 'Phone') {
      return <MdCall fontSize="2em" color="white" />
    } else {
      return <ReAvatar avatar={item.avatar} uuid={item.value} />
    }
  }

  render() {
    if (this.state.continue) return <Redirect push to="/share/attributes" />

    return (
      <div className="share-list">
        <h1 className="share-list-header">Add by Phone, Email, or Contact</h1>
        <div className="share-list-input-container">
          {this.state.queryType === 'phone' ? (
            <ReInputPhone
              label="Share"
              meta={{ pristine: true, touched: false, error: '', warning: '' }}
              onChange={value => {
                this.handleInputChange(value)
              }}
              input={{ value: this.state.query }}
              inputExtraProps={{ autoFocus: true }}
            />
          ) : (
            <ReInput
              type="text"
              label="Share"
              meta={{ pristine: true, touched: false, error: '', warning: '' }}
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
        <div className="share-list-container">
          {this.state.shareList.map((item, idx) => {
            return (
              <div className="share-list-item" key={idx}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="share-list-icon">{this.renderIcon(item)}</div>
                  <div>{item.value}</div>
                </div>
                <MdClose
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
            text="Continue"
            width="175px"
            onClick={this.buildLists}
            disabled={!this.state.shareList.length}
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
