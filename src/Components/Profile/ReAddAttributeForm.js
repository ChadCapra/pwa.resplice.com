import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { addAttribute } from '../../state/actions'

import Card from '../Card/Card'
import Attribute from '../Card/Attribute'
import ReInput from '../Form/ReInput'
import ReInputPhone from '../Form/ReInputPhone'
import ReInputCombo from '../Form/ReInputCombo'
import ReInputCountry from '../Form/ReInputCountry'
import ReInputRegion from '../Form/ReInputRegion'
import ReButton from '../Button/ReButton'

class ReAddAttributeForm extends Component {
  onSubmit = async ({ attribute_type, collection, name, ...formValues }) => {
    let attributeAdd = {
      group_uuid: this.props.groupUuid,
      attribute_type_id: this.props.attrType.id,
      name,
      collection,
      value: {
        ...formValues
      }
    }
    await this.props.addAttribute(attributeAdd)
    this.props.onAttributeAdd()
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
    const attribute = {
      id: this.props.attrType.id,
      collection: this.props.attrType.default_collection,
      name: this.props.attrType.preview_name,
      value: this.props.attrType.preview_value,
      actions: this.props.attrType.actions
    }

    return (
      <>
        {/* <TypeCard
          className="attribute-preview-card"
          item={this.props.attrType}
          onClick={this.props.onCardClick}
          previewValues={this.props.formValues}
        /> */}
        <Card border onClick={this.props.onCardClick}>
          <Card.Header>
            <h1>{attribute.collection}</h1>
          </Card.Header>
          <Card.Body>
            <Attribute attribute={attribute} immutableActions noDropdown />
          </Card.Body>
        </Card>
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
              loading={this.props.loading}
              disabled={this.props.pristine}
            >{`Add ${this.props.attrType.name}`}</ReButton>
          </form>
        </div>
      </>
    )
  }
}

const selector = formValueSelector('addAttribute')
const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.attributeState.loading,
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
