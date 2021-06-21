import React from 'react'
import * as S from './styles'
import { ListItem, Button, Avatar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import theme from '../../styles/theme'
import { View } from 'react-native'
import { Divider } from 'react-native-paper'

export type AccordionProps = {
  title: string
  content: {
    nome?: string
    uri?: string
    hemocentro?: string
    tipoSangue?: string
    status?: boolean
    solicitante?: string
    cpf?: string
    endereco?: string
    numero?: string
    telefone?: string
    dataAgendamento?: string
  }
}

const Accordion = ({ title, content }: AccordionProps) => {
  const [explaned, setExplaned] = React.useState(false)

  return (
    <ListItem.Accordion
      containerStyle={{
        backgroundColor: theme.theme_colors.yellow1,
        borderRadius: 4,
        borderBottomColor: theme.theme_colors.white,
        borderBottomWidth: 1
      }}
      isExpanded={explaned}
      onPress={() => setExplaned(!explaned)}
      content={
        <>
          <View
            style={{
              backgroundColor: content?.status
                ? 'green'
                : theme.theme_colors.primary,
              borderRadius: 50,

              padding: 4
            }}
          >
            <Avatar rounded source={{ uri: content?.uri }} />
          </View>
          <ListItem.Content style={{ marginLeft: 20 }}>
            <ListItem.Title>{title}</ListItem.Title>
            <ListItem.Subtitle>
              Agendado: {content.dataAgendamento}
            </ListItem.Subtitle>
          </ListItem.Content>
        </>
      }
    >
      <ListItem
        containerStyle={{ backgroundColor: theme.theme_colors.yellow1 }}
      >
        <ListItem.Content>
          <ListItem.Title>DOADOR</ListItem.Title>
          <ListItem.Subtitle>NOME: {content.nome}</ListItem.Subtitle>
          <ListItem.Subtitle>CPF: {content.cpf}</ListItem.Subtitle>
          <Divider
            style={{
              width: '80%',
              margin: 5,
              backgroundColor: theme.theme_colors.tomato
            }}
          />
          <ListItem.Title>HEMOCENTRO</ListItem.Title>
          <ListItem.Subtitle>TELEFONE: {content.telefone}</ListItem.Subtitle>
          <ListItem.Subtitle>ENDEREÇO: {content.endereco}</ListItem.Subtitle>
          <ListItem.Subtitle>Nº: {content.numero}</ListItem.Subtitle>
          <ListItem.Subtitle>
            STATUS DO ATENDIMENTO: {content.status ? 'CONCLUIDO' : 'ABERTO'}
          </ListItem.Subtitle>
        </ListItem.Content>
        <View
          style={{
            backgroundColor: content?.status
              ? 'green'
              : theme.theme_colors.primary,
            borderRadius: 50,
            margin: 10,
            padding: 10
          }}
        >
          <AntDesign
            size={30}
            name={content?.status ? 'check' : 'clockcircleo'}
          />
        </View>
      </ListItem>
    </ListItem.Accordion>
  )
}

export default Accordion
