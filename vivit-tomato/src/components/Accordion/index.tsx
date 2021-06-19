import React from 'react'
import * as S from './styles'
import { ListItem, Button, Avatar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import theme from '../../styles/theme'
import { View } from 'react-native'

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
      style={{ backgroundColor: theme.theme_colors.back, borderRadius: 20 }}
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
      <ListItem>
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
        <ListItem.Content>
          <ListItem.Subtitle>TELEFONE: {content.telefone}</ListItem.Subtitle>
          <ListItem.Subtitle>CPF: {content.cpf}</ListItem.Subtitle>
          <ListItem.Subtitle>ENDEREÇO: {content.endereco}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  )
}

export default Accordion