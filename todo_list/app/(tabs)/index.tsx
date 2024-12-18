import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api_config/task_api/task_api";
import indexStyles from "../styles/index_styles";

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

  const styles = indexStyles(isDarkMode);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      Alert.alert("No se pudieron cargar las tareas");
    }
  };

  const addTask = async () => {
    if (newTitle.trim() && newDescription.trim()) {
      try {
        const newTask = await createTask(newTitle, newDescription);

        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTitle("");
        setNewDescription("");

        Alert.alert("Éxito", "Tarea agregada con éxito");
      } catch (error) {
        Alert.alert("Hubo un error al agregar la tarea");
      }
    } else {
      Alert.alert("El título y la descripción son requeridos");
    }
  };

  const updateSelectedTask = async (id: string) => {
    if (newTitle.trim() && newDescription.trim()) {
      try {
        const updatedTask = await updateTask(id, newTitle, newDescription);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
        setNewTitle("");
        setNewDescription("");
        Alert.alert("Éxito", "Tarea actualizada con éxito");
        setSelectedTask(null);
      } catch (error) {
        Alert.alert("Hubo un error al actualizar la tarea");
      }
    } else {
      Alert.alert("El título y la descripción son requeridos");
    }
  };

  const deleteSelectedTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      Alert.alert("Éxito", "Tarea eliminada con éxito");
    } catch (error) {
      Alert.alert("Hubo un error al eliminar la tarea");
    }
  };

  const renderItem = ({ item }: { item: ItemData }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        { backgroundColor: isDarkMode ? "#333" : "#DFEBF2" },
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

      <TouchableOpacity
        onPress={() => deleteSelectedTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
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
            <TextInput
              style={styles.input}
              placeholder="Nuevo Titulo"
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva Descripción"
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
              value={newDescription}
              onChangeText={setNewDescription}
            />

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => updateSelectedTask(selectedTask.id)}
            >
              <Text style={styles.updateButtonText}>Actualizar</Text>
            </TouchableOpacity>
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

          <Text
            style={[
              styles.principalTitleTask,
              { color: isDarkMode ? "#fff" : "#000" },
            ]}
          >
            Crear Nueva Tarea
          </Text>

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
        <Text
          style={[
            styles.principalTitleTask,
            { color: isDarkMode ? "#fff" : "#000" },
          ]}
        >
          Lista de Tareas
        </Text>

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
