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

const Header = () => {
  return (
    <View style={styles.container}>
      <Text>App</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7DF9FF",
    width: "100%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
