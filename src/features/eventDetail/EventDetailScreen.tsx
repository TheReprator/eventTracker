import { useThemedStyles } from '@/hooks/useThemedStyle';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

const EventDetailScreen = () => {

    const styles = useThemedStyles((theme) => ({
      container: {
        flex: 1,
        padding: theme.spacing.medium,
        backgroundColor: theme.colors.background,
      },
      title: {
        fontSize: 22,
        color: theme.colors.text,
        fontWeight: "700",
      },
    }));
    
  return <View><Text>Event Detail Screen</Text></View>;
}
export default EventDetailScreen;

// import { fetchEventDetail } from '../store/eventDetailSlice';
// import { RootState } from '../../../app/store/rootStore';
// import { useRoute } from '@react-navigation/native';
// export default function EventDetailScreen(){
//   const route = useRoute<any>(); const { id } = route.params; const dispatch = useDispatch();
//   const { data, loading, error } = useSelector((s:RootState)=>s.eventDetail);
//   useEffect(()=>{ dispatch(fetchEventDetail(id) as any); },[id]);
//   if(loading) return <Text>Loading...</Text>;
//   if(error) return <Text style={{color:'red'}}>{error}</Text>;
//   if(!data) return null;
//   const venue = data?._embedded?.venues?.[0];
//   return (
//     <ScrollView style={styles.container}>
//       {data.images?.[0]?.url && <Image source={{uri:data.images[0].url}} style={styles.banner} />}
//       <Text style={styles.name}>{data.name}</Text>
//       {venue && (
//         <View style={{height:220, marginVertical:10}}>
//           <MapView style={{flex:1}} initialRegion={{
//             latitude: parseFloat(venue.location.latitude),
//             longitude: parseFloat(venue.location.longitude),
//             latitudeDelta:0.01, longitudeDelta:0.01
//           }}>
//             <Marker coordinate={{ latitude: parseFloat(venue.location.latitude), longitude: parseFloat(venue.location.longitude) }} title={venue.name} description={venue.address?.line1} />
//           </MapView>
//         </View>
//       )}
//       <Text style={styles.section}>Date: {data.dates?.start?.localDate}</Text>
//       <Text style={styles.section}>Time: {data.dates?.start?.localTime}</Text>
//       <Text style={styles.section}>Venue: {venue?.name}</Text>
//       <Text style={styles.section}>City: {venue?.city?.name}</Text>
//       <Text style={styles.section}>Country: {venue?.country?.name}</Text>
//       {data.info && <Text style={styles.info}>{data.info}</Text>}
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   container:{ padding:16 }, banner:{ width:'100%', height:200, borderRadius:6 }, name:{ fontSize:22, fontWeight:'bold', marginVertical:10 },
//   section:{ fontSize:16, marginVertical:4 }, info:{ fontSize:14, marginTop:10, color:'#555' }
// });
