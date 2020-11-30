FROM node:13.12.0-alpine
WORKDIR /app

# Buld
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# Serve app
FROM nginx:1.17-alpine
COPY --from=0 /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
