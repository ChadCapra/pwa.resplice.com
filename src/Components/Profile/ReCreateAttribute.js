import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import ReInput from '../Input/ReInput'
import ReInputDropdown from '../Input/ReInputDropdown'
import ReInputCombo from '../Input/ReInputCombo'
import ReButton from '../Buttons/ReButton'
import ReHeader from '../Header/ReHeader'
import ReInputPhone from '../Input/ReInputPhone'

class ReCreateAttribute extends Component {
  state = {
    attrType: this.props.attrTypes[0],
    typeSelected: false
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
          name="collection"
          label="Collection"
          dataList={this.props.collectionsList}
          listName="collections"
          component={ReInputCombo}
        />
      </>
    )
  }

  handleTypeChange = (e, value) => {
    if (value) {
      this.setState({
        attrType: this.props.attrTypes.find(type => type.value === value),
        typeSelected: true
      })
    } else {
      this.setState({ typeSelected: false })
    }
  }

  render() {
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
              <ReInputPhone />
              {this.state.typeSelected && this.renderFields()}
            </div>
            <ReButton type="primary" text="Add" width="250px" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    attrTypes: state.attributes.types,
    collectionsList: Object.keys(state.user.collections)
  }
}

const createAttributeForm = reduxForm({
  form: 'createAttribute'
})(ReCreateAttribute)

export default connect(mapStateToProps)(createAttributeForm)
