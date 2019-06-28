import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { editAttribute } from '../../state/actions'

import TypeCard from '../Card/TypeCard'
import ReInput from '../Form/ReInput'
import ReInputPhone from '../Form/ReInputPhone'
import ReInputCombo from '../Form/ReInputCombo'
import ReInputCountry from '../Form/ReInputCountry'
import ReInputRegion from '../Form/ReInputRegion'
import ReButton from '../Button/ReButton'

class ReEditAttribute extends Component {
  onSubmit = async ({ name, collection, ...formValues }) => {
    let attributeEdit = {
      uuid: this.props.uuid,
      name,
      collection,
      value: {
        ...formValues
      }
    }
    await this.props.editAttribute(attributeEdit)
    this.props.onEdit()
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
        <Field
          name="collection"
          label="Collection"
          listName="collections"
          dataList={collectionList}
          component={ReInputCombo}
        />
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
      </>
    )
  }

  render() {
    return (
      <div className="edit-attribute">
        <TypeCard
          className="attribute-preview-card"
          item={this.props.attrType}
          previewValues={this.props.formValues}
          onClick={() => {}}
        />
        <div className="edit-attribute-body">
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
      </div>
    )
  }
}

const selector = formValueSelector('editAttribute')
const mapStateToProps = (state, ownProps) => {
  const attribute = state.userState.attributes[ownProps.uuid]
  const attrType = state.userState.types[attribute.attribute_type_id]

  return {
    loading: state.attributeState.loading,
    collectionList: Object.keys(state.userState.collections),
    attribute,
    attrType,
    initialValues: {
      name: attribute.name,
      collection: attribute.collection,
      ...attribute.value
    },
    formValues: getFormValues('editAttribute')(state),
    country: selector(state, 'country')
  }
}

ReEditAttribute.propTypes = {
  uuid: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  attribute: PropTypes.object.isRequired,
  collectionList: PropTypes.array.isRequired,
  attrType: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  country: PropTypes.string,
  formValues: PropTypes.object,
  editAttribute: PropTypes.func.isRequired
}

const editAttributeForm = reduxForm({
  form: 'editAttribute'
})(ReEditAttribute)

export default connect(
  mapStateToProps,
  { editAttribute }
)(editAttributeForm)
