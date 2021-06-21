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
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  Platform
} from 'react-native'
import MapView, { AnimatedRegion, Callout, Marker } from 'react-native-maps'
import HTML, {
  HTMLElementModel,
  HTMLContentModel
} from 'react-native-render-html'
import { Modalize } from 'react-native-modalize'
import * as S from './styles'

import theme from '../../styles/theme'
import { PropsNavigate } from '../../router'
import useForm from '../../hooks/useForms'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Text from '../../components/Text'
import MarkerCustom from '../../components/Marker'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import Drawer from '../../components/Drawer'

const customHTMLElementModels = {
  bluecircle: HTMLElementModel.fromCustomModel({
    tagName: 'bluecircle',
    mixedUAStyles: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignSelf: 'center',
      backgroundColor: 'blue'
    },
    contentModel: HTMLContentModel.block
  })
}

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
      <Drawer nameScreen="Hemocentros">
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
      </Drawer>
    )
  }

  if (error) {
    return <Text text={`Error ${error.message}`} />
  }

  return (
    <Drawer nameScreen="Hemocentros">
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
            onClear={() => getLocale('')}
            value={search.value}
            containerStyle={{
              backgroundColor: theme.theme_colors.back
            }}
          />
          <FlatList
            keyExtractor={(i, index) => parseInt(index)}
            data={searchList}
            ItemSeparatorComponent={({ item, index }) => {
              return <Text key={`index-${index}`} text="OK" />
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
                <Text text={item.name} />
              </TouchableOpacity>
            )}
          />
        </Animated.View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <MapView
            style={{
              zIndex: -1,
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
              <Text text="Carregando..." />
            ) : (
              data.centroHospitalars.map(
                ({ id, latitude, longitude, ...props }, index) => {
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
                      calloutOffset={{ x: -8, y: 28 }}
                      calloutAnchor={{ x: 0.5, y: 0.4 }}
                    >
                      <MarkerCustom {...props} />
                      {/* <Callout>
                      <MarkerCustom

                      />
                    </Callout> */}
                    </Marker>
                  )
                }
              )
            )}
          </MapView>
        </View>
        <Modalize
          ref={modalizeRef}
          snapPoint={500}
          HeaderComponent={
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 3
              }}
            >
              <Avatar
                /* containerStyle={{ marginRight: 20 }} */
                rounded
                source={{
                  uri: `http://5.183.8.1:1337${data?.centroHospitalars[index]?.avatar?.url}`
                }}
              />
              <View
                style={{
                  marginRight: 40,
                  marginLeft: 20
                }}
              >
                <Text
                  text={data.centroHospitalars[index].name}
                  size="xlarge"
                  color="white"
                />
              </View>
              <View
                style={{ backgroundColor: '#fff', height: 10, width: 60 }}
              />
            </View>
          }
          handleStyle={{
            backgroundColor: theme.theme_colors.primary,
            width: 200
          }}
          modalStyle={{
            backgroundColor: theme.theme_colors.back,
            borderColor: theme.theme_colors.orange,
            borderWidth: 1,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            padding: 20
          }}
        >
          {loading ? (
            <Text text="Carregando..." />
          ) : (
            <>
              <HTML
                customHTMLElementModels={customHTMLElementModels}
                source={{
                  html: `<body style="color: #fff">
                ${data.centroHospitalars[index].description}</body>`
                }}
                contentWidth={contentWidth}
              />
              {/* <Text text={data.centroHospitalars[index].number} color="white" />
            <Text text={data.centroHospitalars[index].street} color="white" />
            <Text
              text={data.centroHospitalars[index].telephone1}
              color="white"
            />
            <Text
              text={data.centroHospitalars[index].telephone2}
              color="white"
            /> */}
              {/* <FlatList data={data.centroHospitalars[index]}/> */}
            </>
          )}
        </Modalize>
      </>
    </Drawer>
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
