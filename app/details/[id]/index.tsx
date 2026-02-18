import { PhoneInput } from "@/src/components/phoneInput";
import { contactService } from "@/src/services/contactService";
import { Contact, Phone } from "@/src/types/contact";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ContactFormScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phones, setPhones] = useState<Phone[]>([]);

    useEffect(() => {
        if (id !== "new") {
            loadContact();
        } else {
            setPhones([{ id: Date.now().toString(), number: "", label: "Movil" }]);
        }
    }, [id]);

    const loadContact = async () => {
        const all = await contactService.getAll();
        const found = all.find((c) => c.id === id);
        if (found) {
            setFirstName(found.firstName);
            setLastName(found.lastName);
            setEmail(found.email);
            setPhones(found.phones);
        }
    };

    const addPhoneField = () => {
        setPhones([
            ...phones,
            { id: Date.now().toString(), number: "", label: "Movil" },
        ]);
    };

    const handleSave = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validaciones básicas
        if (!firstName.trim()) {
            Alert.alert("Campo Requerido", "El nombre es obligatorio.");
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert("Email inválido", "Por favor ingresa un formato de correo correcto.");
            return;
        }

        if (phones.length > 0 && !phones[0].number.trim()) {
            Alert.alert("Teléfono Requerido", "Debes ingresar al menos un número.");
            return;
        }

        // 1. Obtener lista actual para validar
        const allContacts = await contactService.getAll();

        // 2. Limpiar números del formulario para comparar
        const currentFormNumbers = phones.map(p => p.number.trim()).filter(n => n !== "");

        // 3. Lógica de validación de duplicados corregida
        const isNumberAlreadyTaken = allContacts.some(existingContact => {
            // Si estamos editando, saltamos la validación para el contacto con el MISMO id
            if (id !== "new" && existingContact.id === id) return false;

            // Revisamos si alguno de los números del form ya existe en OTRO contacto
            return existingContact.phones.some(p =>
                currentFormNumbers.includes(p.number.trim())
            );
        });

        if (isNumberAlreadyTaken) {
            Alert.alert(
                "Número Duplicado",
                "Uno de los números de teléfono ya está registrado en otro contacto."
            );
            return;
        }

        // 4. Preparar el objeto final
        const newContact: Contact = {
            id: id === "new" ? Date.now().toString() : (id as string),
            firstName,
            lastName,
            email,
            phones,
        };

        // 5. Actualizar la lista
        let updatedList;
        if (id === "new") {
            updatedList = [...allContacts, newContact];
        } else {
            updatedList = allContacts.map((c) => (c.id === id ? newContact : c));
        }

        await contactService.saveAll(updatedList);
        router.back();
    };

    return (
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled" // Permite clics aunque el teclado esté abierto
        >
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Ej. Lovelace"
            />

            <Text style={styles.label}>Apellido</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Ej. Musk"
            />

            <Text style={styles.label}>Email *</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={[styles.label, { marginTop: 20 }]}>Teléfonos *</Text>
            {phones.map((phone, index) => (
                <PhoneInput
                    key={phone.id}
                    index={index}
                    phone={phone}
                    onChange={(updatedPhone) => {
                        const newPhones = [...phones];
                        newPhones[index] = updatedPhone;
                        setPhones(newPhones);
                    }}
                    onRemove={() => {
                        // Solo permitimos borrar si hay más de uno, o simplemente limpiamos si es el último
                        if (phones.length > 1) {
                            setPhones(phones.filter(p => p.id !== phone.id));
                        } else {
                            setPhones([{ id: Date.now().toString(), number: "", label: "Móvil" }]);
                        }
                    }}
                />
            ))}

            <TouchableOpacity style={styles.addButton} onPress={addPhoneField}>
                <Text style={styles.addButtonText}>+ Añadir otro teléfono</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
    label: { fontWeight: 'bold', marginBottom: 5, color: '#333333' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 },
    addButton: { padding: 10, marginBottom: 20 },
    addButtonText: { color: '#007AFF', fontWeight: 'bold' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 40 },
    saveButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
    cancelButton: { backgroundColor: '#afafaf', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold' }
});