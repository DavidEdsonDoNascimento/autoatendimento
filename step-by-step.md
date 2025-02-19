# Criado o projeto com Nextjs

```bash
 npx create-next-app@15.1.6 .
```

# adicionado o prisma ao projeto

```bash
yarn add prisma@6.2.1
yarn add @prisma/client@6.2.1
```

## inicializando o prisma

```bash
 npx prisma init
```

## criando tabelas no schema.prisma

Criado a tabela Restaurant, MenuCategory, Product, Order e OrderProduct

ex:
vai no arquivo schema.prisma e cria o modelo Restaurant

```prisma
model Restaurant {
  id String @id @default(uuid())
  name String
  slug String
  description String
  ...
}
```

## formatar / validar arquivo prisma

```bash
 npx prisma format
```
