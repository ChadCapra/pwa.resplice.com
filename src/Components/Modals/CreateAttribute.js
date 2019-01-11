import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
// import { connect } from 'react-redux'
import ReInput from '../Input/ReInput'

class createAttribute extends Component {
  onSubmit = formValues => {
    console.log('Submitted')
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="create-attribute-form"
      >
        <div className="inputs">
          <Field
            name="full_name"
            placeholder="Enter Name"
            label="Full Name"
            type="text"
            component={ReInput}
          />
          <Field
            name="phone_or_email"
            type="text"
            label="Phone Number or Email"
            component={ReInput}
          />
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'createAttribute'
})(createAttribute)

// const createAttributeForm = reduxForm({
//   form: 'signUp'
// })(createAttribute)

// export default connect(
//   null,
//   { register }
// )(createAttributeForm)
