import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'

import Flex from '../shared/layout/Flex'
import Input from '../shared/form/Input'
import PhoneInput from '../shared/form/PhoneInput'
import Button from '../shared/button/InlineButton'

import { inviteContact } from '../../store/contact/contactActions'

type QueryTypes = {
  EMAIL: 'email'
  PHONE: 'phone'
  NONE: ''
}

const QUERY_TYPES: QueryTypes = {
  EMAIL: 'email',
  PHONE: 'phone',
  NONE: ''
}

const InviteContainer = styled(Flex)`
  padding: 2em;
  height: 100%;
  margin: auto;
  max-width: var(--mobile-max-px);
  box-sizing: border-box;
`
const InviteHeader = styled.h2`
  font-size: 1.5em;
  font-weight: semi-bold;
`
const AttributeContainer = styled(Flex)`
  background-color: var(--light-1);
  border-radius: 10px;
  padding: 1em;
`
const AttributeText = styled.p`
  width: 100%;
  line-height: 1.2;
  color: var(--text);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 0.5em;
`

type Props = {
  inviteContact: (invite: {
    type: 'phone' | 'email'
    value: string
  }) => Promise<void>
}

const InviteSearch = ({ inviteContact }: Props) => {
  const [queryType, setQueryType] = useState<'email' | 'phone' | ''>(
    QUERY_TYPES.NONE
  )
  const [query, setQuery] = useState('')
  const [sentInvites, setSentInvites] = useState<Dictionary<any>>({})
  const [inviting, setInviting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    let value = typeof e === 'string' ? e : e.target.value
    let numsOnly = /^[+0-9()-\s]+$/
    // eslint-disable-next-line
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailReg.test(value)) {
      setQueryType(QUERY_TYPES.EMAIL)
    } else if (numsOnly.test(value) && value.length > 2) {
      if (queryType !== QUERY_TYPES.PHONE && value[0] !== '+') {
        value = '1' + value
      }
      setQueryType(QUERY_TYPES.PHONE)
    } else {
      setQueryType(QUERY_TYPES.NONE)
    }

    setQuery(value)
  }

  const handleInvite = async () => {
    if (!queryType) return
    setInviting(true)
    await inviteContact({ type: queryType, value: query })
    setSentInvites({ [query]: true, ...sentInvites })
    setInviting(false)
  }

  const renderIcon = () => {
    if (queryType === QUERY_TYPES.PHONE) {
      return <MdCall fontSize="2em" color="#1BBC9B" />
    } else if (queryType === QUERY_TYPES.EMAIL) {
      return <MdMail fontSize="2em" color="#1BBC9B" />
    } else {
      return <MdMail fontSize="2em" color="#C8CCD4" />
    }
  }

  return (
    <InviteContainer direction="column">
      <InviteHeader>Invite a phone, email, or current connection</InviteHeader>
      {queryType === QUERY_TYPES.PHONE ? (
        <PhoneInput
          name="phone"
          value={query}
          label="Enter Phone"
          meta={{}}
          autoFocus
          onChange={handleInputChange}
        />
      ) : (
        <Input
          name="search"
          value={query}
          label="Search"
          meta={{}}
          autoFocus
          onChange={handleInputChange}
        />
      )}
      <AttributeContainer justify="between" align="center">
        <div style={{ flex: '0 0 auto' }}>{renderIcon()}</div>
        <Flex align="center" grow style={{ overflow: 'auto' }}>
          <AttributeText>{query}</AttributeText>
        </Flex>
        <div style={{ flex: '0 0 auto' }}>
          <Button
            loading={inviting}
            disabled={queryType === QUERY_TYPES.NONE || !!sentInvites[query]}
            onClick={handleInvite}
          >
            {!!sentInvites[query] ? 'Sent' : 'Invite'}
          </Button>
        </div>
      </AttributeContainer>
    </InviteContainer>
  )
}

export default connect(null, { inviteContact })(InviteSearch)
