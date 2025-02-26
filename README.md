## Banco de dados com docker

### Listando containers

```bash
docker ps -a
```

-a: até os ocultos/desligados

### Subir/Criar container Docker na sua maquina

Como temos o arquivo docker-compose.yml podemos simplesmente rodar:

```bash
docker compose up -d
```

### Iniciando banco de dados docker depois de criado o container (quando o container estiver desligado)

```bash
docker start ID_CONTAINER
```

## Iniciando/subindo projeto

```bash
yarn start
```
