# 🚀 Guía de Inicio Rápido - S.A.M

## 1️⃣ Instalación de Dependencias

```bash
cd C:\Desarrollo\sam-mkt-app
npm install
```

Si hay problemas de dependencias:
```bash
npm install --legacy-peer-deps
```

## 2️⃣ Configuración de Backend

Asegúrate que tu backend NestJS esté corriendo en `http://localhost:3000`

Si es una URL diferente, edita `services/api.ts`:

```typescript
const API_BASE_URL = 'http://tu-url-backend.com';
```

## 3️⃣ Iniciar la Aplicación

```bash
npm start
```

### Selecciona la plataforma:

**Para Android:**
```bash
npm android
```

**Para iOS:**
```bash
npm ios
```

**Para Web:**
```bash
npm web
```

## 4️⃣ Probar la Aplicación

### Crear una Cuenta

1. En la pantalla de login, presiona "Regístrate aquí"
2. Completa los datos:
   - **Nombre**: Tu nombre
   - **Correo**: tu@email.com
   - **Contraseña**: Min 6 caracteres, 1 mayúscula, 1 número
   - **Confirmar**: Repite la contraseña
3. Presiona "Registrarse"

### Iniciar Sesión

1. Usa tu correo y contraseña
2. Presiona "Iniciar Sesión"
3. Se te redirige al dashboard

## 5️⃣ Funcionalidades Principales

### 📱 Dashboard (Inicio)

- Ver estadísticas de publicaciones
- Acceso rápido a crear post
- Ver publicaciones recientes

### ➕ Crear Publicación

1. Presiona "Crear" en la barra inferior
2. Describe qué deseas promocionar (ej: "Promocionar hamburguesa gourmet")
3. Presiona "Generar Contenido"
4. Edita el contenido generado si lo deseas
5. Presiona "Crear Publicación"

### 📝 Mis Publicaciones

- Ve todas tus publicaciones
- Filtra por estado (todos, borradores, publicados)
- Edita, elimina o publica en Instagram
- Presiona en una publicación para ver detalles

### ⏰ Historial

- Timeline de todas tus actividades
- Ve cuándo creaste o publicaste posts
- Actividad organizada por fecha

### 👤 Perfil

- Ve tu información personal
- Edita tu perfil
- Cambia tu contraseña
- Cierra sesión

## 🔑 Credenciales de Prueba

Si tu backend te proporciona usuarios de prueba:

```
Email: test@example.com
Contraseña: Test123456
```

## 📡 Flujo de Datos

```
Login/Register
    ↓
Backend Authentication (JWT Token)
    ↓
Store Token & User (AsyncStorage)
    ↓
AuthContext (Estado Global)
    ↓
Acceso a todos los Endpoints
```

## 🛑 Solución de Problemas

### "Network Error" o no se conecta al backend

```bash
# Verifica que el backend esté corriendo
curl http://localhost:3000/health

# Si usas Expo Go en dispositivo físico
# Usa la IP local en lugar de localhost:
# 192.168.x.x:3000
```

### "Cannot find module" error

```bash
npm install
# Si continúa:
npm cache clean --force
npm install
```

### Layout/estilos rotos

```bash
npm start -- -c  # -c limpia el caché
```

### AsyncStorage error

```bash
npm install @react-native-async-storage/async-storage
```

## 📱 Testing en Dispositivos Reales

### Android
1. Descarga Expo Go desde Google Play
2. En tu PC ejecuta `npm start`
3. Escanea el QR con tu teléfono
4. Se abrirá la app automáticamente

### iOS
1. Descarga Expo Go desde App Store
2. En tu PC ejecuta `npm start`
3. Escanea el QR con la cámara o Expo Go
4. Se abrirá la app automáticamente

## 🏗️ Estructura de Carpetas Importante

```
sam-mkt-app/
├── services/       ← Integración con API
├── contexts/       ← Estado global
├── screens/        ← Pantallas principales
├── components/     ← Componentes reusables
├── types/          ← Tipos TypeScript
└── app/            ← Rutas (Expo Router)
```

## 📚 Próximos Pasos

1. ✅ Instalar dependencias
2. ✅ Configurar backend URL
3. ✅ Iniciar app
4. ✅ Crear cuenta
5. ✅ Probar funcionalidades
6. 🔄 Personalizar diseño si lo deseas

## 💡 Tips

- Todos los cambios se guardan automáticamente (hot reload)
- Usa `console.log()` para debug
- Abre la consola con `Ctrl+J` (web) o `Cmd+D` (iOS)
- Los errores se muestran en rojo en el emulador/dispositivo

## 🎯 Validaciones Importante

Antes de usar en producción:
- [ ] Cambiar API URL a producción
- [ ] Configurar HTTPS
- [ ] Usar Secure Store en lugar de AsyncStorage
- [ ] Implementar Refresh Tokens
- [ ] Añadir logging y error tracking
- [ ] Optimizar performance
- [ ] Probar en dispositivoreal

## 📞 Contacto

Para problemas o preguntas, contacta al equipo de desarrollo.

¡Disfruta desarrollando con S.A.M! 🚀

