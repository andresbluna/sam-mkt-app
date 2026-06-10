# 📡 Guía de Endpoints - S.A.M Frontend

## 🔑 Autenticación

### Registrar Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "SecurePass123"
}

Response 201:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cA...",
  "user": {
    "id": "user-123",
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "createdAt": "2026-06-10T10:00:00Z"
  }
}
```

### Iniciar Sesión
```http
POST /auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "SecurePass123"
}

Response 200:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cA...",
  "user": {
    "id": "user-123",
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "createdAt": "2026-06-10T10:00:00Z"
  }
}
```

## 👤 Usuarios

### Obtener Perfil
```http
GET /users/:id
Authorization: Bearer <token>

Response 200:
{
  "id": "user-123",
  "email": "juan@example.com",
  "name": "Juan Pérez",
  "profileImage": "https://...",
  "plan": "starter",
  "createdAt": "2026-06-10T10:00:00Z",
  "updatedAt": "2026-06-10T10:00:00Z"
}
```

### Actualizar Perfil
```http
PATCH /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Juan Carlos Pérez",
  "profileImage": "https://..."
}

Response 200:
{
  "id": "user-123",
  "email": "juan@example.com",
  "name": "Juan Carlos Pérez",
  "profileImage": "https://...",
  "plan": "starter",
  "createdAt": "2026-06-10T10:00:00Z",
  "updatedAt": "2026-06-10T10:30:00Z"
}
```

## 📝 Publicaciones

### Crear Publicación
```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Salchipapa picantona",
  "caption": "Disfruta de nuestras deliciosas salchipapas con salsas caseras...",
  "hashtags": ["salchipapa", "comida", "delicioso"],
  "image": "https://..."
}

Response 201:
{
  "id": "post-456",
  "userId": "user-123",
  "title": "Salchipapa picantona",
  "caption": "Disfruta de nuestras deliciosas salchipapas con salsas caseras...",
  "hashtags": ["salchipapa", "comida", "delicioso"],
  "image": "https://...",
  "status": "draft",
  "createdAt": "2026-06-10T10:00:00Z",
  "updatedAt": "2026-06-10T10:00:00Z"
}
```

### Obtener Todas las Publicaciones
```http
GET /posts
Authorization: Bearer <token>

Response 200:
[
  {
    "id": "post-456",
    "userId": "user-123",
    "title": "Salchipapa picantona",
    "caption": "Disfruta de nuestras deliciosas salchipapas...",
    "hashtags": ["salchipapa", "comida"],
    "image": "https://...",
    "status": "draft",
    "createdAt": "2026-06-10T10:00:00Z"
  },
  ...
]
```

### Obtener Publicación Específica
```http
GET /posts/:id
Authorization: Bearer <token>

Response 200:
{
  "id": "post-456",
  "userId": "user-123",
  "title": "Salchipapa picantona",
  "caption": "Disfruta de nuestras deliciosas salchipapas...",
  "hashtags": ["salchipapa", "comida"],
  "image": "https://...",
  "status": "draft",
  "createdAt": "2026-06-10T10:00:00Z"
}
```

### Actualizar Publicación
```http
PATCH /posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "caption": "Nueva descripción...",
  "hashtags": ["nuevo", "hashtag"],
  "status": "draft"
}

Response 200:
{
  "id": "post-456",
  "userId": "user-123",
  "caption": "Nueva descripción...",
  "hashtags": ["nuevo", "hashtag"],
  "image": "https://...",
  "status": "draft",
  "updatedAt": "2026-06-10T10:30:00Z"
}
```

### Eliminar Publicación
```http
DELETE /posts/:id
Authorization: Bearer <token>

Response 204: No Content
```

### Publicar en Instagram
```http
POST /posts/:id/publish
Authorization: Bearer <token>
Content-Type: application/json

{
  "platform": "instagram"
}

