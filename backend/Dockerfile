# Use an official Node.js image as the base
FROM node:22

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install -g pnpm && pnpm install

# Copy the application code to the working directory
COPY . .

# Expose the port
EXPOSE 4000

# Run the command to start the development server
CMD ["sh", "-c", "pnpm run migration:run && pnpm run seed && pnpm run start"]
