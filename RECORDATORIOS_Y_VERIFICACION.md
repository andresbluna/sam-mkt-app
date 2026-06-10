# ⚠️ Recordatorios & Verificación Final - S.A.M

## 🔴 ACCIONES INMEDIATAS REQUERIDAS

### 1. Instalar Dependencias (OBLIGATORIO)
```bash
cd C:\Desarrollo\sam-mkt-app
npm install
```

**Si hay problemas de compatibilidad:**
```bash
npm install --legacy-peer-deps
```

### 2. Verificar Backend
Asegúrate que tu backend NestJS esté corriendo:
```bash
# En una terminal separada, en la carpeta del backend
npm run start:dev
# Debe estar en http://localhost:3000
```

### 3. Probar la Conexión
```bash
# En PowerShell
curl http://localhost:3000/health
# Debe retornar una respuesta válida
```

---

## ⚠️ PUNTOS CRÍTICOS A RECORDAR

### API URL
**Archivo**: `services/api.ts` (línea 4)

Asegúrate que esté configurada correctamente:
```typescript
const API_BASE_URL = 'http://localhost:3000';
```

Si usas un backend en producción:
```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://tu-api.com';
```

### Backend Endpoints Requeridos
El backend DEBE tener estos endpoints funcionando:

✅ POST /auth/register
✅ POST /auth/login
✅ GET /users/:id
✅ PATCH /users/:id
✅ POST /posts
✅ GET /posts
✅ GET /posts/:id
✅ PATCH /posts/:id
✅ DELETE /posts/:id
✅ POST /posts/:id/publish
✅ POST /gemini/generate
✅ GET /social/user/:id
✅ POST /instagram/publish

Si alguno falta, la app no funcionará correctamente.

### Gemini API
El backend debe estar configurado con la API key de Gemini para que funcione:
```bash
GEMINI_API_KEY=tu_clave_aqui
```

### Instagram Integration
Para publicar en Instagram, el backend necesita:
```bash
INSTAGRAM_ACCESS_TOKEN=tu_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=tu_id
```

---

## 🧪 PRUEBAS A REALIZAR

### Test 1: Registrarse
1. Abre la app en Expo Go
2. Presiona "Regístrate aquí"
3. Llenar formulario con:
   - Nombre: Test User
   - Email: test@example.com
   - Pass: TestPass123
4. Presionar "Registrarse"
5. ✅ Should be redirected to home

### Test 2: Login
1. Logout
2. Login con test@example.com / TestPass123
3. ✅ Should see dashboard

### Test 3: Crear Publicación
1. Presiona "Crear" en tab
2. Ingresa: "promocionar café gourmet"
3. Presiona "Generar Contenido"
4. ✅ Debe generar caption y hashtags

### Test 4: Ver Publicaciones
1. Presiona "Posts"
2. ✅ Debe mostrar la publicación creada

### Test 5: Editar Perfil
1. Presiona "Perfil"
2. Presiona "Editar Perfil"
3. Cambia el nombre
4. Presiona "Guardar"
5. ✅ Debe actualizar

### Test 6: Logout
1. En perfil, presiona "Cerrar Sesión"
2. ✅ Debe volver a login

---

## 🐛 TROUBLESHOOTING COMÚN

### Error: "Cannot find module"
```bash
npm install
npm cache clean --force
npm install
```

### Error: "Network Error / Cannot reach backend"
```bash
# Verificar backend
curl http://localhost:3000/health

# Si usas Android en dispositivo:
# Cambiar localhost por tu IP local
# 192.168.x.x:3000
```

### Error: "AsyncStorage is not available"
```bash
npm install @react-native-async-storage/async-storage
npm start -- -c
```

### Error: "Metro error"
```bash
npm start -- -c    # -c limpia cache
# o
npm start -- --reset-cache
```

### Error en login: "Invalid credentials"
- Verificar que el backend está corriendo
- Verificar que el usuario existe
- Ver los logs del backend

---

## 📋 VERIFICACIÓN PRE-LAUNCH

- [ ] npm install completó sin errores
- [ ] Backend corriendo en http://localhost:3000
- [ ] API URL está correctamente configurada
- [ ] Primeros 3 tests pasaron
- [ ] No hay errores en la consola
- [ ] La app responde rápidamente

---

