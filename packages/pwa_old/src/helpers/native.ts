export const imagePrompt = (setImgData: (img: File) => void) => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.setAttribute('hidden', '')
  input.setAttribute('style', 'display: none')
  input.addEventListener(
    'change',
    (e: any) => {
      e.preventDefault()
      setImgData(e.target.files[0])
    },
    false
  )
  document.body.appendChild(input)
  input.click()
  document.body.removeChild(input)
}

export const videoStream = async (contraints: MediaStreamConstraints) => {
  return await navigator.mediaDevices.getUserMedia(contraints)
}
