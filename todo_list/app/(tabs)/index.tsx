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

import { useTranslation } from "react-i18next";
import { Language } from "@/components/Languaje/Languaje";
import { Switch } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = () => {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState<ItemData[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState<ItemData | null>(null);

  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);
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
        <Text style={styles.deleteButtonText}>
          {t("home.deleteTaskButton")}
        </Text>
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
              placeholder={t("home.newTitleInput")}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder={t("home.newDescriptionInput")}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
              value={newDescription}
              onChangeText={setNewDescription}
            />

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => updateSelectedTask(selectedTask.id)}
            >
              <Text style={styles.updateButtonText}>
                {t("home.updateTaskButton")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedTask(null)}
            >
              <Text style={styles.backButtonText}>{t("home.backButton")}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Language />

          <View style={styles.switchContainer}>
            <FontAwesome5
              name={isDarkMode ? "moon" : "sun"}
              size={22}
              color={isDarkMode ? "#F4D03F" : "#333"}
              style={styles.icon}
            />
            <Switch
              style={styles.switch}
              trackColor={{ false: "#A7BAB7", true: "#F7F7F7" }}
              thumbColor={isDarkMode ? "#F4D03F" : "#F4D03F"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isDarkMode}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text
            style={[
              styles.principalTitleTask,
              { color: isDarkMode ? "#fff" : "#000" },
            ]}
          >
            {t("home.createNewTask")}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={t("home.taskTitleInput")}
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.input}
            placeholder={t("home.taskDescriptionInput")}
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>{t("home.addTask")}</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.principalTitleTask,
            { color: isDarkMode ? "#fff" : "#000" },
          ]}
        >
          {t("home.taskList")}
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
