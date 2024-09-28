import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

export default function Users() {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // Set a base URL for all requests
  axios.defaults.baseURL = "https://reqres.in/";

  useEffect(() => {
    async function userData() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await axios
        .get("api/users/")
        .then((resUserData) => setUsers(resUserData.data.data))
        .then(setLoading(false))
        .catch((error) => {
          console.log(error);
        });
      await axios
        .post("/api/users/", {
          name: "Rahul",
          job: "Cognizant",
        })
        .then((response) => console.log(response.data)) // {"createdAt": "2024-09-11T09:02:22.981Z", "id": "652", "job": "Cognizant", "name": "Rahul"}
        .catch((error) => console.log(error));
    await axios
        .put("/api/users/5", {
            name: "Rutik",
            job: "SDE"
        }).then(res => console.log(res.data)) // {"job": "SDE", "name": "Rutik", "updatedAt": "2024-09-11T09:02:23.445Z"}
    }
    userData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {Users.map((user, index) => (
            <Text key={index}>
              {user.first_name} {user.last_name}
            </Text>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
