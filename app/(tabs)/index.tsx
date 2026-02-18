import { ContactCard } from '@/src/components/ContactCard';
import { useContacts } from '@/src/hooks/useContacts';
import { contactService } from '@/src/services/contactService';
import { Link, useRouter } from 'expo-router';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ContactsScreen() {
  const router = useRouter();
  const { contacts, isLoading, searchQuery, setSearchQuery, isSelectionMode,setIsSelectionMode, selectedIds, toggleSelection,selectAll,deleteSelected,RefreshContacts} = useContacts();
  
  // funcion mara manejar el toque simple
  const handlePress = (id: string) => {
    if (isSelectionMode) {
      toggleSelection(id);
    } else {
      // si no hay seleccion navegamos al detalle
      router.push({pathname: "/details/[id]", params: {id}})
    }
  };


  // alerta de confirmacion para borrado masivo
  const confirmDelete = () => {
    Alert.alert("Eliminar contactos", 
      `¿Estás seguro de eliminar ${selectedIds.length} contactos?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: deleteSelected }
      ]
    )
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1 }} />
  }

  return (
    <View style={styles.container}>
      {/* BARRA DE BÚSQUEDA: Solo se muestra si NO estamos seleccionando para borrar */}
    {!isSelectionMode && (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre, apellido o número..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing" // Bonus para iOS
        />
      </View>
    )}
      {/* barra de acciones: solo se ve en modo seleccion */}
      {isSelectionMode && (
        <View style ={styles.actionBar}>
          <TouchableOpacity onPress={selectAll}>
            <Text style={styles.actionText}>
              {selectedIds.length === contacts.length ? "Desmarcar" : "Todo"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.countText}>
            {selectedIds.length} Seleccionados
          </Text>
          <TouchableOpacity onPress={confirmDelete}>
            <Text style={[styles.actionText, {color: '#FF3B30'}]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}

     <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard 
            item={item} 
            isSelectionMode={isSelectionMode}
            isSelected={selectedIds.includes(item.id)}
            onPress={() => handlePress(item.id)}
            onLongPress={() => {
              setIsSelectionMode(true);
              toggleSelection(item.id);
            }}
            onDeleteOne={(id) => {
              Alert.alert("Eliminar", "¿Borrar este contacto?", [
                {text: "No"},
                {
                  text: "Sí",
                  onPress: async() => {
                    await contactService.deleteContacts([id]);
                    RefreshContacts();
                  }
                }
              ]);
            }}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay contactos guardados.</Text>
        }
      />{/* Botón Flotante (Ocultar si estamos seleccionando para evitar errores) */}
      {!isSelectionMode && (
        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => router.push({ pathname: "/details/[id]", params: { id: 'new' } })}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5', padding: 10 },
  // Nueva barra de herramientas superior
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
  countText: { fontWeight: '600', fontSize: 16, color: '#333' },
  fab: {
    position: 'absolute', right: 20, bottom: 20,
    backgroundColor: '#007AFF', width: 60, height: 60,
    borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 5
  },
  fabText: { color: 'white', fontSize: 30 },
  emptyText: { textAlign: 'center', marginTop: 50, color: 'gray', fontSize: 16 },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
});