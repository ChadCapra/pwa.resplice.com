import React from 'react'

import MdSearch from 'react-ionicons/lib/MdSearch'

const ReSearch = () => {
  return (
    <div className="re-input-search">
      <MdSearch color="#1bbc9b" fontSize="2.5em" />
      <label className="re-input-label">Resplice</label>
      <input name="search" className="re-field" type="text" />
    </div>
  )
}

export default ReSearch
