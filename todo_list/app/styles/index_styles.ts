import { StyleSheet } from "react-native";

const indexStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#070707" : "#F7F7F7",
    },
    inputContainer: {
      padding: 13,
      marginBlock: 7,
      borderBottomWidth: 1,
      borderColor: isDarkMode ? "#333" : "#ccc",
    },
    input: {
      height: 45,
      borderWidth: 1.3,
      borderColor: isDarkMode ? "#555" : "#ddd",
      backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
      color: isDarkMode ? "#fff" : "#000",
      marginBottom: 8,
      borderRadius: 7,
      paddingHorizontal: 8,
    },
    addButton: {
      backgroundColor: "#015E90",
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
      alignSelf: "flex-start",
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
    principalTitleTask: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 7,
    },
    listItemDescription: {
      fontSize: 14,
      marginBlock: 4,
    },
    detailsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingInline: 13,
    },
    detailsTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 13,
      textAlign: "center",
      color: isDarkMode ? "#F2F2F2" : "#070707",
    },
    detailsDescription: {
      fontSize: 20,
      marginBottom: 22,
      textAlign: "center",
      color: isDarkMode ? "#F2F2F2" : "#070707",
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
      textAlign: "center",
    },
    deleteButton: {
      backgroundColor: "#8C1111",
      padding: 13,
      marginTop: 7,
      borderRadius: 7,
      width: "31%",
      alignSelf: "flex-start",
    },
    deleteButtonText: {
      color: "#F7F7F7",
      fontWeight: "bold",
      textAlign: "center",
    },
    updateButton: {
      backgroundColor: "#1D8348",
      padding: 13,
      alignItems: "center",
      borderRadius: 7,
      width: "40%",
      marginBlock: 13,
    },
    updateButtonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default indexStyles;
