import React, { PureComponent } from 'react'

import ReContact from '../Contact/ReContact'
import ReCreateGroup from './ReCreateGroup'
import RePlusFAB from '../Buttons/RePlusFAB'
import ReModal from '../Modals/ReModal'
import AlphaNumericSlider from '../Util/AlphaNumericSlider'

import './group.scss'

const buildSortedList = () => {
  const contacts = {}
  for (let i = 1; i <= 100; i++) {
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

const buildLetterMap = contacts => {
  return contacts.reduce((map, contact) => {
    const letter = contact.name[0].toUpperCase()
    if (/[0-9]/.test(letter)) map['#'] = []
    else map[letter] = []
    return map
  }, {})
}

let letterRefMap = {}
class ReGroupList extends PureComponent {
  state = {
    showCreateModal: false,
    contactsSelectable: false,
    contacts: buildSortedList(),
    contactsSelected: []
  }

  componentWillMount() {
    letterRefMap = buildLetterMap(this.state.contacts)
  }

  addToRefMap = instance => {
    if (!instance) return
    const name = instance.children[1].children[0].textContent
    const letter = /[0-9]/.test(name[0]) ? '#' : name[0].toUpperCase()
    letterRefMap[letter]
      ? letterRefMap[letter].push(instance)
      : (letterRefMap[letter] = [instance])
  }

  handleLetterClick = letter => {
    letterRefMap[letter][0].scrollIntoView({
      alignToTop: true,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <div className="re-group-list">
        {this.state.contacts.map(item => {
          return (
            <ReContact
              key={item.uuid}
              contact={item}
              addToRefMap={this.addToRefMap}
              onLongPress={() => console.log('Long press')}
            />
          )
        })}

        <AlphaNumericSlider
          list={Object.keys(letterRefMap)}
          onClick={this.handleLetterClick}
        />

        <RePlusFAB onClick={() => this.setState({ showCreateModal: true })} />

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
