import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddItemScreen() {
  const [item, setItem] = useState('');
  const [savedItems, setSavedItems] = useState([]);

  const saveItem = async () => {
    try {
      const updatedItems = [...savedItems, item];
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      setSavedItems(updatedItems);
      setItem('');
    } catch (e) {
      console.error('Erro ao salvar item', e);
    }
  };

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems) setSavedItems(JSON.parse(storedItems));
    };
    loadItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar novo item</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do item"
        value={item}
        onChangeText={setItem}
      />
      <Button title="Salvar" onPress={saveItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 }
});
