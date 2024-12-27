# Use Node.js as the base image
FROM cypress/included:13.17.0

# Set the working directory inside the container
WORKDIR /e2e

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the Cypress project
COPY . .

# Run Cypress tests by default
CMD ["npm", "run", "e2e:containerized"]