## 🔧 CONFIGURACIONES IMPORTANTES

### Para Desarrollo
```bash
npm start
# Abre Expo Go
# Escanea QR
```

### Para iOS
```bash
npm ios
# O abrir en Xcode
```

### Para Android
```bash
npm android
# O abrir en Android Studio Emulator
```

### Para Web
```bash
npm web
# Abre en http://localhost:19006
```

---

## 📱 DISPOSITIVOS FÍSICOS

### iOS (desde Mac)
1. Instala Expo Go desde App Store
2. `npm start` en tu PC
3. Escanea QR desde Expo Go
4. App se abre automáticamente

### Android (desde PC/Mac)
1. Instala Expo Go desde Google Play
2. `npm start` en tu PC
3. Escanea QR desde cámara o Expo Go
4. App se abre automáticamente

### Nota para IP Local
Si las pruebas se hacen en dispositivo físico:
- Cambiar `localhost` por tu IP local
- Ej: `http://192.168.1.100:3000`

---

## 💡 TIPS & TRICKS

### Debug en Expo Go
- **Android**: Shake device y abre debug menu
- **iOS**: Cmd+D en simulator
- **Web**: F12 o Cmd+Option+I

### Limpiar Datos Persistentes
```bash
# Los datos se guardan en AsyncStorage
# Para borrarlos, ejecutar en console:
AsyncStorage.clear()
```

### Ver Token JWT
```bash
# En cualquier pantalla, ejecutar en console:
AsyncStorage.getItem('authToken').then(console.log)
```

### Cambiar API URL en tiempo de ejecución
```bash
# No es recomendado, pero en emergencia:
// En services/api.ts
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
```

---

## 🚀 PASOS DE DEPLOYMENT

### Build para Producción (Opcional)

```bash
# Primero, crear cuenta en Expo
# npx eas-cli@latest login

# Build Android
# eas build --platform android

# Build iOS
# eas build --platform ios

# OTA Updates
# eas update
```

---

## 📚 DOCUMENTACIÓN DISPONIBLE

- **README_SAM.md** - Documentación completa ← LEER PRIMERO
- **INICIO_RAPIDO.md** - Primeros 5 pasos
- **CONFIGURACION.md** - Variables de entorno
- **ENDPOINTS_API.md** - Todos los endpoints
- **IMPLEMENTACION_CHECKLIST.md** - Checklist
- **RESUMEN_EJECUTIVO.md** - Estado del proyecto
- **REFERENCIA_RAPIDA.md** - Accesos rápidos
- **Este archivo** - Recordatorios

---

## ❌ ERRORES COMUNES & SOLUCIONES

| Error | Solución |
|-------|----------|
| "Cannot GET /posts" | Backend no corriendo o endpoint falta |
| Token expirado | Logout y login de nuevo |
| App se congela | Revisar console.log en red |
| Imágenes no cargan | Verificar URL en responses |
| Validación falla | Revisar mensaje de error en UI |
| Empty list | Crear posts primero |

---

## ✨ PRÓXIMO PASO AHORA MISMO

```bash
# 1. Abre PowerShell en C:\Desarrollo\sam-mkt-app
# 2. Ejecuta:
npm install

# 3. Verifica el backend está corriendo
curl http://localhost:3000/health

# 4. Inicia la app:
npm start

# 5. Prueba en Expo Go
```

---

## 🎯 OBJETIVO

Una vez completes estos pasos, deberías tener:

✅ Frontend completamente funcional
✅ Conectado a tu backend NestJS
✅ Todas las pantallas funcionando
✅ IA generando contenido
✅ Posts publicables en Instagram
✅ Historial y perfil completos

---

## 📞 SI ALGO FALLA

1. **Primero**: Lee el error en la consola
2. **Segundo**: Check la sección TROUBLESHOOTING arriba
3. **Tercero**: Verifica que el backend esté corriendo
4. **Cuarto**: Lee los logs del backend
5. **Quinto**: Revisa ENDPOINTS_API.md si el endpoint existe

---

## ⭐ RECORDATORIO IMPORTANTE

**Este frontend está 100% listo. Solo necesita:**
1. npm install ✅
2. Backend corriendo ✅
3. npm start ✅

**¡Entonces funciona!**

---

**Última revisión: 10 de Junio, 2026**
**Status: ✅ READY TO USE**

