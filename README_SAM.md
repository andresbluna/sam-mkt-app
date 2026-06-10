# S.A.M - Sistema de Asistencia de Marketing para Negocios Pequeños

Una aplicación mobile React Native con Expo para gestionar contenido de marketing y publicaciones en redes sociales con asistencia de IA.

## 🚀 Características Principales

- **Autenticación**: Login y registro seguros con persistencia de sesión
- **Generación de Contenido IA**: Usa Gemini API para generar captions y hashtags
- **Gestión de Publicaciones**: CRUD completo de posts (crear, leer, actualizar, eliminar)
- **Publicación en Instagram**: Publica directamente en redes sociales
- **Historial de Actividad**: Timeline de eventos y acciones
- **Perfil de Usuario**: Gestión de información personal
- **Dashboard Moderno**: Interface intuitiva tipo SaaS

## 📋 Tecnologías

- **React Native** 0.81.5
- **Expo** 54.x
- **TypeScript** 5.9
- **Expo Router** (File-based routing)
- **Axios** (HTTP client)
- **React Context API** (State management)
- **AsyncStorage** (Persistent storage)
- **date-fns** (Date formatting)

## 🛠️ Instalación

### Requisitos Previos

- Node.js 18+ o superior
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Backend NestJS corriendo en `http://localhost:3000`

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
cd C:\Desarrollo\sam-mkt-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar la API**

Editar `services/api.ts` y actualizar `API_BASE_URL` si es necesario:
```typescript
const API_BASE_URL = 'http://localhost:3000';
```

4. **Iniciar la aplicación**
```bash
npm start
```

Luego seleccionar:
- `i` para iOS
- `a` para Android
- `w` para web

## 📁 Estructura del Proyecto

```
sam-mkt-app/
├── app/
│   ├── (tabs)/              # Navegación principal en tabs
│   │   ├── home.tsx         # HomeScreen
│   │   ├── create.tsx       # CreatePostScreen
│   │   ├── posts.tsx        # PostsScreen
│   │   ├── history.tsx      # HistoryScreen
│   │   └── profile.tsx      # ProfileScreen
│   ├── login.tsx            # LoginScreen
│   ├── register.tsx         # RegisterScreen
│   ├── post/
│   │   └── [id].tsx         # PostDetailScreen
│   └── _layout.tsx          # Root layout con navegación
│
├── components/
│   ├── ui/
│   │   ├── CustomButton.tsx    # Botón reutilizable
│   │   ├── CustomInput.tsx     # Input reutilizable
│   │   ├── LoadingSpinner.tsx  # Cargador
│   │   ├── ErrorMessage.tsx    # Mensaje de error
│   │   ├── SuccessMessage.tsx  # Mensaje de éxito
│   │   ├── PostCard.tsx        # Tarjeta de publicación
│   │   └── Header.tsx          # Header genérico
│   └── (otros componentes)
│
├── services/
│   ├── api.ts                  # Cliente Axios centralizado
│   ├── auth.service.ts         # Autenticación
│   ├── user.service.ts         # Gestión de usuario
│   ├── posts.service.ts        # Gestión de posts
│   ├── gemini.service.ts       # Generación IA
│   └── social.service.ts       # Publicación en redes
│
├── contexts/
│   ├── AuthContext.tsx         # Contexto de autenticación
│   ├── UserContext.tsx         # Contexto de usuario
│   └── PostsContext.tsx        # Contexto de publicaciones
│
├── screens/                    # Pantallas principales
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── CreatePostScreen.tsx
│   ├── PostsScreen.tsx
│   ├── HistoryScreen.tsx
│   └── ProfileScreen.tsx
│
├── types/
│   └── index.ts               # Tipos TypeScript
│
├── utils/
│   └── validation.ts          # Funciones de validación
│
├── constants/
│   └── theme.ts               # Colores y tema
│
├── hooks/                     # Custom hooks
└── package.json

```

