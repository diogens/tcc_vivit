import React from 'react'
import { useQuery } from '@apollo/client'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { QueryCentroHospitalars } from '../../graphql/generated/QueryCentroHospitalars'
import { QUERY_CENTRO_HOSPITALARS } from '../../graphql/queries/centroHospitars'
import { customStyle } from '../../styles/stylemap'
import {
  ActivityIndicator,
  StyleSheet,
  Animated,
  TextInput
} from 'react-native'
import {
  Button,
  View,
  Text,
  Dimensions,
  useWindowDimensions
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import HTML from 'react-native-render-html'
import { Modalize } from 'react-native-modalize'
import * as S from './styles'

import theme from '../../styles/theme'
import { PropsNavigate } from '../../router'
import Drawer from 'components/Drawer'

const Map = ({ navigation }: PropsNavigate) => {
  const {
    data,
    loading,
    error,
    networkStatus
  } = useQuery<QueryCentroHospitalars>(QUERY_CENTRO_HOSPITALARS)

  const contentWidth = useWindowDimensions().width

  const modalizeRef = React.useRef(null)
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const down = React.useRef(new Animated.Value(0)).current

  const [index, setIndex] = React.useState(0)
  const [search, setSearch] = React.useState('')
  const [currentRegion, setCurrentRegion] = React.useState({
    latitude: -12.2590293,
    longitude: -38.9556411,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  /* Captura posição do user */
  React.useEffect(() => {
    async function loadingInitPosition() {
      const { granted } = await requestPermissionsAsync()

      if (granted) {
        const { coords } = await getCurrentPositionAsync()

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }

    loadingInitPosition()
  }, [])

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true
    }).start()
  }

  React.useEffect(() => {
    fadeIn()
  })

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
    return <Text>Error {error.message}</Text>
  }

  return (
    <>
      <Animated.View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          zIndex: 2,
          opacity: fadeAnim
        }}
      >
        <Text style={{ padding: 10, fontSize: 18 }}> Rua Onde eu estou</Text>
        <TextInput
          style={{
            height: 40,
            margin: 12,
            backgroundColor: '#ddd',
            borderRadius: 6,
            padding: 10
          }}
          value={search}
          onChangeText={(text) => {
            setSearch(text)
          }}
        />
      </Animated.View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MapView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
          initialRegion={currentRegion}
          region={currentRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          customMapStyle={customStyle}
        >
          {loading ? (
            <Text>Carregando......</Text>
          ) : (
            data.centroHospitalars.map(({ id, latitude, longitude }, index) => {
              return (
                <Marker
                  onPress={() => {
                    onOpen()
                    setIndex(index)
                  }}
                  key={id}
                  coordinate={{
                    longitude: longitude,
                    latitude: latitude
                  }}
                />
              )
            })
          )}
        </MapView>

        <Modalize
          ref={modalizeRef}
          snapPoint={500}
          HeaderComponent={<Text>Title</Text>}
        >
          {loading ? (
            <Text>carregando...</Text>
          ) : (
            <>
              <Text>{data.centroHospitalars[index].name}</Text>
              <HTML
                classesStyles={{}}
                source={{ html: data.centroHospitalars[index].description }}
                contentWidth={contentWidth}
              />
              <Text>{data.centroHospitalars[index].number}</Text>
              <Text>{data.centroHospitalars[index].street}</Text>
              <Text>{data.centroHospitalars[index].telephone1}</Text>
              <Text>{data.centroHospitalars[index].telephone2}</Text>
            </>
          )}
        </Modalize>
      </View>
    </>
  )
}

export default Map
