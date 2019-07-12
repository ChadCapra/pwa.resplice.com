import React, { FC } from 'react'
import ReHeader from '../Header/ReHeader'
import ReAvatarLoading from './ReAvatarLoading'
import ReCardListLoading from './ReCardListLoading'

interface Props {
  group: boolean
}

const ReProfileLoading: FC<Props> = ({ group }) => {
  return (
    <div className="view">
      {group ? (
        <ReHeader menus={['Members', 'Group', 'Shares']} exitRoute={'/'} />
      ) : (
        <ReHeader menus={['Contact', 'Shares']} exitRoute={'/'} />
      )}

      <div className="view-body">
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
      </div>
    </div>
  )
}

export default ReProfileLoading
