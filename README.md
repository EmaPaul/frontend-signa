# Aplicación Frontend para Gestión de Marcas

## Descripción
Esta es una aplicación frontend construida con Next.js para la gestión de marcas. Permite a los usuarios visualizar, agregar, editar y eliminar registros de marcas de manera eficiente.

## Características Principales
- Interfaz intuitiva y amigable para la gestión de marcas
- Diseño responsivo con Tailwind CSS
- Integración con API REST para operaciones CRUD
- Modales para confirmación de eliminación y edición
- Vista adaptativa para dispositivos móviles y escritorio

## Tecnologías Utilizadas
- **Next.js 15.5.0** - Framework de React
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos para la interfaz
- **React Hook Form** - Manejo de formularios

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── navegacion/
│   │   │   ├── Navbar.js
│   │   │   └── Sidebar.js
│   │   ├── paginas/
│   │   │   ├── Panel.js
│   │   │   ├── ModalMarca.js
│   │   │   ├── ModalConfirmDelete.js
│   │   │   ├── Registro.js
│   │   │   └── SuccessModal.js
│   │   ├── Servicios/
│   │   │   └── marcas.servicios.js
│   │   └── css/
│   ├── panel/
│   │   └── page.js
│   ├── registro/
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── favicon.ico
└── lib/
    └── utils.js
```

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd front
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Crear archivo `.env.local` en la raíz del proyecto
   - Agregar las URLs de la API:
```
NEXT_PUBLIC_API_URL_DEV=<url-api-desarrollo>
NEXT_PUBLIC_API_URL_PROD=<url-api-producción>
```

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

## Funcionalidades

### Página Principal
- Navegación hacia el panel de marcas
- Opción para registrar nueva marca
- Diseño con colores corporativos (#E4344C y #FCECEF)

### Panel de Marcas
- Visualización de todas las marcas en formato tabla
- Opciones para ver, editar y eliminar marcas
- Estados visuales (Activo/No Activo)
- Diseño responsivo para móviles y escritorio

### Servicios API
- `GetMarcas()` - Obtener todas las marcas
- `getIdMarcas(id)` - Obtener marca por ID
- `addMarcas(body)` - Agregar nueva marca
- `updateMarcas(body, id)` - Actualizar marca existente
- `deleteMarcas(id)` - Eliminar marca

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en producción
- `npm run lint` - Ejecutar ESLint

## Vista en Produccion
Este proyecto esta desplegado en el siguiente enlace: `https://frontend-signa.vercel.app/`
