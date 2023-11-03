import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const API_KEY = '1d868d05865a228a5fb2fc24c37d7b36';
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=fr-FR&region=FR`;

export type HomeRouteParams = undefined;

export const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setMovies(json.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ alignSelf: 'center', fontSize: 20 }}>Recent movies</Text>

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
  image: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
});
