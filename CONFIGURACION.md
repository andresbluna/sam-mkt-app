# Configuración de S.A.M

## Configuración del Backend

### URL de la API

Editar `services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3000'; // Cambiar según tu backend
```

Para producción:
```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://tu-api.com';
```

## Variables de Entorno

Crear `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_APP_NAME=S.A.M
EXPO_PUBLIC_VERSION=1.0.0
```

## Acceso a Variables de Entorno en el Código

```typescript
const API_URL = process.env.EXPO_PUBLIC_API_URL;
```

## Configuración de Gemini API

En el backend, necesitas configurar tu clave de API de Gemini:

```bash
GEMINI_API_KEY=tu_clave_aqui
```

## Configuración de Instagram Integration

El backend debe estar configurado con:

```bash
INSTAGRAM_ACCESS_TOKEN=tu_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=tu_id
```

## Base de Datos

Usar la misma base de datos que tu backend NestJS.

## Pruebas

### Usuarios de Prueba

```
Email: test@example.com
Contraseña: Test123456
```

### Endpoints de Prueba

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}'

# Obtener posts
curl -X GET http://localhost:3000/posts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Desarrollo Local

1. Inicia el backend NestJS:
```bash
npm run start:dev
```

2. En otra terminal, inicia S.A.M:
```bash
cd sam-mkt-app
npm start
```

3. Selecciona la plataforma (iOS, Android, Web)

## Debugging

### Console Logs
Abierto la consola de Metro con `Ctrl+J` en web o `CMD+D` en iOS.

### Network Inspector
```bash
npx expo-dev-client
```

### Redux DevTools (si se implementa)
```bash
npm install redux-devtools-extension
```

## Performance

### Tips de Optimización

1. Usar `React.memo()` para componentes que no cambian frecuentemente
2. Implementar paginación en listas largas
3. Usar `useMemo` y `useCallback` cuando sea necesario
4. Comprimir imágenes antes de subir

### Tamaño de Bundle

```bash
npm run analyze
```

## Seguridad

- ✅ Tokens guardados en AsyncStorage
- ✅ HTTPS requerido en producción
- ✅ Validación de inputs en cliente y servidor
- ✅ CORS configurado en backend

Para más seguridad en producción:
- Usar Secure Store (expo-secure-store) en lugar de AsyncStorage
- Implementar refresh tokens
- Añadir fingerprint biométrico

## Deployment

### Building APK for Android
```bash
eas build --platform android
```

### Building IPA for iOS
```bash
eas build --platform ios
```

### OTA Updates
```bash
eas update
```

## Recursos Útiles

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router](https://docs.expo.dev/routing/introduction/)
- [React Navigation](https://reactnavigation.org)

