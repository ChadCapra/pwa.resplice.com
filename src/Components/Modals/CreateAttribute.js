import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import ReInput from '../Input/ReInput'
import ReInputDropdown from '../Input/ReInputDropdown'
import ReInputCombo from '../Input/ReInputCombo'

class createAttribute extends Component {
  onSubmit = formValues => {
    console.log('Submitted', formValues)
  }

  renderFields() {
    return (
      <>
        <Field name="attribute_name" label="Name" component={ReInput} />
        <Field name="attribute_value" label="Value" component={ReInput} />
        <Field
          name="attribute_collection"
          label="Collection"
          dataList={this.props.collectionsList}
          component={ReInputCombo}
        />
      </>
    )
  }

  render() {
    console.log(this.props)
    return (
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
          />
          {this.props.dirty && this.renderFields()}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  const collectionsList = []
  for (let col of state.attributes.collections.keys()) collectionsList.push(col)

  return {
    attrTypes: state.attributes.types,
    collectionsList
  }
}

const createAttributeForm = reduxForm({
  form: 'createAttribute'
})(createAttribute)

export default connect(mapStateToProps)(createAttributeForm)
