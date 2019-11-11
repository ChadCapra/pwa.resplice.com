import React from 'react'
import PropTypes from 'prop-types'

import StatusBar from '../Util/StatusBar'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

const ranksMap = {
  1: 'Rookie',
  25: 'Novice',
  50: 'Share Merchant',
  75: 'Social Advocate',
  100: 'Social Butterfly',
  125: 'Share Activist',
  150: 'Cardinal',
  200: 'Justicar',
  250: 'Social Sellsword',
  300: 'Share Guardian',
  350: 'Attribute Bandit',
  400: 'Social Vanguard',
  500: 'Attribute Inquisitor',
  600: 'The Captain',
  700: 'Royal Socialite',
  1000: 'Centurion',
  1500: 'Arch Valkyrie',
  2000: 'Divine Socialite',
  5000: 'Jeff Bezos of Shares'
}

const capNum = (num, min, max) => {
  return Math.max(min, Math.min(num, max))
}

const nextRank = totalShares => {
  const rank = Object.entries(ranksMap).find(rank => rank[0] > totalShares)
  return (
    <div className="rank-status">
      <Shield />
      <div className="rank-info">
        <div className="rank-info-text">
          <span className="rank-title">{rank[1]}</span>
          <span className="rank-shares">
            {capNum(totalShares, 0, rank[0])}/{rank[0]} Shares
          </span>
        </div>
        <StatusBar
          percent={capNum(Math.floor((totalShares / rank[0]) * 100), 0, 100)}
          color="#1BBC9B"
        />
      </div>
    </div>
  )
}

const ReUserRanks = ({ totalShares }) => {
  const filteredRanks = Object.entries(ranksMap).filter(
    rank => rank[0] <= totalShares
  )
  let title = ''
  if (!filteredRanks.length) {
    title = 'Peon'
  } else {
    title = filteredRanks[filteredRanks.length - 1][1]
  }
  return (
    <div className="re-user-ranks">
      <h1 className="rank-header">{title}</h1>
      <p className="total-share-text">{totalShares} Total Shares</p>
      {filteredRanks.map((rank, idx) => (
        <div key={idx} className="rank-status">
          <Shield />
          <div className="rank-info">
            <div className="rank-info-text">
              <span className="rank-title">{rank[1]}</span>
              <span className="rank-shares">
                {capNum(totalShares, 0, rank[0])}/{rank[0]} Shares
              </span>
            </div>
            <StatusBar
              percent={capNum(
                Math.floor((totalShares / rank[0]) * 100),
                0,
                100
              )}
              color="#1BBC9B"
            />
          </div>
        </div>
      ))}
      {nextRank(totalShares)}
    </div>
  )
}

ReUserRanks.propTypes = {
  totalShares: PropTypes.number.isRequired
}

export default ReUserRanks
