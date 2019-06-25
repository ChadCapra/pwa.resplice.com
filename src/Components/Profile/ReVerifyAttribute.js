import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { verifyAttribute, resendAttributeVerification } from '../../actions'

import TypeCard from '../Cards/TypeCard'
import ReInputCode from '../Input/ReInputCode'
import ReButton from '../Buttons/ReButton'

const ReVerifyAttribute = ({
  attribute,
  attrType,
  onVerify,
  verifyObject,
  verifying,
  error,
  verifyAttribute,
  resendAttributeVerification
}) => {
  const { collection, name, value } = attribute
  if (Object.entries(verifyObject).length) onVerify()

  return (
    <div className="verify-attribute">
      <TypeCard
        className="attribute-preview-card"
        item={attrType}
        previewValues={{ collection, name, value: Object.values(value) }}
        onClick={() => {}}
      />
      <div className="verify-attribute-body">
        <div className="inputs" style={{ marginBottom: '50px' }}>
          <ReInputCode
            name="verify_token"
            label="Verification Token"
            onComplete={code => verifyAttribute(attribute.uuid, code)}
            loading={verifying}
            verified={Object.entries(verifyObject).length > 0}
            error={!!error}
            focus
          />
        </div>

        <ReButton
          type="primary"
          text="Resend Token"
          loading={verifying}
          onClick={() => resendAttributeVerification(attribute.uuid)}
        />
      </div>
    </div>
  )
}

ReVerifyAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  attrType: PropTypes.object.isRequired,
  onVerify: PropTypes.func.isRequired,
  verifyObject: PropTypes.object,
  verifying: PropTypes.bool,
  error: PropTypes.object,
  verifyAttribute: PropTypes.func.isRequired,
  resendAttributeVerification: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const attribute = state.userState.attributes[ownProps.uuid]
  const attrType = state.userState.types[attribute.attribute_type_id]

  return {
    attrType,
    attribute,
    verifyObject: state.attributeState.verify,
    verifying: state.attributeState.loading,
    error: state.attributeState.error
  }
}

export default connect(
  mapStateToProps,
  { verifyAttribute, resendAttributeVerification }
)(ReVerifyAttribute)
