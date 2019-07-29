import React, { useRef, useEffect } from 'react'

import MdSearch from 'react-ionicons/lib/MdSearch'

const ReSearch = ({ query, onChange, ...props }) => {
  const field = useRef()

  useEffect(() => {
    if (field.current) field.current.focus()
  }, [])

  return (
    <div
      className={`re-input-search${query ? ' re-input-search--filled' : ''}`}
      {...props}
    >
      <MdSearch color="#1bbc9b" fontSize="2.5em" />
      <label className="re-input-label">Who are you looking for?</label>
      <input
        name="search"
        className="re-field"
        type="text"
        value={query}
        onChange={e => onChange(e.target.value)}
        ref={field}
      />
    </div>
  )
}

export default ReSearch
