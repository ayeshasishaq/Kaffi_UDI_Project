FROM node:20-alpine AS build

WORKDIR /src
COPY . ./
RUN npm ci
ENV VITE_API_URL=https://ca-kaffi-backend.gentlegrass-7048958f.norwayeast.azurecontainerapps.io
ARG VITE_AUTH0_DOMAIN
ARG VITE-AUTH0_CLIENT_ID
ENV VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}
ENV VITE_AUTH0_CLIENT_ID=${VITE-AUTH0_CLIENT_ID}
RUN npm run build

FROM nginx:alpine AS base
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
