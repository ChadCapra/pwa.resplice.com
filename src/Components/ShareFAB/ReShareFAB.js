import React from 'react'
import Columns from 'react-bulma-components/lib/components/columns'
import MdAddCircle from 'react-ionicons/lib/MdAddCircle'
import MdMap from 'react-ionicons/lib/MdMap'
import MdText from 'react-ionicons/lib/MdText'
import MdMail from 'react-ionicons/lib/MdMail'

import './sharefab.scss'

const ReShareFAB = ({ selected }) => {
  if (selected) {
    return (
      <div className="fab-menu">
        <Columns breakpoint="mobile" gapless style={{ height: '100%' }}>
          <Columns.Column className="fab-menu-item">
            <MdMap color="white" fontSize="3rem" />
          </Columns.Column>
          <Columns.Column className="fab-menu-item">
            <MdText color="white" fontSize="3rem" />
          </Columns.Column>
          <Columns.Column className="fab-menu-item">
            <MdMail color="white" fontSize="3rem" />
          </Columns.Column>
          <Columns.Column className="fab-menu-item">
            <MdAddCircle color="white" fontSize="3rem" />
          </Columns.Column>
        </Columns>
      </div>
    )
  } else {
    return (
      <div className="fab">
        <MdAddCircle color="#1bbc9b" fontSize="4rem" />
      </div>
    )
  }
}

export default ReShareFAB
