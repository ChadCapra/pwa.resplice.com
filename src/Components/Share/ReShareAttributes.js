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
    goBack: false,
    goTags: false,
    list: Object.values(this.props.shareList).flat()
  }

  renderListPreview = () => {
    const { list } = this.state
    console.log(list)
    return (
      <div className="share-attributes-icons">
        {/* <div>{list[0]}</div>
        <div>{list[1]}</div>
        <div>{list[2]}</div>
        <div>{list[3]}</div> */}
        <div>{1}</div>
        <div>{2}</div>
        <div>{3}</div>
        <div>{4}</div>
      </div>
    )
  }

  render() {
    if (this.state.goBack) return <Redirect push to="/share" />
    if (this.state.goTags) return <Redirect push to="/share/tags" />
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
              <AttributeCardList ListComponent={AttributeSelectCard} user />
            </div>
          </>
        )}
        <div className="share-attributes-footer">
          <ReButton
            type="secondary"
            text="Back"
            width="175px"
            onClick={() => this.setState({ goBack: true })}
          />
          <ReButton
            type="primary"
            text="Continue"
            width="175px"
            onClick={() => this.setState({ goTags: true })}
          />
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
