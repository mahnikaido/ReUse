import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState('70% OFF');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (e) {
      console.error('Erro ao carregar itens', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Re</Text>
        <Text style={styles.logoTextBold}>Use</Text>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Discount Banner */}
        <View style={styles.discountBanner}>
          <Text style={styles.discountText}>Ganhe digital até {discount}</Text>
        </View>
        
        {/* Featured Item Card */}
        <View style={styles.featuredCard}>
          <View style={styles.cardImagePlaceholder}>
            <Ionicons name="image-outline" size={40} color="#999" />
          </View>
          <Text style={styles.cardTitle}>Item em Destaque</Text>
          <Text style={styles.cardDescription}>Descrição do item reutilizável</Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddItem')}
          >
            <Ionicons name="add-circle-outline" size={24} color="#666" />
            <Text style={styles.actionButtonText}>Adicionar Item</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Camera')}
          >
            <Ionicons name="camera-outline" size={24} color="#666" />
            <Text style={styles.actionButtonText}>Escanear</Text>
          </TouchableOpacity>
        </View>
        
        {/* Items List */}
        <View style={styles.itemsList}>
          <Text style={styles.sectionTitle}>Meus Itens</Text>
          {items.length > 0 ? (
            items.map((item, index) => (
              <View key={index} style={styles.itemCard}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum item adicionado ainda</Text>
          )}
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#333" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Camera')}
        >
          <Ionicons name="search" size={24} color="#999" />
          <Text style={styles.navTextInactive}>Buscar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('AddItem')}
        >
          <Ionicons name="add-circle" size={24} color="#999" />
          <Text style={styles.navTextInactive}>Adicionar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Chat')}
        >
          <Ionicons name="person" size={24} color="#999" />
          <Text style={styles.navTextInactive}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#333',
  },
  logoTextBold: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  discountBanner: {
    backgroundColor: '#E8F4FD',
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: 'center',
  },
  discountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardImagePlaceholder: {
    height: 120,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 1,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  itemsList: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
    fontWeight: '500',
  },
  navTextInactive: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
