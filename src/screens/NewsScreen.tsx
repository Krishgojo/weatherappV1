import React from 'react';
import NewsCard from '../components/NewsCard';
import {Text, TouchableOpacity, FlatList, SafeAreaView, Image} from 'react-native';

const NewsScreen = ({navigation, route}: any) => {
  const news = route.params?.news || [];
  return (
    <SafeAreaView style={{flex: 1, padding: 16, backgroundColor: '#E6DADA'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ alignSelf: 'flex-start'}}>
        {/* <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000"}}>⬅</Text> */}
        <Image style={{height:30,width:30}} source={require('../../assets/back_arrow.png')}/>
      </TouchableOpacity>
      <Text
        style={{ fontSize: 18, marginBottom: 10, textAlign: 'center', fontWeight: 'bold', color: "#000" }}>
        Top News
      </Text>
      {news.length === 0 && <Text>Loading news...</Text>}
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <NewsCard article={item} />}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{color: 'white'}}>Loading news...</Text>
        }
        // contentContainerStyle={{paddingBottom: 10}}
      />
    </SafeAreaView>
  );
};

export default NewsScreen;
