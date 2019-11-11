import React from 'react'
import ReAvatarLoading from './ReAvatarLoading'
import ReCardListLoading from './ReCardListLoading'

interface Props {
  group: boolean
}

const ReProfileLoading = ({ group }: Props) => {
  return (
    <div className="profile">
      <ReAvatarLoading />
      <div className="flex-col--center">
        <div
          className="profile-name loading"
          style={{ height: '25px', width: '200px', borderRadius: '10px' }}
        />
        <div
          className="profile-tags loading"
          style={{ height: '10px', width: '100px', borderRadius: '10px' }}
        />
      </div>
      <ReCardListLoading />
    </div>
  )
}

export default ReProfileLoading
