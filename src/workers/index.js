export default class RespliceWorker {
  constructor(type) {
    switch (type) {
      case 'contact':
        this.worker = new Worker('contactWorker.js')
        break
      case 'group':
        this.worker = new Worker('groupWorker.js')
        break
      case 'user':
        this.worker = new Worker('userWorker.js')
        break
      default:
        throw new Error('Worker type must be specified')
    }
  }

  updateCache = () => {
    this.worker.postMessage('fetch')
  }
}
