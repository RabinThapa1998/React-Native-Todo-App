import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";

export default function App() {
  const [count, setCount] = useState(5);
  const [imgData, setImgData] = useState("");
  console.log("🚀 ~ file: App.js ~ line 18 ~ App ~ imgData", imgData);
  const handleLoadMore = () => {
    setCount((prev) => prev + 5);
  };
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${count}`
      );

      setData(result.data);
    };
    fetchData();
  }, [count]);
  const handleTouchable = (id) => {
    setData((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleImageLoad = async () => {
    console.log("----------------------------------run");
    const rand = Math.floor(Math.random() * 100);
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/1`
    );
    setImgData(result.data.thumbnailUrl);
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <StatusBar style="auto" />
      {imgData && <Image source={{ uri: imgData }} />}
      <View style={styles.buttonGroup}>
        <Button title="Load More!" onPress={handleLoadMore} />
        <Button title="Reset" onPress={() => setCount(5)} />
        <Button title="Load Image" onPress={() => handleImageLoad()} />
      </View>

      {data && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTouchable(item.id)}>
              <View style={styles.card}>
                <Text style={{ marginRight: 4 }}>{item.id}</Text>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  card: {
    backgroundColor: "#e7e7e7",
    height: 50,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    // display: "flex",
    // flexDirection: "row",
  },
});
