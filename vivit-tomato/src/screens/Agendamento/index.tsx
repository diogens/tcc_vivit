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
import { Card, Button, Icon, Overlay, ListItem } from 'react-native-elements'

import { AntDesign, EvilIcons } from '@expo/vector-icons'

import { useQuery, useMutation } from '@apollo/client'
import { MUTATION_AGENDAMENTO } from '../../graphql/mutations/agendamento'
import { QUERY_AGENTAMENTOS } from '../../graphql/queries/agendamentos'
import { QueryAgendamentos } from '../../graphql/generated/QueryAgendamentos'

import Text from '../../components/Text'
import Input from '../../components/Input'
import Accordion from '../../components/Accordion'

import { PropsNavigate } from '../../router'
import theme from '../../styles/theme'
import useForm from '../../hooks/useForms'
import * as S from './styles'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

import moment from 'moment'
import { User } from '../../context/UserContext'
import { QUERY_LIST_CENTROS } from '../../graphql/queries/listCentros'
import { QueryCentroHospitalar } from '../../graphql/generated/QueryCentroHospitalar'
import { QueryDatasDisponiveis } from '../../graphql/generated/QueryDatasDisponiveis'
import { QUERY_DATAS_DISPONIVEIS } from '../../graphql/queries/datasDisponiveis'

moment.locale('pt-br')

const Agendamento = ({ navigation }: PropsNavigate) => {
  const { message, signOut, user } = React.useContext(User)

  const { data, loading, refetch, error } = useQuery<QueryAgendamentos>(
    QUERY_AGENTAMENTOS,
    {
      variables: {
        user: user?.user?.id
      }
    }
  )

  const centroList = useQuery<QueryCentroHospitalar>(QUERY_LIST_CENTROS)

  const dataDisponibilidade = useQuery<QueryDatasDisponiveis>(
    QUERY_DATAS_DISPONIVEIS
  )

  const [agendamento, { loading: updating, error: updateError }] = useMutation(
    MUTATION_AGENDAMENTO
  )
  console.log('=>', user)
  /* moment.locale('pt-br') */

  const name = useForm('')
  const cpf = useForm('cpf')
  const sangue = useForm('')
  const date = useForm('')
  const centro = useForm('')

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

  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    /* signOut() */
  }, [])

  async function saveAgendamento() {
    if (
      cpf.valid() ||
      name.valid() ||
      sangue.value !== '' ||
      centro.value !== '' ||
      date.value !== ''
    ) {
      const response = await agendamento({
        variables: {
          input: {
            data: {
              nome: name.value,
              status: true,
              date: date.value,
              cpf: cpf.value,
              tipoSangue: sangue.value,
              centro: centro.value,
              users_permissions_user: user?.user?.id
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
        message({
          title: 'Erro 500',
          message: 'problemas tecnicos, tente novamente mais tarde',
          textBtn: 'Ok',
          action: () => console.log('ok')
        })
      }
    } else {
      message({
        title: 'Verifique os dados',
        message:
          'Dados informados podem está incomplentos, verifique por favor!,',
        textBtn: 'Ok',
        action: () => console.log('ok')
      })
    }
  }

  async function refreshList() {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  if (loading || updating) {
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
  if (error || updateError) {
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
              zIndex: 10,
              position: 'absolute',
              top: -20,
              right: 10,
              borderRadius: 20,
              padding: 20,
              marginBottom: -20,
              elevation: 30,
              backgroundColor: theme.theme_colors.primary
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
              backgroundColor: '#000',
              borderRadius: 10,
              padding: 20,
              shadowColor: '#fff',
              shadowOffset: {
                width: 0,
                height: 5
              },
              shadowOpacity: 0.44,
              shadowRadius: 20.32,
              borderWidth: 1,
              borderColor: theme.theme_colors.white,
              elevation: 15
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
              }}
            >
              <Text text="Novo Agendamento" size="xxlarge" color="white" />
            </View>

            <ScrollView>
              <Input
                placeholder="Nome"
                keyboardType="default"
                icon="user"
                {...name}
              />
              <Input
                placeholder="CPF"
                keyboardType="numeric"
                icon="idcard"
                {...cpf}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderColor: '#fff',
                  marginBottom: 25,
                  borderWidth: 1,
                  borderRadius: 10
                }}
              >
                <AntDesign
                  color={theme.theme_colors.orange}
                  name="USB"
                  size={30}
                />
                <Picker
                  selectedValue={sangue.value}
                  style={{ flex: 1, color: '#888' }}
                  onValueChange={(itemValue, itemIndex) =>
                    sangue.setValue(itemValue)
                  }
                >
                  {type.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.sangue}
                        value={item.sangue}
                      />
                    )
                  })}
                </Picker>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderColor: '#fff',
                  marginBottom: 25,
                  borderWidth: 1,
                  borderRadius: 10
                }}
              >
                <AntDesign
                  color={theme.theme_colors.orange}
                  name="USB"
                  size={30}
                />
                <Picker
                  selectedValue={centro.value}
                  style={{
                    flex: 1,
                    color: '#888'
                  }}
                  itemStyle={{
                    backgroundColor: 'grey',
                    color: 'blue',
                    fontFamily: 'Ebrima',
                    fontSize: 17
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    centro.setValue(itemValue)
                  }
                >
                  {centroList.data.centroHospitalars.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.id}
                      />
                    )
                  })}
                </Picker>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderColor: '#fff',
                  marginBottom: 25,
                  borderWidth: 1,
                  borderRadius: 10
                }}
              >
                <AntDesign
                  color={theme.theme_colors.orange}
                  name="USB"
                  size={30}
                />
                <Picker
                  selectedValue={date.value}
                  style={{
                    flex: 1,
                    color: '#888'
                  }}
                  itemStyle={{
                    backgroundColor: 'grey',
                    color: 'blue',
                    fontFamily: 'Ebrima',
                    fontSize: 17
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    date.setValue(itemValue)
                  }
                >
                  {dataDisponibilidade.data.datasDisponiveis.map(
                    (item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={moment(item.disponibilidade).format('LLLL')}
                          value={item.disponibilidade}
                        />
                      )
                    }
                  )}
                </Picker>
              </View>
              <View style={{ height: 30 }} />
            </ScrollView>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                padding: 10,
                elevation: 10,
                backgroundColor: theme.theme_colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => saveAgendamento()}
            >
              <Text text="Agendar" color="white" size="xxlarge" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }

  return (
    <S.Wrapper>
      {/* <Text text="Agendamentos" size="xxxlarge" color="white" /> */}
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          width: 50,
          height: 50,
          marginLeft: 20,
          borderRadius: 70,
          backgroundColor: theme.theme_colors.tomato,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20
        }}
      >
        <EvilIcons name="calendar" size={40} color="#fff" />
      </TouchableOpacity>
      <FlatList
        data={data?.agendamentos}
        onRefresh={refreshList}
        refreshing={refreshing}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => {
          return (
            <Accordion
              title={item?.centro?.name}
              content={{
                uri: `http://5.183.8.1:1337${item?.centro?.avatar?.url}`,
                dataAgendamento: moment(item?.date).format('LLL'),
                cpf: item.cpf,
                nome: item.nome,
                tipoSangue: item.tipoSangue,
                status: item.status,
                solicitante: item.users_permissions_user.username,
                telefone: item.centro.telephone1,
                numero: item.centro.number,
                endereco: item.centro.street
              }}
            />
          )
        }}
      />
    </S.Wrapper>
  )
}

export default Agendamento
