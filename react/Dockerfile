FROM node:10-alpine AS alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /app/
## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install
RUN npm install react-grid-layout
# Copy the contents of the project to the image
COPY . .
# Run 'npm start' when the container starts.
CMD ["npm", "start"]
