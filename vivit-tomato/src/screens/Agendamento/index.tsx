import React from 'react'
import * as S from './styles'
import { Text, View, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const data = [
  {
    id: 1,
    hemocentro: 'Hosp..',
    rua: 'blblabl',
    telefone: '12313123',
    horaMarcada: '10:30',
    data: '30/10/2020'
  },
  {
    id: 2,
    hemocentro: 'Hosp..',
    rua: 'blblabl',
    telefone: '12313123',
    horaMarcada: '10:30',
    data: '30/10/2020'
  },
  {
    id: 3,
    hemocentro: 'Hosp..',
    rua: 'blblabl',
    telefone: '12313123',
    horaMarcada: '10:30',
    data: '30/10/2020'
  },
  {
    id: 4,
    hemocentro: 'Hosp..',
    rua: 'blblabl',
    telefone: '12313123',
    horaMarcada: '10:30',
    data: '30/10/2020'
  },
  {
    id: 5,
    hemocentro: 'Hosp..',
    rua: 'blblabl',
    telefone: '12313123',
    horaMarcada: '10:30',
    data: '30/10/2020'
  },
  {
    id: 6,
    hemocentro: 'Hosp..',
    rua: 'blblabl',
    telefone: '12313123',
    horaMarcada: '10:30',
    data: '30/10/2020'
  }
]

const Agendamento = () => (
  <S.Wrapper>
    <Text>Agendamentos</Text>
    <TouchableOpacity>
      <Text>+ Novo Agendamento</Text>
    </TouchableOpacity>
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => {
        return (
          <View
            key={`index-${item.id}`}
            style={{
              width: '100%',
              backgroundColor: '#eee',
              margin: 5,
              padding: 5
            }}
          >
            <Text>Nome do Hemocentro: {item.hemocentro}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Hora: {item.horaMarcada}</Text>
            <Text>Rua: {item.rua}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <TouchableOpacity>
              <Text>Remover Agendamento</Text>
            </TouchableOpacity>
          </View>
        )
      }}
    />
  </S.Wrapper>
)

export default Agendamento
