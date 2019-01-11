import React, { Component } from 'react'
import Columns from 'react-bulma-components/lib/components/columns'
import Icon from 'react-bulma-components/lib/components/icon'
import MdSearch from 'react-ionicons/lib/MdSearch'
import MdAlbums from 'react-ionicons/lib/MdAlbums'

import ReSearch from '../Input/ReSearch'
import SwipeNav from './SwipeNav'
import './header.scss'

export default class ReHeader extends Component {
  render() {
    return (
      <div className="home-header">
        <Columns breakpoint="mobile" gapless style={{ marginBottom: '0.5rem' }}>
          <Columns.Column size={2} className="icon-left">
            <Icon size="large">
              <MdSearch color="#1bbc9b" fontSize="2.5rem" />
            </Icon>
          </Columns.Column>
          <Columns.Column className="search-input">
            <ReSearch />
          </Columns.Column>
          <Columns.Column size={2} className="icon-right">
            <Icon size="large">
              <MdAlbums color="#1bbc9b" fontSize="2.5rem" />
            </Icon>
          </Columns.Column>
        </Columns>
        <SwipeNav menus={['Contacts', 'Groups']} active={0} />
      </div>
    )
  }
}
