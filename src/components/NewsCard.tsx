import React from 'react';
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';

const NewsCard = (article: any) => {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(article.article.url)}>
      <View style={styles.card}>
        <Text style={styles.title}>{article.article.title}</Text>
        <Text style={styles.description}>{article.article.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#a8a8a8',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
});

export default NewsCard;
