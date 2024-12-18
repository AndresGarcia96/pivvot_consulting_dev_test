import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import USA from "./flags/USA";
import Spain from "./flags/Spain";

const flags = [
  { component: USA, lang: "en-US", name: "USA" },
  { component: Spain, lang: "es-CO", name: "China" },
];

export function Language() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flagsContainer}
      >
        {flags.map(({ component: Flag, lang, name }) => (
          <TouchableOpacity
            key={name}
            onPress={() => changeLanguage(lang)}
            style={[
              styles.flag,
              currentLanguage === lang && styles.activeFlag,
              currentLanguage !== lang && styles.inactiveFlag,
            ]}
          >
            <Flag width={45} height={45} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  flagsContainer: {
    flexDirection: "row",
    paddingVertical: 7,
  },
  flag: {
    paddingHorizontal: 7,
  },
  activeFlag: {
    transform: [{ scale: 1.3 }],
  },
  inactiveFlag: {
    opacity: 0.2,
  },
});
