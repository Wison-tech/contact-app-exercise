import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      //estilo global para el encabezado
      headerStyle: {
        backgroundColor:"#007AFF"
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    }}
    >
      {/* configuracion de pantalla principal */}
      <Stack.Screen name="(tabs)/index"
      options={{
        title: "Mis Contactos"
      }}
      />

      {/* configuracion de la pantalla de detalles/formulario */}
       <Stack.Screen name="details/[id]/index"
      options={{
        title: "Detalle del Contacto",
        headerBackTitle: "Volver" // solo en iOS
      }}
      />
    </Stack>
  );
}
