import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import MapEventCard from './MapEventCard';
import DUMMY_DATA from '../dummy/dummy_map_events.json';

interface Props {
    title?: string;
    style?: any;
    location?: { latitude: number; longitude: number };
}
/**
 * MapDiscovery Component
 *
 * @export
 * @param {Props} { title, style }
 * @returns
 */

const mapEvents = [
    {
        id: 1,
        title: 'Jazz Concert',
        type: 'Concert',
        match: 95,
        image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
        eventCount: 3,
    },
    {
        id: 2,
        title: 'Broadway Musical',
        type: 'Musical',
        match: 87,
        image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
        eventCount: 5,
    },
    {
        id: 3,
        title: 'Art Exhibition',
        type: 'Art',
        match: 82,
        image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
        eventCount: 2,
    },
];

export default function MapDiscovery({ title, location, style }: Props) {

    const { width, height } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <MapView
                style={[styles.map, { ...style }]}
                initialRegion={{
                    latitude: location?.latitude ?? 51.709082,
                    longitude: location?.longitude ?? 7.480058,
                    latitudeDelta: 0.095,
                    longitudeDelta: 0.095
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                mapType='satellite'
            >
                {
                    DUMMY_DATA.map(event => (
                        <Marker
                            key={event.id}
                            coordinate={{
                                latitude: event.lat,
                                longitude: event.lng,
                            }}
                            onPress={() => alert(`Pressed marker for event id: ${event.id}`)}
                            //title={event.title}
                        >
                            <MapEventCard
                                event={event}
                                position={{ top: 0, left: 0 }}
                                //onPress={() => setSelectedEvent(mapEvents[1].id)}
                            />
                        </Marker>
                    ))
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
    backgroundColor: "tomato",
    padding: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});