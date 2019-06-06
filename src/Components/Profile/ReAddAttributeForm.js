import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { addAttribute } from '../../actions'

import AttributeTypeCard from '../Cards/AttributeTypeCard'
import ReInput from '../Input/ReInput'
import ReInputPhone from '../Input/ReInputPhone'
import ReInputCombo from '../Input/ReInputCombo'
import ReInputCountry from '../Input/ReInputCountry'
import ReInputRegion from '../Input/ReInputRegion'
import ReButton from '../Buttons/ReButton'

class ReAddAttributeForm extends Component {
  onSubmit = ({ attribute_type, collection, name, ...formValues }) => {
    let attributeAdd = {
      attribute_type_id: this.props.attrType.id,
      name,
      collection,
      value: {
        ...formValues
      }
    }
    this.props.addAttribute(attributeAdd).then(this.props.onAttributeAdd)
  }

  formatLabel = label => {
    let newLabel = label.split('_')
    for (let i = 0; i < newLabel.length; i++) {
      newLabel[i] =
        newLabel[i].charAt(0).toUpperCase() + newLabel[i].substring(1)
    }
    return newLabel.join(' ')
  }

  render() {
    return (
      <>
        <AttributeTypeCard
          className="attribute-preview-card"
          item={this.props.attrType}
          onClick={this.props.onCardClick}
          previewValues={this.props.formValues}
        />
        <div className="add-attribute-body">
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="add-attribute-form"
          >
            <div className="inputs">
              <Field
                name="collection"
                label="Collection"
                dataList={this.props.collectionList}
                listName="collections"
                component={ReInputCombo}
              />
              <Field name="name" type="text" label="Name" component={ReInput} />

              {Object.keys(this.props.attrType.preview_value).map(
                (value, idx) => {
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
                }
              )}
            </div>

            <ReButton
              type="primary"
              text={`Add ${this.props.attrType.name}`}
              width="250px"
              loading={this.props.loading}
              disabled={this.props.pristine}
            />
          </form>
        </div>
      </>
    )
  }
}

const selector = formValueSelector('addAttribute')
const mapStateToProps = (state, ownProps) => {
  return {
    formValues: getFormValues('addAttribute')(state),
    country: selector(state, 'country'),
    collectionList: Object.keys(state.userState.collections),
    initialValues: { collection: ownProps.attrType.default_collection }
  }
}

const AddAttributeForm = reduxForm({
  form: 'addAttribute'
})(ReAddAttributeForm)

export default connect(
  mapStateToProps,
  { addAttribute }
)(AddAttributeForm)
