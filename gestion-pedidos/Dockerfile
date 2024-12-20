# Usar una imagen base de Node.js
FROM node:20

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código del proyecto
COPY . .

# Exponer el puerto donde corre el servidor
EXPOSE 3001

# Iniciar la aplicación
CMD ["node", "app.js"]

