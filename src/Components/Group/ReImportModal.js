import React from 'react'

const providers = [
  {
    id: 1,
    name: 'Google',
    iconPath: ''
  },
  {
    id: 2,
    name: 'iCloud',
    iconPath: ''
  },
  {
    id: 3,
    name: 'Outlook',
    iconPath: ''
  }
]

const ReImportModal = ({ onImport }) => {
  const handleImport = id => {
    switch (id) {
      case 1:
        break
      case 2:
        break
      case 3:
        break
      default:
    }
  }

  return (
    <div className="re-import-modal">
      {providers.map(provider => (
        <div
          key={provider.id}
          className="import-item"
          onClick={() => handleImport(provider.id)}
        >
          <div className="import-item-icon" />
          <div className="import-item-text">Import from {provider.name}</div>
        </div>
      ))}
    </div>
  )
}

export default ReImportModal
