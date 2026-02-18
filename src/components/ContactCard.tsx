import { Contact } from "@/src/types/contact";
import { Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
interface ContactCardProps {
    item: Contact;
    isSelected: boolean;
    isSelectionMode: boolean;
    onPress: () => void;
    onLongPress: () => void;
    onDeleteOne?: (id: string) => void;
}

/**
 * Componente atomico para representar un contacto en la lista.
 * cumple con modularidad al separar la ui del renderizado
 */

export function ContactCard({item, isSelected, isSelectionMode, onPress, onLongPress, onDeleteOne}: ContactCardProps) {
    return (
        <TouchableOpacity 
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={300}>
          <View style={{flex:1}}>
            <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
            <Text style={styles.phone}>{item.phones[0]?.number || 'Sin teléfono'}</Text>
            </View>      

            {/* Si NO estamos seleccionando varios, mostramos el botón de eliminar individual */}
            {!isSelectionMode ? (
              <TouchableOpacity
              style={styles.deleteButton}
              onPress={()=>onDeleteOne?.(item.id)}>
                <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
            ): (
              //si estamos seleccionando, mostramos un indicador
              <View style={[styles.checkbox, isSelected && styles.checkboxChecked]} />
            )}  
          </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white', padding: 15, borderRadius: 10,
    marginBottom: 10, flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: 'transparent'
  },
  selectedCard: { borderColor: '#007AFF', backgroundColor: '#F0F7FF' },
  name: { fontSize: 18, fontWeight: 'bold' },
  phone: { color: 'gray' },
  deleteButton: { padding: 8 },
  deleteText: { color: '#FF3B30', fontWeight: 'bold' },
  checkbox: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc' },
  checkboxChecked: { backgroundColor: '#007AFF', borderColor: '#007AFF' }
});