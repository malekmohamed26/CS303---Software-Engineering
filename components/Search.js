import { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from "react-native";
import filter from "lodash.filter";

//const API_ENDPOINT ='';
export default function Search() {
  const [isLoading, setIsLoading] = useState("false");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);

      console.log(json.results);

      setIsLoading(false);
      setFullData(json.results);
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ title, author }, query) => {
    const { first, last } = title;
    if (
    
      title.includes(query) ||
      author.includes(query)
    ) {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Error in fetching data ... Please cheack your internet connection!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.login.title}
        renderItem={(item) => (
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.textName}>
                {item.title}
              </Text>
              <Text style={styles.textAuthor}>{item.author}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textAuthor: {
    fontSize: 14,
    marginLeft: 10,
    color: "gray",
  },
});
