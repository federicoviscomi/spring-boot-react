## Build phase

FROM node:22.11 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


## Serve phase
FROM nginx:1.27.2

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
