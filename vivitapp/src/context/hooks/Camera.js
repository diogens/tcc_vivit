import React from 'react'

export default function DatePiker() {
  const [filesGallery, setFilesGallery] = React.useState([])

  return { filesGallery, setFilesGallery }
}
