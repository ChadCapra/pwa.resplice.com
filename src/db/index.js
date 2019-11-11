const RespliceDb = async () => {
  const request = await indexedDB.open('resplice_db', 1)
  request.onerror = () => {
    throw new Error('Cannot open IndexedDB')
  }
  request.onsuccess = () => {
    return request.result
  }
  request.onupgradeneeded = e => {
    const db = e.target.result

    const contactStore = db.createObjectStore('contacts', {
      keyPath: 'uuid',
      autoIncrement: false
    })
    const groupStore = db.createObjectStore('groups', {
      keyPath: 'uuid',
      autoIncrement: false
    })

    contactStore.createIndex('profile', 'profile', { unique: false })
    groupStore.createIndex('profile', 'profile', { unique: false })
  }
}

export default RespliceDb
