# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY . .

# Fazer o build
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Remover configuração padrão do nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos construídos do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]
