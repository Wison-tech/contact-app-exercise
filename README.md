# 📱 Contact Manager App - Mobile Exercise

Esta es una aplicación móvil desarrollada con **React Native** y **Expo** para la gestión de contactos. El proyecto fue diseñado siguiendo principios de modularidad, componentes reutilizables y persistencia de datos local.

## 🚀 Características principales
- **Carga Inicial:** Los datos se cargan desde un archivo JSON local que simula una API.
- **Persistencia:** Uso de `AsyncStorage` para guardar, editar y eliminar contactos de forma permanente en el dispositivo.
- **Búsqueda Avanzada:** Filtro en tiempo real por nombre, apellido o número de teléfono.
- **Navegación:** Implementación de `expo-router` para un flujo intuitivo entre la lista y el formulario.

---

## 🌟 Bonus Completados

### 1. Validación de Formularios
- **Campos Obligatorios:** No permite guardar si falta el nombre o el apellido.
- **Formato de Email:** Validación mediante expresiones regulares (Regex) para asegurar correos válidos.
- **Evitar Duplicados:** El sistema verifica que no existan números de teléfono idénticos dentro de un mismo contacto.

### 2. Múltiples Teléfonos por Contacto
- **Interfaz Dinámica:** Permite agregar tantos números como sea necesario.
- **Gestión Individual:** Cada fila de teléfono incluye su propia "etiqueta" (Ej: Casa, Trabajo, Móvil) y un botón de eliminación rápida (**X**).

---

## 🛠️ Estructura del Proyecto

```text
src/
 ├── components/       # Componentes reutilizables (PhoneInput, ContactCard)
 ├── services/         # Lógica de almacenamiento (AsyncStorage) y carga de JSON
 ├── types/            # Definiciones de TypeScript para Contactos y Teléfonos
 └── hooks/            # Hooks personalizados para manejar el estado global
app/                   # Sistema de rutas (Lista de contactos y Formulario)
assets/                # Datos iniciales (contacts.json) e imágenes
```
## 📂 Funcionamiento del JSON Inicial

La aplicación utiliza un flujo de datos inteligente para asegurar que el usuario siempre tenga información disponible desde el primer uso:

1. **Ubicación:** El archivo fuente se encuentra en `src/assets/data/contacts.json`.
2. **Hidratación Automática:** Al iniciar, el `contactService` verifica si existe información en el almacenamiento local.
3. **Carga Única:** Si el dispositivo no tiene datos (primera ejecución), la app importa el JSON inicial.
4. **Control Total:** Una vez realizada la carga inicial, todos los cambios se gestionan exclusivamente en el **AsyncStorage**, permitiendo que las ediciones y nuevos contactos persistan.

---

## ⚙️ Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/Wison-tech/contact-app-exercise.git](https://github.com/Wison-tech/contact-app-exercise.git)
cd contact-app-exercise 
```
### 2. Instalar dependencias
```bash
npm install
```
### 3. Iniciar el servidor de Expo
```bash
npx expo start
```
### 4. Visualización
Dispositivos Físicos: Escanea el código QR desde la terminal con la app Expo Go (disponible en Play Store y App Store).

Emuladores: Una vez iniciado el servidor, presiona a para abrir en Android o i para iOS.

### 💡 Detalles Técnicos
El proyecto destaca por las siguientes implementaciones técnicas:

TypeScript: Uso de interfaces y tipos estrictos para garantizar la integridad de los datos.

React Hooks: Uso de useState para formularios, useEffect para carga de datos y useMemo para optimizar el filtrado de la lista.

Diseño Adaptativo: Uso de Flexbox y unidades relativas para asegurar que la interfaz sea funcional en diversos tamaños de pantalla.

Componentes Modulares: Separación de lógica en componentes como PhoneInput y ContactCard para facilitar el mantenimiento.

 ### 👤 Autor
Desarrollado por Wison-tech como parte de una prueba técnica para el rol de Desarrollador Mobile.
