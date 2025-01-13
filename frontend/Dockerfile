# Use the official Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application
RUN npm run build

# Expose the application port
EXPOSE 5000

# Serve the app with a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

