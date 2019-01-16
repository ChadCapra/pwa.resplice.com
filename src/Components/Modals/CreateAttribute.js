import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import ReInput from '../Input/ReInput'
import ReInputDropdown from '../Input/ReInputDropdown'
import ReInputCombo from '../Input/ReInputCombo'
import ReButton from '../Buttons/ReButton'

class createAttribute extends Component {
  state = {
    attrType: this.props.attrTypes[0]
  }

  onSubmit = formValues => {
    console.log('Submitted', formValues)
  }

  renderFields() {
    return (
      <>
        <Field name="attribute_name" label="Name" component={ReInput} />
        {this.state.attrType.parts.map((part, idx) => {
          return (
            <Field key={idx} name={part} label={part} component={ReInput} />
          )
        })}
        <Field
          name="attribute_collection"
          label="Collection"
          dataList={this.props.collectionsList}
          listName="collections"
          component={ReInputCombo}
        />
      </>
    )
  }

  handleTypeChange = (e, value) => {
    this.setState({
      attrType: this.props.attrTypes.find(type => type.value === value)
    })
  }

  render() {
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
            onChange={this.handleTypeChange}
          />
          {this.props.dirty && this.renderFields()}
        </div>
        <ReButton type="primary" text="Add" width="250px" />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    attrTypes: state.attributes.types,
    collectionsList: Object.keys(state.attributes.collections)
  }
}

const createAttributeForm = reduxForm({
  form: 'createAttribute'
})(createAttribute)

export default connect(mapStateToProps)(createAttributeForm)
