import React from 'react'

const CardLoading = () => {
  return (
    <div className="card loading">
      <h1 className="card-header loading" style={{ height: '25px' }} />
      <div style={{ height: '75px' }} />
    </div>
  )
}

const ReCardListLoading = () => {
  return (
    <>
      {[1, 2, 3].map(card => (
        <CardLoading key={card} />
      ))}
    </>
  )
}

export default ReCardListLoading
