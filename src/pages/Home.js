import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { List, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchusers } from "../store/actions/userAction";
import { user } from "../store/slices/user/user.slice";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const users = useSelector(user);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5; // Number of items to fetch per page
  

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
  
    try {
      payload = {
        page: page,
        perpage: perPage,
      };
     
      if (page > totalPages) return ; // Stop loading if all pages have been fetched
      await dispatch(fetchusers(payload));
      const { data, total_pages } = users;
      setTotalPages(total_pages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  const handleItemPress = (id) => {
    navigation.navigate("Details", { id });
  };

  const renderItem = ({ item }) => {
    return (
      <>
  
      <TouchableOpacity onPress={() => handleItemPress(item?.id)}>
        <View style={styles.card}>
          <Image source={{ uri: item.avatar }} style={styles.userImage} />
          <View style={styles.title}>
            <Text style={styles.titleUser}>
              {item.first_name + " " + item.last_name}
            </Text>
            <Text style={[styles.titleUser, styles.email]}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
    );
  };

  const handleLoadMore = () => {
    // if (page < totalPages) {
    //   setPage((prevPage) => prevPage + 1);
    // loadUsers();
    // }
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      loadUsers();
    }
  };


  const renderFooter = () => {
    if (page === totalPages) return null;
    // if (!loading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 , marginTop:20}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  card: {
    flexDirection: "row",
    padding: 10,
  },
  title: {
    marginLeft: 15,
  },
  titleUser: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
  userImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "green",
  },
  email: {
    paddingTop: 10,
  },
});
