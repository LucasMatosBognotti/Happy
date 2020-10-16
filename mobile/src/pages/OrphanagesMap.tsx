import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../assets/map-marker.png';
import api from '../services/api';

interface Images {
  id: number;
  path: string;
}

interface Orphanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Images[];
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
    }, [])
  );
  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -20.5375169,
          longitude: -47.4000366,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{`${orphanages.length} orfanatos encontrados`}</Text>
        
        <RectButton style={styles.createOrphamageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  calloutText: {
    color: '#0089A5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    height: 56,

    borderRadius: 20,
    paddingLeft: 24,
    backgroundColor: '#FFF',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    elevation: 10,
  },
  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito_700Bold'
  },
  createOrphamageButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#15C3D6',

    alignItems: 'center',
    justifyContent: 'center',
  }
});