Response 200:
{
  "success": true,
  "message": "Publicación enviada a Instagram",
  "publishedAt": "2026-06-10T10:35:00Z"
}
```

## 🤖 Generación de Contenido IA (Gemini)

### Generar Contenido
```http
POST /gemini/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Crear un post atractivo para promocionar hamburguesas gourmet con queso artesanal"
}

Response 200:
{
  "caption": "🍔 ¡DESCUBRE NUESTRAS HAMBURGUESAS GOURMET! 🧀\n\n¿Buscas algo diferente? Nuestras hamburguesas artesanales con queso gourmet son la combinación perfecta de sabor y calidad...",
  "hashtags": ["hamburguesa", "gourmet", "queso", "comida", "delicioso", "artesanal"]
}
```

## 📱 Redes Sociales

### Obtener Cuentas Sociales del Usuario
```http
GET /social/user/:id
Authorization: Bearer <token>

Response 200:
[
  {
    "id": "social-123",
    "userId": "user-123",
    "platform": "instagram",
    "accountId": "instagram_id_123",
    "accountName": "@minegocios",
    "isConnected": true,
    "connectedAt": "2026-06-01T10:00:00Z"
  }
]
```

### Conectar Cuenta Social
```http
POST /social
Authorization: Bearer <token>
Content-Type: application/json

{
  "platform": "instagram",
  "accountId": "instagram_id_123",
  "accountName": "@minegocios"
}

Response 201:
{
  "id": "social-123",
  "userId": "user-123",
  "platform": "instagram",
  "accountId": "instagram_id_123",
  "accountName": "@minegocios",
  "isConnected": true,
  "connectedAt": "2026-06-10T10:00:00Z"
}
```

### Publicar en Instagram
```http
POST /instagram/publish
Authorization: Bearer <token>
Content-Type: application/json

{
  "postId": "post-456"
}

Response 200:
{
  "success": true,
  "message": "Publicado en Instagram exitosamente",
  "publishedAt": "2026-06-10T10:35:00Z"
}
```

## 🔄 Headers Requeridos

Todos los endpoints (excepto `/auth/*`) requieren:

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 📊 Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Eliminado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido/expirado |
| 403 | Forbidden - Acceso denegado |
| 404 | Not Found - Recurso no encontrado |
| 500 | Server Error - Error del servidor |

## 🔐 Seguridad

- **JWT Token**: Se envía automáticamente en todos los requests
- **Token Expiration**: El token expira tras 24 horas
- **Refresh Token**: El backend puede devolver un refresh token
- **CORS**: Configurado para aceptar requests del frontend

## 📥 Ejemplo de Request Completo (cURL)

```bash
# Registrarse
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "SecurePass123"
  }'

# Obtener posts (con token)
curl -X GET http://localhost:3000/posts \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cA..."

# Crear post
curl -X POST http://localhost:3000/posts \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cA..." \
  -H "Content-Type: application/json" \
  -d '{
    "caption": "Contenido del post",
    "hashtags": ["hashtag1", "hashtag2"]
  }'
```

## ⚠️ Manejo de Errores

### Error Response
```json
{
  "message": "Descripción del error",
  "statusCode": 400,
  "error": "Bad Request"
}
```

### Ejemplos de Errores Comunes

**Email ya existe:**
```json
{
  "message": "El correo ya está registrado",
  "statusCode": 400,
  "error": "Bad Request"
}
```

**Token expirado:**
```json
{
  "message": "Token expirado",
  "statusCode": 401,
  "error": "Unauthorized"
}
```

**Post no encontrado:**
```json
{
  "message": "Publicación no encontrada",
  "statusCode": 404,
  "error": "Not Found"
}
```

## 🧪 Testing

Todos estos endpoints pueden probarse con:
- **Postman**: Crear una colección con los endpoints
- **Insomnia**: Importar endpoints
- **cURL**: Comandos en terminal
- **Frontend**: La aplicación integra todos estos endpoints

## 📖 Documentación del Backend

Para más información, consulta la documentación del backend NestJS en:
- Swagger API: `http://localhost:3000/api`
- Documentación: README del backend

