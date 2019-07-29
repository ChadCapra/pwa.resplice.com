import React, { useState } from 'react'
import { connect } from 'react-redux'

import ReSearch from '../Form/ReSearch'
import ReSearchTags from '../Util/ReSearchTags'
import ReProfileList from '../Profile/ReProfileList'

import { alphabetSort } from '../../helpers'

const filterByQuery = (contacts, query) => {
  if (!query) return contacts
  return contacts.filter(contact =>
    contact.searchable_values.find(val => {
      return val.includes(query)
    })
  )
}

const filterByTags = (contacts, tags) => {
  if (tags.length <= 0) return contacts
  return contacts.filter(contact =>
    contact.tags.reduce((_bool, tag) => {
      return tags.includes(tag)
    }, false)
  )
}

const ReSearchView = ({ tags, contacts }) => {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const filteredContacts = () => {
    return filterByTags(filterByQuery(contacts, query), selectedTags)
  }

  const toggleTag = tag => {
    const newSelectedTags = [...selectedTags]
    const idx = newSelectedTags.findIndex(t => t === tag)
    if (idx < 0) {
      newSelectedTags.push(tag)
    } else {
      newSelectedTags.splice(idx, 1)
    }
    setSelectedTags(newSelectedTags)
  }

  return (
    <div className="view">
      <div className="view-header" style={{ padding: 0 }}>
        <ReSearch
          query={query}
          onChange={val => setQuery(val)}
          style={{ margin: '16px', width: 'auto' }}
        />
        <ReSearchTags
          tags={tags}
          selectedTags={selectedTags}
          onClick={toggleTag}
          style={{ marginBottom: '16px' }}
        />
      </div>
      <div className="view-body">
        <ReProfileList
          list={filteredContacts()}
          handleSelect={() => {}}
          handleDeselect={() => {}}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tags: Object.values(state.userState.profile.tags),
    contacts: Object.values(state.contactState.contacts).sort((a, b) =>
      alphabetSort(a.name, b.name)
    )
  }
}

export default connect(mapStateToProps)(ReSearchView)
