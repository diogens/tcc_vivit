import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import MapView from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import { Marker } from '../../components'
import { Modalize } from 'react-native-modalize'
import { customStyle } from '../../ultils/stylemap'

/* import * as S from './styles' */

export const Map = () => {
  const modalizeRef = React.useRef(null)

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  const [establishments, setEstablishments] = React.useState([
    {
      id: 1,
      endereco: 'Caseb, Feira de Santana - BA, 44069-010',
      descricao: 'Putero',
      nome: 'Brega de Alaide',
      latitude: -12.2401308,
      longitude: -38.9280337
    },
    {
      id: 2,
      endereco: 'r, R. Calamar, 1498 - Conceição, Feira de Santana - BA',
      descricao: 'Putero',
      nome: "condomínio vivendas rio d'ouro",
      latitude: -12.2363547,
      longitude: -38.9330045
    },
    {
      id: 3,
      endereco: 'Caseb, Feira de Santana - BA, 44069-010',
      descricao:
        'Casamentos, aniversários, formaturas e outros eventos especiais, em casa com piscina, palco, boate e mais.',
      nome: 'Brega de Alaide',
      latitude: -12.2360146,
      longitude: -38.9344779
    },
    {
      id: 4,
      endereco: 'Caseb, Feira de Santana - BA, 44069-010',
      descricao: 'Putero',
      nome: 'Brega de Alaide',
      latitude: -12.2401308,
      longitude: -38.9280337
    }
  ])
  const [currentRegion, setCurrentRegion] = React.useState(null)

  /* Captura posição do user */
  React.useEffect(() => {
    async function loadingInitPosition() {
      const { granted } = await requestPermissionsAsync()

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })

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

  function handleRegionChanged(region) {
    setCurrentRegion(region)
  }

  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        region={currentRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
        customMapStyle={customStyle}
      >
        {establishments.map(
          ({ id, endereco, descricao, nome, latitude, longitude }) => (
            <Marker
              onPress={() => onOpen()}
              key={id}
              coordinate={{
                longitude: parseFloat(longitude),
                latitude: parseFloat(latitude)
              }}
              address={endereco}
              description={descricao}
              title={nome}
            />
          )
        )}
      </MapView>
      <Modalize
        ref={modalizeRef}
        snapPoint={500}
        HeaderComponent={<Text>Title</Text>}
      >
        <Text>carregando...</Text>
      </Modalize>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
