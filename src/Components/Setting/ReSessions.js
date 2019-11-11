import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ReButton from '../Button/ReButton'

import './settings.scss'

const ReSessions = ({
  userLoading,
  authLoading,
  sessions,
  fetchSessions,
  logout
}) => {
  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  if (userLoading || !sessions) return 'loading'

  const tokens = sessions.list.map(session => session.access_token)
  return (
    <div className="flex-col--center re-sessions">
      {sessions.list.map(session => (
        <div key={session.access_token} className="session">
          {session.access_token}
        </div>
      ))}

      <ReButton
        type="primary"
        loading={authLoading}
        onClick={() => logout(tokens)}
      >
        Logout
      </ReButton>
    </div>
  )
}

ReSessions.propTypes = {
  loading: PropTypes.bool,
  sessions: PropTypes.object,
  error: PropTypes.object,
  fetchSessions: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default ReSessions
