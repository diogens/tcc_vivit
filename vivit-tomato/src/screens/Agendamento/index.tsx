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
import { User } from '../../context/UserContext'
import { QUERY_LIST_CENTROS } from '../../graphql/queries/listCentros'
import { QueryCentroHospitalar } from '../../graphql/generated/QueryCentroHospitalar'

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

  const [agendamento, { loading: updating, error: updateError }] = useMutation(
    MUTATION_AGENDAMENTO
  )
  console.log('=>', user)
  /* moment.locale('pt-br') */

  const name = useForm('')
  const cpf = useForm('cpf')
  const sangue = useForm('')
  const date = useForm('java')
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

  React.useEffect(() => {
    /* signOut() */
  }, [])

  async function saveAgendamento() {
    if (cpf.valid() || name.valid() || sangue.valid() || centro.valid()) {
      const response = await agendamento({
        variables: {
          input: {
            data: {
              nome: name.value,
              status: true,
              date: '2021-06-14T15:00:00.000Z',
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
        return
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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
              }}
            >
              <Text text="Novo Agendamento" size="xxlarge" />
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
                keyboardType="default"
                icon="idcard"
                {...cpf}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 10
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
                  paddingVertical: 10
                }}
              >
                <AntDesign
                  color={theme.theme_colors.orange}
                  name="USB"
                  size={30}
                />
                <Picker
                  selectedValue={centro.value}
                  style={{ flex: 1, color: '#888' }}
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
              <View style={{ height: 30 }} />
            </ScrollView>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                padding: 10,
                elevation: 10,
                backgroundColor: '#2196F3',
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
                    uri: `http://5.183.8.1:1337${item?.centro?.avatar?.url}`
                  }}
                />
                <Text text={item?.centro?.name} size="xlarge" color="white" />
              </View>
              <Card.Divider />
              <Text
                text={`DATA MARCADA: ${moment(item?.date).format('LLL')}`}
                size="small"
                color="white"
              />
              <Text text={`CPF: ${item.cpf}`} size="small" color="white" />
              <Text
                text={'RUA: ' + item?.centro?.street}
                size="small"
                color="white"
              />
              <Text
                text={`N: ${item.centro.number}`}
                size="small"
                color="white"
              />
              <Text
                text={`TELEFONE: ${item.centro.telephone1}`}
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
