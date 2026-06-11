# 🎨 Guía Rápida - Componentes Nuevos SAM

## Hook Principal: useTheme()

Importar en cualquier componente:
```tsx
import { useTheme } from '@/theme';

const { theme, isDark, setThemeMode, themeMode } = useTheme();
```

### Propiedades:
- `theme` - Objeto con todos los estilos (colores, tipografía, espaciado, sombras)
- `isDark` - boolean si está en modo oscuro
- `setThemeMode` - Función para cambiar tema ('light' | 'dark' | 'system')
- `themeMode` - Modo actual

---

## Componentes Disponibles

### 1. SamLogo
Logo profesional SAM con degradado.

```tsx
import { SamLogo } from '@/components/common';

<SamLogo 
  size="large"        // 'small' | 'medium' | 'large'
  showText={true}     // Mostrar "Sam." debajo
  containerStyle={{}} // Estilos personalizados
/>
```

### 2. Button
Botón versátil con múltiples variantes.

```tsx
import { Button } from '@/components/common';

<Button
  title="Guardar"
  onPress={() => handleSave()}
  variant="primary"      // 'primary' | 'secondary' | 'outline' | 'danger'
  size="medium"          // 'small' | 'medium' | 'large'
  loading={isLoading}    // Mostrar spinner
  disabled={isDisabled}  // Deshabilitado
  fullWidth             // Ocupar todo el ancho
  style={{}}            // Estilos adicionales
/>
```

### 3. Input
Input mejorado con validación y iconos.

```tsx
import { Input } from '@/components/common';

<Input
  label="Correo"
  placeholder="tu@email.com"
  value={email}
  onChangeText={setEmail}
  icon="mail"          // Ionicons name
  isPassword={false}   // Mostrar toggle de password
  error={errorMsg}     // Mostrar error
  helper="Este es obligatorio" // Helper text
  containerStyle={{}}
/>
```

### 4. Header
Header reutilizable con búsqueda opcional.

```tsx
import { Header } from '@/components/common';

<Header
  title="Mi Pantalla"
  showLogo={true}      // Mostrar logo SAM
  showSearch={true}    // Mostrar icono búsqueda
  onSearch={(text) => {}} // Callback de búsqueda
  rightIcon="settings" // Ionicons name
  onRightPress={() => {}} // Callback botón derecha
  style={{}}
/>
```

### 5. Card & Section & ListItem
Componentes para estructurar contenido.

```tsx
import { Card, Section, ListItem } from '@/components/common';

// Card: Envolvedor genérico
<Card style={{}}>
  <Text>Contenido</Text>
</Card>

// Section: Grupo con título
<Section title="Mi Sección">
  <Card>Contenido</Card>
</Section>

// ListItem: Item de lista
<ListItem
  title="Título"
  subtitle="Subtítulo"
  icon={<Icon />}
  rightElement={<Icon />}
  onPress={() => {}}
  style={{}}
/>
```

---

## Usando Estilos del Tema

### Colores
```tsx
const { theme } = useTheme();

// Colores principales
theme.colors.primary        // #0EA5E9
theme.colors.secondary      // #10B981
theme.colors.text          // #111827 (light) / #F9FAFB (dark)
theme.colors.background    // #FFFFFF (light) / #0F172A (dark)
theme.colors.surface       // #F9FAFB (light) / #1E293B (dark)
theme.colors.border        // #E5E7EB (light) / #475569 (dark)
theme.colors.error         // #EF4444
theme.colors.success       // #10B981
```

### Tipografía
```tsx
// Aplicar estilos de tipografía
<Text style={theme.typography.h1}>Título 1</Text>
<Text style={theme.typography.h2}>Título 2</Text>
<Text style={theme.typography.h3}>Título 3</Text>
<Text style={theme.typography.h4}>Título 4</Text>
<Text style={theme.typography.bodyLg}>Body Large</Text>
<Text style={theme.typography.body}>Body</Text>
<Text style={theme.typography.bodySm}>Body Small</Text>
<Text style={theme.typography.caption}>Caption</Text>
```

