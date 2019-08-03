import React from 'react'
import { connect } from 'react-redux'

import View from '../Layout/View'
import Card from '../Card/Card'
import ProfileSummary from '../Profile/ProfileSummary'

const ReImportInvite = () => {
  return (
    <View>
      <View.Header />
      <View.Body>
        <Card border>
          <Card.Header>
            <ProfileSummary
              profile={{
                uuid: '234234',
                name: 'Bastilla Shan'
              }}
            />
          </Card.Header>
          <Card.Body>Attributes</Card.Body>
        </Card>
      </View.Body>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    importingContacts: state.groupState.importingContacts
  }
}

export default connect(mapStateToProps)(ReImportInvite)
