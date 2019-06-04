import React, { Component } from 'react'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addAttribute } from '../../actions'

import AttributeCardList from '../Cards/AttributeCardList'
import AttributeTypeCard from '../Cards/AttributeTypeCard'
import ReInput from '../Input/ReInput'
import ReInputPhone from '../Input/ReInputPhone'
import ReInputCombo from '../Input/ReInputCombo'
import ReInputCountry from '../Input/ReInputCountry'
import ReInputRegion from '../Input/ReInputRegion'
import ReButton from '../Buttons/ReButton'
import ReHeader from '../Header/ReHeader'

class ReAddAttribute extends Component {
  state = {
    attrType: {},
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

  handleTypeChange = (attrType, cardIdx) => {
    const topPos = 120

    if (Object.keys(this.state.attrType) <= 0) {
      const cards = [...document.querySelectorAll('.card')]
      cards.forEach((card, idx) => {
        const posFromTop = topPos - card.getBoundingClientRect().y
        card.style.setProperty('--pixels-from-top', `${posFromTop}px`)
        card.classList.add('collapse-card')
        if (idx === cardIdx) {
          card.classList.add('top-card')
        }
      })
      setTimeout(() => {
        this.setState({
          attrType,
          typeSelected: true
        })
      }, 500)
    } else {
      this.setState({ typeSelected: false, attrType: {} }, () => {
        const cards = [...document.querySelectorAll('.card')]
        cards.forEach(card => {
          const posFromTop = topPos - card.getBoundingClientRect().y
          card.style.setProperty('--pixels-from-pos', `${posFromTop}px`)
          card.classList.add('expand-card')
          setTimeout(() => {
            card.classList.remove('expand-card')
          }, 500)
        })
      })
    }
  }

  renderFields() {
    return (
      <>
        <Field
          name="collection"
          label="Collection"
          dataList={this.props.collectionList}
          listName="collections"
          component={ReInputCombo}
        />
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
      </>
    )
  }

  render() {
    if (this.state.attributeAdded) {
      return <Redirect push to="/profile" />
    }

    return (
      <div className="add-attribute">
        <ReHeader menus={['Add Attribute']} exitRoute="/profile" />
        <div className="add-attribute-body">
          {!this.state.typeSelected && (
            <AttributeCardList
              type="types"
              ListComponent={AttributeTypeCard}
              onClick={this.handleTypeChange}
              animate={this.state.animateCards}
            />
          )}
          {this.state.typeSelected && (
            <>
              <AttributeTypeCard
                item={this.state.attrType}
                onClick={this.handleTypeChange}
                previewValues={this.props.formValues}
              />
              <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="add-attribute-form"
              >
                <div className="inputs">{this.renderFields()}</div>
                <ReButton
                  type="primary"
                  text="Add"
                  width="250px"
                  loading={this.props.loading}
                  disabled={this.props.pristine}
                />
              </form>
            </>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    attrTypes: state.attributeState.types,
    collectionList: Object.keys(state.userState.collections),
    loading: state.attributeState.loading,
    formValues: getFormValues('addAttribute')(state)
  }
}

const AddAttributeForm = reduxForm({
  form: 'addAttribute'
})(ReAddAttribute)

export default connect(
  mapStateToProps,
  { addAttribute }
)(AddAttributeForm)
