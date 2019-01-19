import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Columns from 'react-bulma-components/lib/components/columns'
import MdSearch from 'react-ionicons/lib/MdSearch'
import MdAlbums from 'react-ionicons/lib/MdAlbums'
import ReSearch from '../Input/ReSearch'
import SwipeNav from './SwipeNav'
import './header.scss'

export default class ReHeader extends Component {
  state = {
    navigateToUser: false
  }
  render() {
    if (this.state.navigateToUser) {
      return <Redirect push to="/profile" />
    }
    return (
      <div className="home-header">
        <Columns breakpoint="mobile" gapless style={{ marginBottom: '0.5em' }}>
          <Columns.Column size={2} className="icon-left">
            <MdSearch color="#1bbc9b" fontSize="2.5em" />
          </Columns.Column>
          <Columns.Column className="search-input">
            <ReSearch />
          </Columns.Column>
          <Columns.Column size={2} className="icon-right">
            <MdAlbums
              color="#1bbc9b"
              fontSize="2.5em"
              onClick={() => this.setState({ navigateToUser: true })}
            />
          </Columns.Column>
        </Columns>
        <SwipeNav menus={['Contacts', 'Groups']} active={0} />
      </div>
    )
  }
}
