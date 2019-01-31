import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addAttribute } from '../../actions'

import ReInput from '../Input/ReInput'
import ReInputDropdown from '../Input/ReInputDropdown'
import ReInputCombo from '../Input/ReInputCombo'
import ReButton from '../Buttons/ReButton'
import ReHeader from '../Header/ReHeader'
import ReInputPhone from '../Input/ReInputPhone'

class ReCreateAttribute extends Component {
  state = {
    attrType: this.props.attrTypes[0],
    typeSelected: false,
    attributeAdded: false
  }

  onSubmit = ({ attribute_type, collection, name, ...formValues }) => {
    console.log(formValues)
    let attributeAdd = {
      attribute_type_id: this.state.attrType.id,
      name,
      collection,
      details: {
        ...formValues
      }
    }
    this.props
      .addAttribute(attributeAdd)
      .then(() => this.setState({ attributeAdded: true }))
  }

  formatLabel(label) {
    let newLabel = label.split('_')
    for (let i = 0; i < newLabel.length; i++) {
      newLabel[i] =
        newLabel[i].charAt(0).toUpperCase() + newLabel[i].substring(1)
    }
    return newLabel.join(' ')
  }

  renderFields() {
    if (this.state.attrType.name === 'Phone') {
      return (
        <>
          <Field name="name" label="Name" component={ReInput} />

          <Field name="phone_number" label="Phone" component={ReInputPhone} />

          <Field
            name="collection"
            label="Collection"
            dataList={this.props.collectionsList}
            listName="collections"
            component={ReInputCombo}
          />
        </>
      )
    } else {
      return (
        <>
          <Field name="name" label="Name" component={ReInput} />
          {Object.keys(this.state.attrType.default_details).map(
            (detail, idx) => {
              return (
                <Field
                  key={idx}
                  name={detail}
                  label={this.formatLabel(detail)}
                  component={ReInput}
                />
              )
            }
          )}
          <Field
            name="collection"
            label="Collection"
            dataList={this.props.collectionsList}
            listName="collections"
            component={ReInputCombo}
          />
        </>
      )
    }
  }

  handleTypeChange = (e, value) => {
    if (value) {
      this.setState({
        attrType: this.props.attrTypes.find(type => type.name === value),
        typeSelected: true
      })
    } else {
      this.setState({ typeSelected: false })
    }
  }

  render() {
    if (this.state.attributeAdded) {
      return <Redirect push to="/profile" />
    }
    return (
      <div className="create-attribute">
        <ReHeader menus={['Add Attribute']} />
        <div className="create-attribute-body">
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="create-attribute-form"
          >
            <div className="inputs">
              <Field
                name="attribute_type"
                label="What would you like to add?"
                options={this.props.attrTypes}
                component={ReInputDropdown}
                onChange={this.handleTypeChange}
              />
              {this.state.typeSelected && this.renderFields()}
            </div>
            <ReButton
              type="primary"
              text="Add"
              width="250px"
              loading={this.props.loading}
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    attrTypes: state.attributes.types,
    collectionsList: Object.keys(state.user.collections),
    loading: state.attributes.loading
  }
}

const createAttributeForm = reduxForm({
  form: 'createAttribute'
})(ReCreateAttribute)

export default connect(
  mapStateToProps,
  { addAttribute }
)(createAttributeForm)
