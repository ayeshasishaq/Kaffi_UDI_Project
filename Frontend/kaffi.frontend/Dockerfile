FROM node:20-alpine AS build

WORKDIR /src
COPY . ./
RUN npm ci
ENV VITE_API_URL=https://ca-kaffi-backend.gentlegrass-7048958f.norwayeast.azurecontainerapps.io
RUN npm run build

FROM nginx:alpine AS base
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
