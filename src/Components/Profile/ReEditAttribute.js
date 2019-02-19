import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { editAttribute } from '../../actions'

import ReInput from '../Input/ReInput'
import ReInputCombo from '../Input/ReInputCombo'
import ReButton from '../Buttons/ReButton'

class ReEditAttribute extends Component {
  onSubmit = ({ name, collection, ...formValues }) => {
    let attributeEdit = {
      id: this.props.attribute.id,
      name,
      collection,
      details: {
        ...formValues
      }
    }
    this.props.editAttribute(attributeEdit).then(() => this.props.onEdit())
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
    const { attribute, collectionList } = this.props
    return (
      <>
        <Field name="name" label="Name" component={ReInput} />
        {Object.keys(attribute.details).map((detail, idx) => {
          return (
            <Field
              key={idx}
              name={detail}
              label={this.formatLabel(detail)}
              component={ReInput}
            />
          )
        })}
        <Field
          name="collection"
          label="Collection"
          dataList={collectionList}
          component={ReInputCombo}
        />
      </>
    )
  }

  render() {
    return (
      <div className="edit-attribute">
        <h1>Edit Attribute</h1>
        <p className="edit-attribute-type">{this.props.attrType.name}</p>
        <form
          className="edit-attribute-form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <div className="inputs">{this.renderFields()}</div>
          <ReButton
            type="primary"
            text="Save"
            width="250px"
            loading={this.props.loading}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const attrType = state.attributes.types.find(
    type => type.id === ownProps.attribute.attribute_type_id
  )
  return {
    loading: state.attributes.loading,
    collectionList: Object.keys(state.user.collections),
    attrType,
    initialValues: {
      name: ownProps.attribute.name,
      ...ownProps.attribute.details,
      collection: ownProps.attribute.collection
    }
  }
}

const editAttributeForm = reduxForm({
  form: 'editAttribute'
})(ReEditAttribute)

export default connect(
  mapStateToProps,
  { editAttribute }
)(editAttributeForm)
