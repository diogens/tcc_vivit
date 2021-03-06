import React from 'react'

export default function Feed() {
  const [newsId, setNewsId] = React.useState('')

  async function getNewsId() {
    console.log('Id Selecionada')
  }

  return { newsId, setNewsId, getNewsId }
}
