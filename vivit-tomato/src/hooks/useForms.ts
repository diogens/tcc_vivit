import React from 'react'

const types = {
  email: {
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    message: 'Preencha um email válido'
  },

  telefone: {
    regex: /^[0-9]{2}-[0-9]{4}-[0-9]{4}$/,
    message: 'Preencha um telefone válido'
  },

  celular: {
    regex: /^[0-9]{2}-[0-9]{4}-[0-9]{4}$/,
    message: 'Preencha um celular válido'
  },

  cep: {
    regex: /^\d{5}-\d{3}$/,
    message: 'Preencha um cep válido'
  },

  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
    message: 'Preencha um cpf válido'
  },

  cnpj: {
    regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
    message: 'Preencha um cnpj válido'
  },

  cpfCnpj: {
    regex: /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
    message: 'Preencha um cep ou cnpj válido'
  }
}

const mask = {
  cpf(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },
  cnpj(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },
  telefone(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },
  cep(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }
}

const useForm = (type) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(null)

  function valid(value) {
    if (type === false) {
      return true
    }
    if (value.length === 0) {
      setError('Campo vazio!')
      return false
    }
    if (type === 'cpf') {
      setValue(mask.cpf(value))
    }
    if (type === 'telefone') {
      setValue(mask.telefone(value))
    }
    if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message)
    } else {
      setError('')
      return true
    }
  }

  function onChangeText(value) {
    if (error) valid(value)
    setValue(value)
    /* console.log('aqui=>>', { ...target }) */
  }

  return {
    value,
    error,
    setValue,
    setError,
    onChangeText,
    onBlurText: () => valid(value),
    valid: () => valid(value)
    /* masked: () => masked(value), */
  }
}

export default useForm
