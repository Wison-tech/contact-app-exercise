/**
 * Interfaz para un número de telefono individual.
 * Permite cumplir con el Bonus 2: múltiples números por contacto.
 */

export interface Phone {
    id: string;
    number: string;
    label: string
}

/**
 * Interfax principal del Contacto.
 * Define la estructura que se guardará en AsynsStorage.
 */

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phones: Phone [];
}