import React, { PureComponent } from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import ReContact from '../Profile/ReProfileItem'
import ReCreateGroup from './ReCreateGroup'
import RePlusFAB from '../Button/RePlusFAB'
import ReModal from '../Modal/ReModal'
import AlphaNumericSlider from '../Util/AlphaNumericSlider'

import './group.scss'

const buildSortedList = () => {
  const contacts = {}
  for (let i = 1; i <= 1000; i++) {
    const uuid = Math.random()
      .toString(36)
      .substring(2, 15)
    contacts[uuid] = {
      name:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      uuid,
      tags: i,
      pending: i === 4 || i === 10
    }
  }
  return Object.values(contacts).sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
}

class ReGroupList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showCreateModal: false,
      contactsSelectable: false,
      contacts: buildSortedList(),
      contactsSelected: []
    }
    this.listRef = React.createRef()
  }

  handleLetterClick = index => {
    this.listRef.current.scrollToItem(index, 'start')
  }

  handleSelect = uuid => {
    const newUuids = [...this.state.contactsSelected]
    newUuids.push(uuid)
    this.setState({ contactsSelected: newUuids, contactsSelectable: true })
  }

  renderGroupItem = ({ index, style }) => {
    const contact = this.state.contacts[index]
    const selected = this.state.contactsSelected.includes(contact.uuid)

    return (
      <ReContact
        contact={contact}
        selected={selected}
        selectable={this.state.contactsSelectable}
        style={style}
        onSelect={this.handleSelect}
      />
    )
  }

  render() {
    return (
      <div className="re-group-list">
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={this.listRef}
              className="List"
              height={height}
              itemCount={this.state.contacts.length}
              itemSize={60}
              width={width}
              itemData={this.state.contacts}
              overscanCount={10}
            >
              {this.renderGroupItem}
            </List>
          )}
        </AutoSizer>

        <AlphaNumericSlider
          list={this.state.contacts}
          onClick={this.handleLetterClick}
        />

        <RePlusFAB
          onClick={() => this.setState({ showCreateModal: true })}
          selecting={this.state.contactsSelectable}
        />

        <ReModal
          full
          show={this.state.showCreateModal}
          onClose={() => this.setState({ showCreateModal: false })}
          headerText="Create Group"
        >
          <ReCreateGroup />
        </ReModal>
      </div>
    )
  }
}

export default ReGroupList
