# Используем Node.js образ
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Компиляция TypeScript
RUN npm run build

# Открываем порт
EXPOSE 5007

# Запуск приложения
CMD ["node", "dist/main"]
