
# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy application files
COPY . .

# Set up a MariaDB database
RUN apk add --no-cache mariadb mariadb-client

# Copy setup scripts
COPY ./setup/init-db.sh /docker-entrypoint-initdb.d/

# Make scripts executable
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh

# Expose ports
EXPOSE 3002

# Start the application
CMD ["sh", "-c", "/docker-entrypoint-initdb.d/init-db.sh && npm start"]
