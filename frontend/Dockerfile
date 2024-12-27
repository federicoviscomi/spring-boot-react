## Build phase

FROM node:22.11 as build

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./eslint.config.js ./eslint.config.js
COPY ./index.html ./index.html
COPY ./tsconfig.app.json ./tsconfig.app.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.node.json ./tsconfig.node.json
COPY ./vite.config.ts ./vite.config.ts

#RUN find . -maxdepth 2

RUN npm run build



## Serve phase
FROM nginx:1.27.2

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
