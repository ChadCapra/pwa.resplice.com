import React from 'react'
import { connect } from 'react-redux'
import { RespliceState, Contact } from '../../store/store'
import styled from 'styled-components'

import EntityList from '../shared/entity/EntityList'
import ContactSummary from './ContactSummary'

const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
`

type Props = {
  contacts: Dictionary<Contact> | null
}

const ContactList = ({ contacts }: Props) => {
  return contacts ? (
    <ListContainer>
      <EntityList list={Object.values(contacts)} ListItem={ContactSummary} />
    </ListContainer>
  ) : null
}

const mapStateToProps = (state: RespliceState) => {
  return {
    contacts: state.contactState.contacts
  }
}

export default connect(mapStateToProps)(ContactList)
