import React, { Component } from 'react'

import ReInputCustom from '../Input/ReInputCustom'
import ReButton from '../Buttons/ReButton'
import ReShareDropdown from './ReShareDropdown'
import MdClose from 'react-ionicons/lib/MdClose'

import './share.scss'

class ReShareList extends Component {
  state = {
    showMenu: false,
    query: '',
    shareList: [
      {
        id: 1,
        value: '2185910657'
      },
      {
        id: 2,
        value: 'macewinduMF'
      },
      {
        id: 3,
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
  render() {
    return (
      <div className="share-list">
        <h1 className="share-list-header">Add by Phone, Email, or Contact</h1>
        <div className="share-list-input-container">
          <ReInputCustom
            onFocus={() => this.setState({ showMenu: true })}
            onBlur={() => this.setState({ showMenu: false })}
            onChange={e => this.setState({ query: e.target.value })}
          />
          {this.state.showMenu && (
            <ReShareDropdown
              query={this.state.query}
              contacts={this.state.contacts}
            />
          )}
        </div>
        <div className="share-list-container">
          {this.state.shareList.map(item => {
            return (
              <div className="share-list-item" key={item.id}>
                <div>{item.value}</div>
                <MdClose fontSize="2em" color="#1BBC9B" />
              </div>
            )
          })}
        </div>

        <ReButton type="primary" text="Share" width="200px" />
      </div>
    )
  }
}

export default ReShareList
