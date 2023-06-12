import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from "react-redux";

const Details = ({ route }) => {
  const { id } = route.params;
  const user = useSelector((state) =>
    state?.user?.user.data.filter((item) => item.id === id)
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: user[0].avatar }} style={styles.image} resizeMode="cover" />
      <Text style={styles.username}>{user[0].first_name + ' ' + user[0].last_name}</Text>
      <Text style={styles.email}>{user[0].email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  image: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: Dimensions.get('window').width * 0.25,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "black",
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Details;