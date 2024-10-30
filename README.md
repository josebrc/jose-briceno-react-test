# 🛍️ Store App

## 📦 Instalación y Configuración

### Prerrequisitos

- **Node.js** v16+
- **npm** o **Yarn 3** instalado
- **Vite** (instalado como dependencia del proyecto)

### Instalación

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/tu-repositorio/store-app.git
   cd store-app
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

### 🛠️ Configuración del Archivo .env

He incluido un archivo `.env.example` en la raíz del proyecto, que puedes copiar y renombrar para crear tu propio archivo de configuración:

```bash
cp .env.example .env
```

## 🏃‍♂️ Pasos para Correr el Proyecto

1. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   # o
   yarn dev
   ```

   Esto iniciará la aplicación en modo desarrollo en [http://localhost:5173](http://localhost:5173).

## 🛠️ Generar el Build de Producción

Para construir la aplicación para producción:

```bash
npm run build
# o
yarn build
```

Esto generará una carpeta `dist` en la raíz del proyecto, que contiene el build para producción.

**Previsualiza el build** (opcional):

```bash
npm run preview
# o
yarn preview
```

Esto iniciará un servidor local para previsualizar el proyecto.

## 👤 Credenciales de Acceso Predeterminadas

Para realizar un login exitoso, utiliza las siguientes credenciales:

- **Email**: `mymail@mail.com`
- **Contraseña**: `Password1@`
