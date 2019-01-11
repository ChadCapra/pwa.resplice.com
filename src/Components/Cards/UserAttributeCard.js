import React, { Component } from 'react'
import Columns from 'react-bulma-components/lib/components/columns'
import ReInputCard from '../Input/ReInputCard'
import MdAddCircle from 'react-ionicons/lib/MdAddCircle'
import MdVerif from 'react-ionicons/lib/MdDoneAll'
import ReButton from '../Buttons/ReButton'
import ReModal from '../Modals/ReModal'
import CreateAttribute from '../Modals/CreateAttribute'

import './card.scss'

export default class UserAttributeCard extends Component {
  state = {
    showCreateModal: false
  }
  renderAttributes = () => {
    const { attrs } = this.props
    return attrs.map(attr => (
      <div key={attr.id}>
        <Columns className="card-attribute" breakpoint="mobile">
          <Columns.Column size={1}>{attr.icon}</Columns.Column>
          <Columns.Column className="card-attribute-text">
            <span className="card-attribute-text-name">{attr.name}</span>
            <span>{attr.value}</span>
          </Columns.Column>
          <Columns.Column size={2} className="card-attribute-icon">
            {attr.verified && <MdVerif color="#1BBC9B" fontSize="2rem" />}
            {!attr.verified && (
              <ReButton text="Resend" type="small" width="70px" />
            )}
          </Columns.Column>
        </Columns>
        {!attr.verified && (
          <Columns breakpoint="mobile">
            <Columns.Column size={1} />
            <Columns.Column>
              <ReInputCard placeholder="Enter Verify Code" />
            </Columns.Column>
            <Columns.Column size={2} />
          </Columns>
        )}
      </div>
    ))
  }

  openCreateModal = () => this.setState({ showCreateModal: true })
  closeCreateModal = () => this.setState({ showCreateModal: false })

  render() {
    const { header } = this.props
    return (
      <div className="card">
        <div className="card-header">{header}</div>
        {this.renderAttributes()}
        <div className="card-add">
          <MdAddCircle
            className="card-fab"
            color="#1BBC9B"
            fontSize="3rem"
            onClick={this.openCreateModal}
          />
        </div>
        <ReModal
          show={this.state.showCreateModal}
          close={this.closeCreateModal}
          modal={{ closeOnBlur: true }}
        >
          <CreateAttribute />
        </ReModal>
      </div>
    )
  }
}
