# 📡 API Biblioteca Personal

Backend de la aplicación "Biblioteca Personal", desarrollado con **Node.js**, **Express**, **Sequelize** y **PostgreSQL**. Esta API permite gestionar libros y reseñas, incluye autenticación con Auth0 mediante JWT, validación de datos con Joi, y un sistema robusto de errores.

---

## 🚀 Tecnologías utilizadas

| Categoría         | Tecnología                               |
|-------------------|-------------------------------------------|
| Runtime           | [Node.js](https://nodejs.org/)            |
| Framework         | [Express](https://expressjs.com/)         |
| ORM               | [Sequelize](https://sequelize.org/)       |
| Base de datos     | [PostgreSQL](https://www.postgresql.org/) |
| Validación        | [Joi](https://joi.dev/)                   |
| Seguridad         | [Auth0 JWT](https://auth0.com/)           |
| Middleware errores| [Boom](https://hapi.dev/module/boom/)     |
| Dev Tools         | ESLint, Prettier, Nodemon, dotenv         |

---

## 📁 Estructura del proyecto

```text
📦 api-node-bd/
├── api/
│   ├── config/              # Configuración general (Sequelize, etc.)
│   │   └── config.js
│   ├── db/
│   │   ├── migrations/      # Migraciones actuales de la base de datos
│   │   ├── migrations-old/  # Migraciones anteriores o en desuso
│   │   └── models/          # Definición de modelos Sequelize
│   ├── libs/                # Librerías utilitarias
│   ├── middlewares/        # Middlewares de autenticación, validación, etc.
│   ├── routes/             # Definición de rutas y endpoints
│   ├── schemas/            # Esquemas de validación con Joi
│   ├── services/           # Lógica de negocio y acceso a datos
│   └── index.js            # Punto de entrada del servidor Express
├── postgres_data/          # Carpeta de volúmenes para base de datos (Docker)
├── .env                    # Variables de entorno
├── docker-compose.yml      # Configuración de servicios en contenedor
├── .sequelizerc            # Configuración CLI de Sequelize
├── .eslintrc.json          # Reglas de ESLint
├── vercel.json             # Configuración para despliegue en Vercel
├── package.json            # Dependencias y scripts de Node.js
└── README.md               # Documentación del proyecto
```

 🥑 Scripts disponibles

 ```bash
npm run dev                 # Inicia el servidor con nodemon
npm start                   # Inicia el servidor sin monitoreo
npm run lint                # Linting del código con ESLint
npm run migrations:generate --name nombre  # Crear nueva migración
npm run migrations:run                    # Aplicar migraciones
npm run migrations:revert                 # Revertir última migración
npm run migrations:delete                 # Revertir todas las migraciones
```

 🌐 Endpoints (ejemplo)

 ```bash
GET    /api/libros               # Listar libros
POST   /api/libros               # Crear libro
GET    /api/libros/:id           # Obtener un libro
PUT    /api/libros/:id           # Actualizar un libro
DELETE /api/libros/:id           # Eliminar un libro

POST   /api/libros/:id/reseñas   # Agregar reseña

```

🛡️ Segurida

Implementación de autenticación y autorización mediante JWT con Auth0.

Validación de entradas con Joi.

Manejo de errores centralizado con Boom.


🛠 Configuración del entorno
Crear un archivo .env con las siguientes variables:

 ```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=biblioteca
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña

AUTH0_DOMAIN=tu-dominio.auth0.com
AUTH0_AUDIENCE=tu-api-identifier

 ```
Ejecutar las migraciones:

 ```bash
npm run migrations:run

 ```
Iniciar el servidor:
 ```bash
Editar
npm run dev
 ```
📌 Estado del proyecto
✅ Backend funcional y desplegado
🛠️ Mejoras futuras: paginación, filtros por categoría/autor, unit testing, documentación con Swagger

📄 Licencia
MIT © 2025 Jose Fabio Ortega Estrada
