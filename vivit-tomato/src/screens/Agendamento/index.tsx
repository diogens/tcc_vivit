import React from 'react'
import {
  View,
  FlatList,
  ActivityIndicator,
  Modal,
  Pressable,
  Picker,
  Image
} from 'react-native'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { AntDesign, EvilIcons } from '@expo/vector-icons'

import { useQuery, useMutation } from '@apollo/client'
import { MUTATION_AGENDAMENTO } from '../../graphql/mutations/agendamento'
import { QUERY_AGENTAMENTOS } from '../../graphql/queries/agendamentos'
import { QueryAgendamentos } from '../../graphql/generated/QueryAgendamentos'

import Text from '../../components/Text'
import Input from '../../components/Input'

import { PropsNavigate } from '../../router'
import theme from '../../styles/theme'
import useForm from '../../hooks/useForms'
import * as S from './styles'

import moment from 'moment'

const Agendamento = ({ navigation }: PropsNavigate) => {
  const { data, loading, refetch, error } = useQuery<QueryAgendamentos>(
    QUERY_AGENTAMENTOS
  )

  const [agendamento, { loading: updating, error: updateError }] = useMutation(
    MUTATION_AGENDAMENTO
  )

  moment.locale('pt-br')

  const name = useForm('email')
  const cpf = useForm('cpf')
  const sangue = useForm('tipoAB1')
  const date = useForm('java')

  const [modalVisible, setModalVisible] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const [type] = React.useState([
    { sangue: 'tipoAB1' },
    { sangue: 'tipoAB2' },
    { sangue: 'tipoA1' },
    { sangue: 'tipoA2' },
    { sangue: 'tipoB1' },
    { sangue: 'tipoB2' },
    { sangue: 'tipoO1' },
    { sangue: 'tipoO2' }
  ])

  async function saveAgendamento() {
    const response = await agendamento({
      variables: {
        input: {
          data: {
            nome: name.value,
            status: true,
            date: '2021-06-14T15:00:00.000Z',
            cpf: cpf.value,
            tipoSangue: 'tipoAB1'
          }
        }
      }
    })

    try {
      setModalVisible(!modalVisible)
      alert('Salvooo')
      refreshList()
      return response
    } catch (error) {
      return
    }
  }

  async function refreshList() {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: theme.theme_colors.back
        }}
      >
        <ActivityIndicator color={theme.theme_colors.primary} size={300} />
      </View>
    )
  }
  if (error) {
    return <Text text={`Error {error?.message}`}></Text>
  }

  if (modalVisible === true) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22
          }}
        >
          <Pressable
            style={{
              borderRadius: 20,
              padding: 15,
              marginBottom: -20,
              elevation: 10,
              backgroundColor: '#2196F3'
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign name="close" color="#fff" size={20} />
          </Pressable>
          <View
            style={{
              flex: 1,
              width: '90%',
              marginBottom: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5
            }}
          >
            <Text text="Novo Agendamento" size="xxlarge" />

            <ScrollView>
              <Input
                placeholder="Nome"
                keyboardType="default"
                icon="email"
                {...name}
              />
              <Input
                placeholder="CPF"
                keyboardType="default"
                icon="email"
                {...cpf}
              />

              <Picker
                selectedValue={sangue.value}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>
                  date.setValue(itemValue)
                }
              >
                {type.map((item, index) => {
                  return (
                    <Picker.Item key={index} label={item.sangue} value="java" />
                  )
                })}
              </Picker>

              <Pressable
                style={{
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: '#2196F3'
                }}
                onPress={() => saveAgendamento()}
              >
                <Text text="Agendar" />
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </>
    )
  }

  return (
    <S.Wrapper>
      <Text text="Agendamentos" size="xxxlarge" color="white" />
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          width: 70,
          height: 70,
          borderRadius: 70,
          backgroundColor: theme.theme_colors.tomato,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10
        }}
      >
        <EvilIcons name="calendar" size={50} color="#fff" />
      </TouchableOpacity>
      <FlatList
        data={data?.agendamentos}
        onRefresh={refreshList}
        refreshing={refreshing}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          return (
            <S.Card key={`index-${item.id}`} status={item?.status}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 40,
                    marginRight: 30,
                    marginBottom: 10
                  }}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                  }}
                />
                <Text text={item?.centro?.name} size="xlarge" color="white" />
              </View>
              <Card.Divider />
              <Text
                text={moment(item?.date).format('LLLL')}
                size="small"
                color="white"
              />
              <Text
                text={'RUA: ' + item?.centro?.street}
                size="small"
                color="white"
              />
              <Text text={'DOADOR: ' + item?.nome} size="small" color="white" />
              <Text text={'CPF: ' + item?.cpf} size="small" color="white" />
            </S.Card>
          )
        }}
      />
    </S.Wrapper>
  )
}

export default Agendamento
