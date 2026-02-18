


/**
 * Hook personalizado para gestionar la logica de los contactos.
 * Separa la logica de negocio de la interfaz de usuario
 */

import { useCallback, useState } from "react";
import { Contact } from "../types/contact";
import { contactService } from "../services/contactService";
import { useFocusEffect } from "expo-router";
import { RefreshControl } from "react-native";

export function useContacts(){
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]> ([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredContacts = contacts.filter(contact => {
        const searchLower = searchQuery.toLowerCase();
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        const hasNumber = contact.phones.some(p => p.number.includes(searchQuery));

        return fullName.includes(searchLower) || hasNumber;
    })

    // funcion para cargar los contactos desde el servicio
    const loadContacts = useCallback (async () =>{
        setIsLoading(true);
        try {
            const data = await contactService.getAll();
            setContacts(data);
        } catch (error) {
            console.error("Error al cargar contactos en el hook:", error);
            
        } finally {
            setIsLoading(false);
        }
    }, []);

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => {
            const newValue = prev.includes(id) 
            ? prev.filter(i => i !== id) 
            : [...prev, id];

            if(newValue.length === 0) setIsSelectionMode(false);
            return newValue;
        });
    };

const selectAll = () =>{
    if (selectedIds.length === contacts.length) {
        setSelectedIds([]);
        setIsSelectionMode(false);
    } else {
        setSelectedIds(contacts.map(c => c.id));
        
    }
};

const deleteSelected = async () =>{
    await contactService.deleteContacts(selectedIds);
    setSelectedIds([]);
    setIsSelectionMode(false);
    loadContacts();
}
    //useFocusEfect asegura que los datos se refresquen al volver de la otra pantalla
    useFocusEffect(
        useCallback(()=>{
            loadContacts();
        }, [loadContacts])
    );



    return {
      contacts: filteredContacts, selectedIds, isSelectionMode, setIsSelectionMode,
      toggleSelection, selectAll, deleteSelected, isLoading, RefreshContacts: loadContacts,
      searchQuery,
    setSearchQuery,

    };
}