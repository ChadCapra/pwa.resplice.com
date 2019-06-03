import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addAttribute } from '../../actions'

import ReInput from '../Input/ReInput'
import ReInputDropdown from '../Input/ReInputDropdown'
import ReInputPhone from '../Input/ReInputPhone'
import ReInputCombo from '../Input/ReInputCombo'
import ReInputCountry from '../Input/ReInputCountry'
import ReInputRegion from '../Input/ReInputRegion'
import ReButton from '../Buttons/ReButton'
import ReHeader from '../Header/ReHeader'

class ReCreateAttribute extends Component {
  state = {
    attrType: this.props.attrTypes[0],
    typeSelected: false,
    attributeAdded: false
  }

  onSubmit = ({ attribute_type, collection, name, ...formValues }) => {
    let attributeAdd = {
      attribute_type_id: this.state.attrType.id,
      name,
      collection,
      value: {
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
    return (
      <>
        <Field name="name" type="text" label="Name" component={ReInput} />
        {Object.keys(this.state.attrType.default_value).map((value, idx) => {
          switch (value) {
            case 'phone':
              return (
                <Field
                  key={idx}
                  name={value}
                  label={this.formatLabel(value)}
                  component={ReInputPhone}
                />
              )
            case 'date':
              return (
                <Field
                  key={idx}
                  name={value}
                  type="date"
                  label={this.formatLabel(value)}
                  component={ReInput}
                />
              )
            case 'country':
              return (
                <Field
                  key={idx}
                  name={value}
                  label={this.formatLabel(value)}
                  component={ReInputCountry}
                />
              )
            case 'region':
              return (
                <Field
                  key={idx}
                  name={value}
                  label={this.formatLabel(value)}
                  country={this.props.country}
                  component={ReInputRegion}
                />
              )
            case 'postal_code':
              return (
                <Field
                  key={idx}
                  name={value}
                  type="text"
                  maxLength="8"
                  pattern="[a-zA-Z0-9-]+"
                  label={this.formatLabel(value)}
                  component={ReInput}
                />
              )
            default:
              return (
                <Field
                  key={idx}
                  name={value}
                  type="text"
                  label={this.formatLabel(value)}
                  component={ReInput}
                />
              )
          }
        })}
        <Field
          name="collection"
          label="Collection"
          dataList={this.props.collectionList}
          listName="collections"
          component={ReInputCombo}
        />
      </>
    )
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
            <h3>What would you like to add?</h3>
            <div className="inputs">
              <Field
                name="attribute_type"
                label="Attribute Type"
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
              disabled={this.props.pristine}
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    attrTypes: state.attributeState.types,
    collectionList: Object.keys(state.userState.collections),
    loading: state.attributeState.loading
  }
}

const createAttributeForm = reduxForm({
  form: 'createAttribute'
})(ReCreateAttribute)

export default connect(
  mapStateToProps,
  { addAttribute }
)(createAttributeForm)
