import { Phone } from '@/src/types/contact';
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';


interface PhoneInputProps {
    phone: Phone;
    onChange: (updatedPhone: Phone) => void;
    onRemove: () =>void
    index: number;
}

/**
 * componente modular para el ingreso de telefonos
 * permite manejar de forma independiente cada numero de la lista
 */

export function PhoneInput({phone, index, onChange, onRemove}: PhoneInputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Telefono {index + 1 }</Text>
            <View style={styles.row}>
                {/* input para el numero */}
                <TextInput style={[styles.input, {flex: 2}]}
                placeholder='Numero (ej. 12345678)'
                value={phone.number}
                keyboardType='phone-pad'
                onChangeText={(text) => onChange({...phone, number:text})}/>

                {/* input para la etiqueta Ej Casa */}
                <TextInput style={[styles.input, {flex:1, marginLeft: 10}]}
                placeholder='Etiqueta'
                value={phone.label}
                onChangeText={(text) => onChange ({...phone, label:text})}
                />
                {/* BOTÓN DE ELIMINAR (La X) */}
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={onRemove}
          >
            <Text style={styles.removeButtonText}>✕</Text>
          </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{marginBottom:15,},
    label: {fontSize:12, color:"#666", marginBottom: 5},
    row: {flexDirection:'row', alignItems: 'center'},
    input:{borderWidth:1, borderColor: "#ccc", padding:10, borderRadius:5, backgroundColor: "#fff"},
    removeButton: { marginLeft: 10, padding: 5 },
    removeButtonText: { color: '#FF3B30', fontSize: 22, fontWeight: 'bold' }
});