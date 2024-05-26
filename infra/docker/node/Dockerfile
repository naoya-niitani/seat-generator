FROM node:20.12.2

ENV TZ Asia/Tokyo

WORKDIR /var/www/app

RUN apt-get update && \
    apt-get install -y mkcert && \
    npm install -g npm@latest pnpm@latest

# COPY package.json /var/www/app/
# COPY pnpm-lock.yaml /var/www/app/

# RUN pnpm install

# COPY ./ /var/www/app/

# CMD [ "pnpm", "run", "dev", "--https" ]
