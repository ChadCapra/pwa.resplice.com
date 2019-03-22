import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown'
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup'
import AttributeCardList from '../Cards/AttributeCardList'
import AttributeSelectCard from '../Cards/AttributeSelectCard'
import ReButton from '../Buttons/ReButton'

class ReShareAttributes extends Component {
  state = {
    expandedShareList: false,
    back: false,
    confirmation: false,
    list: Object.values(this.props.shareList).flat()
  }

  renderListPreview = () => {
    const { list } = this.state
    return (
      <div className="share-attributes-icons">
        <div>{list[0]}</div>
        <div>{list[1]}</div>
        <div>{list[2]}</div>
        <div>{list[3]}</div>
      </div>
    )
  }

  render() {
    if (this.state.back) return <Redirect to="/share" />
    return (
      <div className="share-attributes">
        {this.state.expandedShareList ? (
          <>
            <div
              className="share-attributes-expnd-header"
              onClick={() => this.setState({ expandedShareList: false })}
            >
              <div>
                <p>
                  <span>{this.state.list.length}</span> people
                </p>
              </div>
              <MdArrowDropup size="4em" color="#1BBC9B" />
            </div>
            <div className="share-attributes-body">
              {this.state.list.map(item => (
                <div>{item.value}</div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              className="share-attributes-header"
              onClick={() => this.setState({ expandedShareList: true })}
            >
              {this.renderListPreview()}
              <div className="share-attributes-stat">
                <p>
                  <span>{this.state.list.length}</span> people
                </p>
                <MdArrowDropdown size="3em" color="#1BBC9B" />
              </div>
            </div>
            <div className="share-attributes-body">
              <AttributeCardList Component={AttributeSelectCard} />
              body
            </div>
          </>
        )}
        <div className="share-attributes-footer">
          <ReButton type="secondary" text="Back" width="175px" />
          <ReButton type="primary" text="Continue" width="175px" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shareList: {
      contacts: state.contacts.list.filter(contact =>
        state.shares.contact_ids.contains(contact.id)
      ),
      phones: state.shares.phone_details,
      emails: state.shares.email_details
    }
  }
}

export default connect(mapStateToProps)(ReShareAttributes)
