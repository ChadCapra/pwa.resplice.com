import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import View from '../Layout/View'
import Card from '../Card/Card'
import Attribute from '../Card/Attribute'
import ProfileSummary from '../Profile/ProfileSummary'
import Button from '../Button/ReButton'
import MdClose from 'react-ionicons/lib/MdClose'

import { inviteMember } from '../../state/actions'

const emailActions = [
  {
    name: 'email',
    display_name: 'Send Email',
    icon: 'MdMail',
    user_only: false,
    unverified_only: false,
    action_value: '{email}'
  }
]

const phoneActions = [
  {
    name: 'call',
    display_name: 'Call',
    icon: 'MdCall',
    user_only: false,
    unverified_only: false,
    action_value: '{phone}'
  }
]

const ReImportInvite = ({ match, importingContacts, inviteMember }) => {
  const [toGroup, setToGroup] = useState(false)

  if (toGroup || !importingContacts)
    return <Redirect to={`/group/${match.params.uuid}`} />

  // const invite = async value => {}

  // const cleanup =

  return (
    <View>
      <View.Header>
        <h2
          style={{
            textAlign: 'center',
            color: 'grey',
            fontSize: '28px',
            paddingTop: '16px'
          }}
        >
          Invite
        </h2>
        <MdClose
          onClick={() => setToGroup(true)}
          style={{ position: 'fixed', top: '16px', right: '16px' }}
          color="#1bbc9b"
          fontSize="2em"
        />
      </View.Header>
      <View.Body>
        {importingContacts.map((contact, idx) => {
          return (
            <Card key={idx} border>
              <Card.Header>
                <ProfileSummary
                  profile={{
                    name: contact.name,
                    avatar: contact.avatar
                  }}
                />
              </Card.Header>
              <Card.Body>
                {contact.emails &&
                  contact.emails.map((email, idx) => (
                    <Attribute
                      key={idx}
                      attribute={{
                        name: 'Email',
                        value: { email: email.value },
                        actions: emailActions
                      }}
                      immutableActions
                      noDropdown
                    >
                      <Attribute.RightChild>
                        <Button
                          type="primary"
                          disabled={email.invited}
                          onClick={() => {}}
                          style={{
                            width: '80px',
                            height: '36px',
                            fontSize: '16px'
                          }}
                        >
                          {email.invited ? 'Sent' : 'Invite'}
                        </Button>
                      </Attribute.RightChild>
                    </Attribute>
                  ))}
                {contact.phones &&
                  contact.phones.map((phone, idx) => (
                    <Attribute
                      key={idx}
                      attribute={{
                        name: 'Phone',
                        value: { phone: phone.value },
                        actions: phoneActions
                      }}
                      immutableActions
                      noDropdown
                    >
                      <Attribute.RightChild>
                        <Button
                          type="primary"
                          disabled={phone.invited}
                          onClick={() => {}}
                          style={{
                            width: '80px',
                            height: '36px',
                            fontSize: '16px'
                          }}
                        >
                          {phone.invited ? 'Sent' : 'Invite'}
                        </Button>
                      </Attribute.RightChild>
                    </Attribute>
                  ))}
              </Card.Body>
            </Card>
          )
        })}
      </View.Body>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    importingContacts: state.groupState.importingContacts
  }
}

export default connect(
  mapStateToProps,
  { inviteMember }
)(ReImportInvite)
