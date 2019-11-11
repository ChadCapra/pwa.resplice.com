import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import FlexBox from '../Layout/FlexBox'
import InputCode from '../Form/ReInputCode'

import { unlockContact } from '../../state/actions'

const QrCodeUnlock = ({ uuid, contacts, error, unlockContact }) => {
  if (contacts[uuid]) return <Redirect push to={`/contact/${uuid}`} />

  return (
    <FlexBox direction="column" justify="center" align="center">
      <InputCode
        name="unlockCode"
        label="Enter QR Pin to Unlock"
        onComplete={code => unlockContact(uuid, code)}
      />
      {error && <FlexBox>There was a problem unlocking the contact</FlexBox>}
    </FlexBox>
  )
}

const mapStateToProps = state => {
  return {
    contacts: state.contactState.contacts,
    error: state.contactState.error
  }
}

export default connect(
  mapStateToProps,
  { unlockContact }
)(QrCodeUnlock)
