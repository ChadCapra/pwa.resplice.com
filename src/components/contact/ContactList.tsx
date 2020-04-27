import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { RespliceState, Contact } from '../../store/store'
import styled from 'styled-components'

import EntityList from '../shared/entity/EntityList'
import ContactSummary from './ContactSummary'
import FAB from '../shared/button/FAB'

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
  const history = useHistory()
  const contactList = contacts ? Object.values(contacts) : null
  return contactList ? (
    <>
      <ListContainer>
        <EntityList list={contactList} ListItem={ContactSummary} />
      </ListContainer>

      <FAB onClick={() => history.push('/invite')} />
    </>
  ) : (
    <p>Loading</p>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    contacts: state.contactState.contacts
  }
}

export default connect(mapStateToProps)(ContactList)
