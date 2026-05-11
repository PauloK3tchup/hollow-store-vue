# Kubernetes Deploy

Use estes manifestos para rodar o aplicativo Vue no Kubernetes.

## Passos básicos

1. Buildar a imagem Docker:

```bash
IMAGE=<seu-registry>/hollow-store-vue:latest
docker build -t "$IMAGE" .
```

2. Subir a imagem para o registry:

```bash
docker push "$IMAGE"
```

3. Atualizar a imagem no manifesto:

- Abra `k8s/deployment.yaml`
- Substitua `your-registry/hollow-store-vue:latest` por seu `IMAGE`

4. Aplicar os manifestos:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

## Testando localmente

Se estiver usando `minikube` ou `kind`, você pode usar `minikube image load "$IMAGE"` ou `kind load docker-image "$IMAGE"` antes de aplicar.

## Acesso

- Se você usa ingress NGINX, configure o host `hollow-store.local` no seu `/etc/hosts` apontando para o IP do cluster.
- Caso queira expor diretamente, altere `k8s/service.yaml` para `type: NodePort`.
