# Stage 1: Development
FROM node:alpine as development
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source code to the container
COPY . .

# Expose the port Vite runs on (usually 5173)
EXPOSE 8001

# Command to run the development server
CMD ["npm", "run", "dev"]


# Stage 2: Build
FROM node:alpine as build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the project
RUN npm run build


# Stage 3: Production
FROM node:alpine as production
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules

# Expose the port your application will run on
EXPOSE 8001

# Start the server using Vite's preview mode or a production server
CMD ["npm", "run", "preview"]
