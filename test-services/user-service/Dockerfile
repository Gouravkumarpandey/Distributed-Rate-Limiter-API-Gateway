FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY test-services/user-service test-services/user-service
COPY packages packages
RUN npm install
WORKDIR /app/test-services/user-service
EXPOSE 3001
CMD ["npm", "run", "dev"]
