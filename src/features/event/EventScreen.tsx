import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const EventScreen = () => {
  return <View><Text>Event Screen</Text></View>;
}
export default EventScreen;

// import { RootState } from '../../../app/store/rootStore';
// import { searchEventsUseCase } from '../usecases/searchEventsUseCase';
// import { toggleFavorite } from '../store/homeSlice';
// import EventCard from '../components/EventCard';

// export default function EventScreen(){
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const { events, loading, error } = useSelector((s:RootState)=>s.home);
//   const [keyword, setKeyword] = useState('');
//   const [city, setCity] = useState('');
//   const onSearch = ()=> dispatch<any>(searchEventsUseCase(keyword,city));
  
//   return (
//     <View style={{flex:1,padding:16}}>
//       <TextInput placeholder='Keyword' value={keyword} onChangeText={setKeyword} style={{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:6,marginBottom:8}} />
//       <TextInput placeholder='City' value={city} onChangeText={setCity} style={{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:6,marginBottom:8}} />
//       {error && <Text style={{color:'red'}}>{error}</Text>}
//       <Button title='Search' onPress={onSearch} />
//       {loading && <Text>Loading...</Text>}
//       <FlatList data={events} keyExtractor={(i:any)=>i.id} renderItem={({item})=>(
//         <EventCard item={item} onPress={()=>navigation.navigate('EventDetail' as never,{id:item.id} as never)} onFavorite={()=>dispatch(toggleFavorite(item.id))} />
//       )} />
//     </View>
//   );
// }
