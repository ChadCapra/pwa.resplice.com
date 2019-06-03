import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { verifyAttribute, resendAttributeVerification } from '../../actions'

import ReInputCode from '../Input/ReInputCode'
import ReButton from '../Buttons/ReButton'

const ReVerifyAttribute = ({
  attribute,
  onVerify,
  verifyObject,
  verifying,
  verifyAttribute
}) => {
  return (
    <div className="re-verify-attribute">
      <p className="re-verify-attribute-name">{attribute.name}</p>

      <ReButton
        type="primary"
        text="Resend Token"
        loading={verifying}
        onClick={() => resendAttributeVerification(attribute.uuid)}
      />

      <div className="inputs">
        <ReInputCode
          name="verify_token"
          label="Verification Token"
          onComplete={code => verifyAttribute(attribute.uuid, code)}
          loading={verifying}
          verified={Object.entries(verifyObject).length > 0}
          focus
        />
      </div>
    </div>
  )
}

ReVerifyAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  onVerify: PropTypes.func.isRequired,
  verifyObject: PropTypes.object,
  verifying: PropTypes.bool,
  verifyAttribute: PropTypes.func.isRequired,
  resendAttributeVerification: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    verifyObject: state.attributeState.verify,
    verifying: state.attributeState.loading
  }
}

export default connect(
  mapStateToProps,
  { verifyAttribute, resendAttributeVerification }
)(ReVerifyAttribute)
