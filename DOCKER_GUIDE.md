# Guia de Upload do Hollow Store Vue no Docker Hub

## Pré-requisitos

- Docker instalado e configurado
- Conta no Docker Hub (https://hub.docker.com)
- Docker CLI autenticado com sua conta

## 1. Autenticar no Docker Hub

```bash
docker login
```

Será solicitado seu nome de usuário e senha/token do Docker Hub.

## 2. Build da Imagem

### Opção A: Build simples

```bash
docker build -t hollow-store-vue:latest .
```

### Opção B: Build com tag completa para Docker Hub

```bash
docker build -t seu-usuario/hollow-store-vue:1.0.0 .
```

Substitua `seu-usuario` pelo seu nome de usuário do Docker Hub.

## 3. Testar Localmente

```bash
docker run -p 8080:80 seu-usuario/hollow-store-vue:1.0.0
```

Acesse `http://localhost:8080` no seu navegador.

Ou use docker-compose:

```bash
docker-compose up
```

## 4. Push para Docker Hub

```bash
docker push seu-usuario/hollow-store-vue:1.0.0
```

Para marcar como versão mais recente (latest):

```bash
docker tag seu-usuario/hollow-store-vue:1.0.0 seu-usuario/hollow-store-vue:latest
docker push seu-usuario/hollow-store-vue:latest
```

## 5. Uso da Imagem

Qualquer um pode agora usar sua imagem:

```bash
docker pull seu-usuario/hollow-store-vue:1.0.0
docker run -p 80:80 seu-usuario/hollow-store-vue:1.0.0
```

## 6. Melhorias Opcionais

### Adicionar Metadata ao repositório Docker

No Docker Hub, você pode adicionar:

- Descrição do projeto
- Badge de status
- Documentação
- Links para o GitHub

### Multi-arch builds (opcional)

Para suportar múltiplas arquiteturas (amd64, arm64):

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t seu-usuario/hollow-store-vue:1.0.0 \
  --push .
```

### Automatizar builds com GitHub Actions (opcional)

Crie `.github/workflows/docker-build.yml` para builds automáticos no push.

## Notas

- **Segurança**: Use tokens do Docker Hub ao invés de senhas em CIs
- **Versionamento**: Mantenha tags semânticas (v1.0.0, v1.1.0, etc)
- **Tamanho**: A imagem usa Node Alpine + Nginx Alpine para minimizar tamanho
- **Cache**: O nginx está configurado com estratégia de cache para assets estáticos
- **SPA Routing**: O nginx está configurado para rotear todas as requisições para index.html
