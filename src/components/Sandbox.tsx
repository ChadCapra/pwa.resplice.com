import React from 'react'

import AttributeCard from './domain/AttributeCard'

const mockAttribute = {
  uuid: 'mockAttr',
  attribute_type: {
    id: 1,
    sort_order: 1,
    name: 'phone',
    verify_seconds: '',
    preview_name: 'Mobile',
    empty_value: { phone: '9999999999' },
    actions: [
      {
        sort_order: 1,
        name: 'call',
        display_name: 'call',
        icon: 'MdCall',
        user_only: true,
        unverified_only: false,
        action_value: ''
      }
    ]
  },
  name: 'Mobile',
  collection: 'Phones',
  value_uuid: 'value',
  value: { phone: '2185910657' },
  verified_at: '',
  expiry: ''
}

const Sandbox = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '1.5em',
        boxSizing: 'border-box'
      }}
    >
      <AttributeCard attribute={mockAttribute} />
    </div>
  )
}

export default Sandbox
