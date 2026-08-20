FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY test-services/payment-service test-services/payment-service
COPY packages packages
RUN npm install
WORKDIR /app/test-services/payment-service
EXPOSE 3002
CMD ["npm", "run", "dev"]
