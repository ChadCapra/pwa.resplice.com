import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSessions, logout } from '../../state/actions'

import './settings.scss'

const ReSessions = ({ loading, sessions, error, fetchSessions, logout }) => {
  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  if (loading || !sessions) return 'loading'
  return (
    <div className="re-sessions">
      {sessions.list.map(session => (
        <div key={session.access_token} className="session">
          {session.access_token}
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.userState.loading,
    sessions: state.userState.settings.sessions,
    error: state.userState.error
  }
}

ReSessions.propTypes = {
  loading: PropTypes.bool,
  sessions: PropTypes.object,
  error: PropTypes.object,
  fetchSessions: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { fetchSessions, logout }
)(ReSessions)
