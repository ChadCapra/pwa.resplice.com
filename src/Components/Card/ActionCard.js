import React from 'react'
import PropTypes from 'prop-types'
import Columns from 'react-bulma-components/lib/components/columns'

import ActionIcon from '../Util/ActionIcon'
import ReCheckbox from '../Form/ReCheckbox'
import ReProfileHeaderSummary from '../Profile/ReProfileHeaderSummary'

const ActionCard = ({ item, toggleKey, toggleAttribute }) => {
  return (
    <div className="card">
      <ReProfileHeaderSummary
        profile={{ ...item, uuid: item.name, tags: ['Google'] }}
      />
      {item.emails.map(email => email.value)}
      {item.phones.map(phone => phone.value)}
    </div>
  )
}

export default ActionCard
