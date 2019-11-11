import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  verifyAttribute,
  resendAttributeVerification
} from '../../state/actions'

import TypeCard from '../Card/TypeCard'
import ReInputCode from '../Form/ReInputCode'
import ReButton from '../Button/ReButton'

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
  if (verifyObject) onVerify()

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
            verified={verifyObject}
            error={!!error}
            focus
          />
        </div>

        <ReButton
          type="primary"
          loading={verifying}
          onClick={() => resendAttributeVerification(attribute.uuid)}
        >
          Resend Token
        </ReButton>
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
