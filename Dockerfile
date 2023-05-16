FROM andrewklyuchnikov/leaders-backend:latest as django-static
RUN python manage.py collectstatic

FROM node:19-alpine as builder
ARG VITE_API_URL=https://leaders.rubles.lol/api
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV VITE_API_URL=$VITE_API_URL
RUN yarn build

#nginx
FROM nginx:1.23.4-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=django-static /code/static /usr/share/nginx/html/static
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
