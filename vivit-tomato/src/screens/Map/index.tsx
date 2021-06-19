import React from 'react'
import { useQuery } from '@apollo/client'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { QueryCentroHospitalars } from '../../graphql/generated/QueryCentroHospitalars'
import { QUERY_CENTRO_HOSPITALARS } from '../../graphql/queries/centroHospitars'
import { customStyle } from '../../styles/stylemap'

import { SearchBar } from 'react-native-elements'
import { ActivityIndicator, Animated, FlatList, TextInput } from 'react-native'
import {
  Button,
  View,
  Text,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  Platform
} from 'react-native'
import MapView, { Marker, AnimatedRegion } from 'react-native-maps'
import HTML from 'react-native-render-html'
import { Modalize } from 'react-native-modalize'
import * as S from './styles'

import theme from '../../styles/theme'
import { PropsNavigate } from '../../router'
import useForm from '../../hooks/useForms'
import { TouchableOpacity } from 'react-native-gesture-handler'

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

  const [searchList, setSearchList] = React.useState([])
  const [index, setIndex] = React.useState(0)
  const [currentRegion, setCurrentRegion] = React.useState({
    latitude: -12.2590293,
    longitude: -38.9556411,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const search = useForm('')

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

  const getLocale = (value) => {
    search.setValue(value)
    const newData = data.centroHospitalars.filter((centro) => {
      const itemData = centro.name
        ? centro.name.toUpperCase()
        : ''.toUpperCase()

      const textData = value.toUpperCase()

      /* console.log(itemData.indexOf(textData) > -1) */
      /* console.log('Value', centro.name === search.value)
      console.log('Value', value) */
      return itemData.indexOf(textData) > -1
    })

    console.log(newData)
    setSearchList(newData)
  }

  const changeRegion = () => {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
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
    return <Text>Error {error.message}</Text>
  }

  return (
    <>
      <Animated.View
        style={{
          backgroundColor: theme.theme_colors.back,
          width: '100%',
          zIndex: 2,
          opacity: fadeAnim
        }}
      >
        <SearchBar
          platform="ios"
          placeholder="Encontre o seu Hemocentro"
          onChangeText={(text) => {
            getLocale(text)
          }}
          onClear={(text) => getLocale('')}
          value={search.value}
        />
        <FlatList
          keyExtractor={(i, index) => parseInt(index)}
          data={searchList}
          ItemSeparatorComponent={({ item, index }) => {
            return <Text key={`index-${index}`}>Ok</Text>
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                /* setCurrentRegion({
                  latitude: item?.latitude,
                  longitude: item?.longitude
                }) */
                changeRegion()
              }}
            >
              <Text style={styles.textStyle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MapView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
          onRegionChange={() => {
            changeRegion()
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
                  key={`$index-${id + index}`}
                  onPress={() => {
                    onOpen()
                    setIndex(index)
                  }}
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

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    color: '#fff',
    marginTop: Platform.OS == 'ios' ? 30 : 0
  },
  textStyle: {
    padding: 10,
    color: '#fff'
  }
})

export default Map
