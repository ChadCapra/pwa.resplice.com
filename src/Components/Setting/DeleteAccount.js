import React from 'react'

import ReButton from '../Button/ReButton'

const DeleteAccount = ({ deleteAccount }) => {
  return (
    <div className="flex-col--center" style={{ padding: '15px' }}>
      <p style={{ textAlign: 'center' }}>
        Are you sure you want to delete your account?
        <br />
        <br />
        All of your data and attributes will be wiped, this action is
        irreversable.
      </p>
      <ReButton
        type="secondary"
        style={{ border: '1px solid #FF3860', color: '#FF3860' }}
        onClick={deleteAccount}
      >
        Delete Account
      </ReButton>
    </div>
  )
}

export default DeleteAccount
