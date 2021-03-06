import React from 'react'

export default function DatePiker() {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  async function getDate() {
    console.log('Date Selecionada')
  }

  return { date, setDate, getDate, mode, setMode, show, setShow }
}
