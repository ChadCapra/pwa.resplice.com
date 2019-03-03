import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buildShare } from '../../actions'

import ReInputCustom from '../Input/ReInputCustom'
import ReButton from '../Buttons/ReButton'
import ReShareDropdown from './ReShareDropdown'
import MdClose from 'react-ionicons/lib/MdClose'

import './share.scss'

class ReShareList extends Component {
  state = {
    showMenu: false,
    query: '',
    queryType: '',
    shareList: [
      {
        value: '2185910657'
      },
      {
        value: 'macewinduMF'
      },
      {
        value: 'lukesky@rebels.com'
      }
    ],
    contacts: [
      {
        id: 1,
        name: 'Darth Vader',
        tags: 'Father',
        avatar:
          'https://res.cloudinary.com/capabit-solutions/image/upload/v1529421479/Resplice/ncf3iws37vcg6tdofrgh.png'
      },
      {
        id: 2,
        name: 'Darth Revan',
        tags: 'Nemesis',
        avatar:
          'https://res.cloudinary.com/capabit-solutions/image/upload/v1529336274/Resplice/hnudtpaujzs0lszwwxdm.png'
      },
      {
        id: 3,
        name: 'Han Solo',
        tags: 'Friend | Hero',
        avatar:
          'https://res.cloudinary.com/capabit-solutions/image/upload/v1529421536/Resplice/fng1vunrc5nyu2hhuvsj.png'
      }
    ]
  }

  handleAttrClick = () => {
    if (this.state.queryType === 'email') {
      const shareList = [...this.state.shareList]
      shareList.push({ value: this.state.query, email: this.state.query })
      this.setState({ showMenu: false, shareList, query: '' })
    } else if (this.state.queryType === 'phone') {
      const shareList = [...this.state.shareList]
      shareList.push({
        value: this.state.query,
        country_code: '',
        phone_number: this.state.query,
        extension: ''
      })
      this.setState({ showMenu: false, shareList, query: '' })
    }
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

  render() {
    return (
      <div className="share-list">
        <h1 className="share-list-header">Add by Phone, Email, or Contact</h1>
        <div className="share-list-input-container">
          <ReInputCustom
            onFocus={() => {
              console.log('loading')
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
                <div>{item.value}</div>
                <MdClose
                  fontSize="2em"
                  color="#1BBC9B"
                  onClick={() => this.removeFromShareList(idx)}
                />
              </div>
            )
          })}
        </div>

        <ReButton type="primary" text="Share" width="200px" />
      </div>
    )
  }
}

export default connect(
  null,
  { buildShare }
)(ReShareList)
