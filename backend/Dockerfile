FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY backend backend
COPY packages packages
RUN npm install
WORKDIR /app/backend
EXPOSE 3000
CMD ["npm", "run", "dev"]
