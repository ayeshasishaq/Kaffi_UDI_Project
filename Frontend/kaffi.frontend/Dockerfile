FROM node:20-alpine AS build

WORKDIR /src
COPY . ./
RUN npm ci
ENV VITE_API_URL=https://ca-kaffi-backend.gentlegrass-7048958f.norwayeast.azurecontainerapps.io
ENV VITE_AUTH0_DOMAIN=dev-ipgozdg83qob1vas.us.auth0.com
ENV VITE_AUTH0_CLIENT_ID=ZPRElB8GZf5NjiZYg6axRbKu0lc66c7N
RUN npm run build

FROM nginx:alpine AS base
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
