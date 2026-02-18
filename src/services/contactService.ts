import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../types/contact';
import initialData from '../../assets/data/contacts.json';

const STORAGE_KEY = '@contacts_app_data';

export const contactService = {
    /**
     * Obtiene los contactos del teléfono.
     * Si es la primera vez usa el JSON (RF1).
     */
    getAll: async (): Promise<Contact[]> => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) return JSON.parse(stored);

            //primera vez: Guardamos el JSON en el almacenamiento local
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
            return initialData;
        } catch (e) {
            console.error(e);
            return [];
        }
    },


    /**
     * Guarda los cambios permanentemente (RF5)
     */
    saveAll: async (contacts: Contact[]): Promise<void> => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    },


    deleteContacts: async (idsToDelete: string[]) => {
        const all = await contactService.getAll();
        const filtered = all.filter(c => !idsToDelete.includes(c.id));
        await contactService.saveAll(filtered);
    }
};