## 🔑 Endpoints del Backend Integrados

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión

### Usuarios
- `GET /users/:id` - Obtener usuario
- `PATCH /users/:id` - Actualizar usuario

### Publicaciones
- `POST /posts` - Crear publicación
- `GET /posts` - Obtener todas las publicaciones
- `GET /posts/:id` - Obtener publicación específica
- `PATCH /posts/:id` - Actualizar publicación
- `DELETE /posts/:id` - Eliminar publicación
- `POST /posts/:id/publish` - Publicar en redes

### IA
- `POST /gemini/generate` - Generar contenido con IA

### Redes Sociales
- `GET /social/user/:id` - Obtener cuentas sociales del usuario
- `POST /social` - Conectar cuenta social
- `POST /instagram/publish` - Publicar en Instagram

## 🎨 Colores de la Aplicación

- **Primario**: #2563EB (Azul)
- **Secundario**: #06B6D4 (Cyan)
- **Fondo**: #F8FAFC (Gris claro)
- **Tarjetas**: #FFFFFF (Blanco)
- **Éxito**: #10B981 (Verde)
- **Error**: #EF4444 (Rojo)

## 📱 Pantallas Principales

### 1. **Login & Register**
- Validación de campos
- Mensajes de error claros
- Persistencia de sesión

### 2. **Home**
- Dashboard con estadísticas
- Accesos rápidos
- Publicaciones recientes
- Bienvenida personalizada

### 3. **Crear Publicación**
- Generación de contenido con IA
- Edición de captions y hashtags
- Interfaz intuitiva de dos pasos

### 4. **Mis Publicaciones**
- Filtros por estado (todos, borradores, publicados)
- Edición y eliminación
- Estado actualizado en tiempo real

### 5. **Historial**
- Timeline de actividades
- Histórico de publicaciones
- Eventos ordenados por fecha

### 6. **Perfil**
- Información del usuario
- Edición de perfil
- Cambio de contraseña
- Cerrar sesión

## 🔐 Manejo de Autenticación

La aplicación utiliza:
- **JWT Token**: Almacenado en AsyncStorage
- **Context API**: Para estado global de autenticación
- **Interceptores**: Axios agrega automáticamente el token a las peticiones
- **Persistencia**: El usuario se mantiene logueado entre sesiones

## 📝 Validaciones Implementadas

- **Email**: Formato válido
- **Contraseña**: Mínimo 6 caracteres, 1 mayúscula, 1 número
- **Nombre**: Mínimo 2 caracteres
- **Captions**: No puede estar vacío
- **Prompts IA**: Mínimo 10 caracteres

## 🚀 Scripts Disponibles

```bash
npm start         # Iniciar dev server
npm android       # Abrir en Android
npm ios           # Abrir en iOS
npm web           # Abrir en web
npm lint          # Ejecutar ESLint
npm reset-project # Resetear la estructura del proyecto
```

## 🤝 Integración con Backend

La aplicación está lista para conectar con cualquier backend que siga la estructura especificada de endpoints. Para cambiar la URL base:

```typescript
// services/api.ts
const API_BASE_URL = 'http://tu-backend.com';
```

## 📦 Dependencias Principales

```json
{
  "@react-navigation/bottom-tabs": "^7.4.0",
  "@react-navigation/native": "^7.1.8",
  "@react-navigation/stack": "^7.1.0",
  "axios": "^1.6.0",
  "date-fns": "^3.0.0",
  "expo-router": "~6.0.23",
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

## 🐛 Troubleshooting

### Error: Cannot find module 'react-native-async-storage'
```bash
npm install @react-native-async-storage/async-storage
```

### Error: Metro bundler
```bash
npm start -- -c
```

### Limpiar cache
```bash
npm start -- --clear
```

## 📞 Soporte

Para problemas o sugerencias, contacta al equipo de desarrollo.

## 📄 Licencia

Proyecto propietario - S.A.M

