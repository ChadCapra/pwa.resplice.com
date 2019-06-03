import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { editAttribute } from '../../actions'

import ReInput from '../Input/ReInput'
import ReInputPhone from '../Input/ReInputPhone'
import ReInputCombo from '../Input/ReInputCombo'
import ReInputCountry from '../Input/ReInputCountry'
import ReInputRegion from '../Input/ReInputRegion'
import ReButton from '../Buttons/ReButton'

class ReEditAttribute extends Component {
  onSubmit = ({ name, collection, ...formValues }) => {
    let attributeEdit = {
      uuid: this.props.attribute.uuid,
      name,
      collection,
      value: {
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
        <Field name="name" type="text" label="Name" component={ReInput} />
        {Object.keys(attribute.value).map((value, idx) => {
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
          listName="collections"
          dataList={collectionList}
          component={ReInputCombo}
        />
      </>
    )
  }

  render() {
    return (
      <div className="edit-attribute">
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
            disabled={this.props.pristine}
          />
        </form>
      </div>
    )
  }
}

const selector = formValueSelector('editAttribute')
const mapStateToProps = (state, ownProps) => {
  const attrType = state.attributeState.types.find(
    type => type.id === ownProps.attribute.attribute_type_id
  )
  const country = selector(state, 'country')

  return {
    loading: state.attributeState.loading,
    collectionList: Object.keys(state.userState.collections),
    attrType,
    initialValues: {
      name: ownProps.attribute.name,
      ...ownProps.attribute.value,
      collection: ownProps.attribute.collection
    },
    country
  }
}

ReEditAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  collection: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  collectionList: PropTypes.array.isRequired,
  attrType: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  editAttribute: PropTypes.func.isRequired
}

const editAttributeForm = reduxForm({
  form: 'editAttribute'
})(ReEditAttribute)

export default connect(
  mapStateToProps,
  { editAttribute }
)(editAttributeForm)