### Espaciado
```tsx
theme.spacing.xs    // 4
theme.spacing.sm    // 8
theme.spacing.md    // 16
theme.spacing.lg    // 24
theme.spacing.xl    // 32
theme.spacing.xxl   // 48
```

### Bordes Redondeados
```tsx
theme.borderRadius.sm    // 4
theme.borderRadius.md    // 8
theme.borderRadius.lg    // 12
theme.borderRadius.xl    // 16
theme.borderRadius.full  // 9999 (círculo)
```

### Sombras
```tsx
<View style={theme.shadows.sm}>  {/* Sombra pequeña */}
<View style={theme.shadows.md}>  {/* Sombra media */}
<View style={theme.shadows.lg}>  {/* Sombra grande */}
```

---

## Ejemplo Completo: Nueva Pantalla

```tsx
import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@/theme';
import { useApp } from '@/contexts/AppContext';
import { Header, Button, Card, Section, Input } from '@/components/common';

export default function MyNewScreen() {
  const { theme } = useTheme();
  const [value, setValue] = React.useState('');
  
  return (
    <SafeAreaView 
      style={{ 
        flex: 1, 
        backgroundColor: theme.colors.background 
      }}>
      
      <Header 
        title="Mi Pantalla" 
        showLogo 
      />

      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
        }}>
        
        <Section title="Formulario">
          <Input
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={value}
            onChangeText={setValue}
            icon="person"
          />
        </Section>

        <Section title="Información">
          <Card>
            <Text style={theme.typography.body}>
              Esto es contenido en una tarjeta
            </Text>
          </Card>
        </Section>

        <Button
          title="Guardar"
          onPress={() => console.log(value)}
          fullWidth
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}
```

---

## Cambiar Tema Dinámicamente

```tsx
import { useTheme } from '@/theme';

export default function SettingsScreen() {
  const { setThemeMode, themeMode } = useTheme();

  return (
    <>
      <Button
        title="Tema Claro"
        onPress={() => setThemeMode('light')}
      />
      <Button
        title="Tema Oscuro"
        onPress={() => setThemeMode('dark')}
      />
      <Button
        title="Sistema"
        onPress={() => setThemeMode('system')}
      />
    </>
  );
}
```

---

## Tips & Trucos

### 1. Acceder a colores específicos
```tsx
<View style={{ backgroundColor: theme.colors.primaryLight }}>
```

### 2. Combinar estilos
```tsx
<Text style={[
  theme.typography.h2,
  { color: theme.colors.primary }
]}>
  Texto personalizado
</Text>
```

### 3. Condicionales según tema
```tsx
{isDark ? (
  <Image source={require('./logo-dark.png')} />
) : (
  <Image source={require('./logo-light.png')} />
)}
```

### 4. Crear componente con tema
```tsx
const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.md,
    }}>
      {/* Contenido */}
    </View>
  );
};
```

---

## ❌ NO HACER

```tsx
// ❌ MAL - Colores hardcodeados
<View style={{ backgroundColor: '#0EA5E9' }}>

// ✅ BIEN
<View style={{ backgroundColor: theme.colors.primary }}>
```

```tsx
// ❌ MAL - Espacio sin variable
<View style={{ marginBottom: 16 }}>

// ✅ BIEN
<View style={{ marginBottom: theme.spacing.md }}>
```

```tsx
// ❌ MAL - Tamaños de fuente aleatorios
<Text style={{ fontSize: 17 }}>

// ✅ BIEN
<Text style={theme.typography.body}>
```

---

## Checklist para Nuevas Pantallas

- [ ] Importar `useTheme` desde `@/theme`
- [ ] Usar `theme.colors.*` en lugar de colores hardcodeados
- [ ] Usar `theme.spacing.*` para márgenes/paddings
- [ ] Usar `theme.typography.*` para textos
- [ ] Usar `theme.borderRadius.*` para bordes
- [ ] Usar `theme.shadows.*` para sombras
- [ ] Envolver en `SafeAreaView`
- [ ] Probaren tema claro y oscuro
- [ ] Probar en Android e iOS
- [ ] Probar responsive

---

**¡Ahora estás listo para crear nuevas pantallas profesionales con SAM! 🚀**

