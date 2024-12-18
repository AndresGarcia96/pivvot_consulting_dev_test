import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { v4 as uuidv4 } from "uuid";

type ItemData = {
  id: string;
  title: string;
  description: string;
};

const HomeScreen = () => {
  const [tasks, setTasks] = useState<ItemData[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState<ItemData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    },
    inputContainer: {
      padding: 13,
      marginBlock: 7,
      borderBottomWidth: 1,
      borderColor: isDarkMode ? "#333" : "#ccc",
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: isDarkMode ? "#555" : "#ddd",
      backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
      color: isDarkMode ? "#fff" : "#000",
      marginBottom: 8,
      borderRadius: 7,
      paddingHorizontal: 8,
    },
    addButton: {
      backgroundColor: "#007bff",
      padding: 10,
      alignItems: "center",
      borderRadius: 7,
      marginBottom: 8,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    toggleButton: {
      backgroundColor: isDarkMode ? "#A7BAB7" : "#A7AFBA",
      padding: 13,
      marginBottom: 13,
      alignItems: "center",
      borderRadius: 7,
      width: "40%",
      alignSelf: "flex-end",
    },
    toggleButtonText: {
      color: isDarkMode ? "#222" : "#333",
      fontWeight: "bold",
    },
    listItem: {
      padding: 13,
      marginVertical: 7,
      marginHorizontal: 13,
      borderRadius: 7,
    },
    listItemTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    listItemDescription: {
      fontSize: 14,
      marginBlock: 4,
    },
    detailsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 13,
    },
    detailsTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 13,
    },
    detailsDescription: {
      fontSize: 20,
      marginBottom: 22,
    },
    backButton: {
      backgroundColor: "#8C1111",
      padding: 13,
      alignItems: "center",
      borderRadius: 7,
      width: "40%",
    },
    backButtonText: {
      color: "#F7F7F7",
      fontWeight: "bold",
    },
  });

  const addTask = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const newTask: ItemData = {
        id: uuidv4(),
        title: newTitle,
        description: newDescription,
      };
      setTasks([...tasks, newTask]);
      setNewTitle("");
      setNewDescription("");
    }
  };

  const renderItem = ({ item }: { item: ItemData }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        {
          backgroundColor: isDarkMode ? "#333" : "#DFEBF2",
        },
      ]}
      onPress={() => setSelectedTask(item)}
    >
      <Text
        style={[styles.listItemTitle, { color: isDarkMode ? "#fff" : "#000" }]}
      >
        {item.title}
      </Text>
      <Text
        style={[
          styles.listItemDescription,
          { color: isDarkMode ? "#bbb" : "#555" },
        ]}
      >
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  if (selectedTask) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>{selectedTask.title}</Text>
            <Text style={styles.detailsDescription}>
              {selectedTask.description}
            </Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedTask(null)}
            >
              <Text style={styles.backButtonText}>Regresar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Text style={styles.toggleButtonText}>
              {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Titulo de la tarea"
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción de la tarea"
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Añadir Tarea</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
