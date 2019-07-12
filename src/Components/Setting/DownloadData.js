import React from 'react'

import ReButton from '../Button/ReButton'

const DownloadData = ({ downloadData }) => {
  return (
    <div className="flex-col--center" style={{ padding: '15px' }}>
      <p>
        Downloading your data will give you a copy of all of your attributes you
        have added to your account.
        <br />
        <br />
        This will not give you any contact or group information, as it is not
        your data, but your contact's or group's data.
      </p>

      <ReButton type="primary" onClick={downloadData}>
        Download Data
      </ReButton>
    </div>
  )
}

export default DownloadData
