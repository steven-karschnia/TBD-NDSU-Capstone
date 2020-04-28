FROM node:10-alpine AS alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /app/
## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install
RUN yarn add react-beautiful-dnd && npm install react-grid-layout react-beautiful-dnd styled-components
# Copy the contents of the project to the image
COPY . .
# Run 'npm start' when the container starts.
CMD ["npm", "start"]
