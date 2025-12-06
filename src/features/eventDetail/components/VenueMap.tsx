import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HomeModelVenueDetail } from "@/features/event/types/homeModel";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";

export const VenueMap = ({ venue }: { venue: HomeModelVenueDetail }) => {

    if ((venue.location.latitude === 0) || (venue.location.longitude === 0)) 
        return null;

    const { latitude, longitude } = venue.location;

    const theme = useAppTheme();
    const styles = makeStyles(theme.theme);

    return (
        <View style={styles.container}>
             <MapView
                style={styles.map}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{ latitude, longitude }}
                    title={venue.name}
                    description={venue.address}
                />
            </MapView>
        </View>
    );
};



const makeStyles = ({ borderRadius }: BaseTheme) =>
    StyleSheet.create({
        container: {
            height: 240,
            borderRadius: borderRadius.medium,
            overflow: "hidden"
        },
        map: {
            flex: 1,
        },
    });