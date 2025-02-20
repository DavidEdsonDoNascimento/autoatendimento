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

## criando a migration

```bash
npx prisma migrate dev
```

a convenção é que adotemos letras minusculas e underline para o nome da migration,
logo o nome dessa primeira eu coloquei: add_initial_tables

## alteração pra deletar em cascata:

Caso eu delete um restaurante, quero que as categorias, produtos e pedidos sejam deletados
Para isso precisamos incluir a clausula onDelete: Cascate dentro da relação

## migration de alteração em schema.prisma

Sempre que você altera esse arquivo schema.prisma, você precisa criar uma migration
para refletir no seu banco

```bash
npx prisma migrate dev
```

o nome dessa alteração que inclui que foi deletar em cascata, vai ser:

## rodar as seed

Antes de rodar meu arquivo seed preciso adicionar o ts-node que executa arquivos ts

```bash
  yarn add -D ts-node@10.9.2
```

Depois de adicionada a biblioteca, preciso adicionar um comando no package.json

```bash
  "prisma": {
    "seed": "ts-node ./prisma/seed.ts"
  }
```

Depois é só rodar o comando com:

```bash
npx prisma db seed
```

## Adicionando Biblioteca que trabalha com o Tailwind

https://ui.shadcn.com/docs/installation/next

```bash
npx shadcn@2.3.0 init
```

Ela ja tem vários estilos prontos que utilizam tailwind
Essa biblioteca você instala os componentes a medida que necessitar deles por exemplo:
Quero colocar um Button na minha pagina eu vou e rodo:

```bash
npx shadcn@2.3.0 add button
```

E ele ira adicionar o código desse componente em seu projeto:
src/components/ui/button.tsx

agr é só chamar o componente onde quiser e podes personalizar ele visto que ele utiliza classes tailwind.

## Configurando fonte

Fui até layout.tsx e configurei a fonte Poppins,
o Nextjs ja tem integração direta com google-fonts

## configurando ESLint

adicionado plugin para ajustar as importações:

```bash
yarn add -D eslint-plugin-simple-import-sort@12.1.1
```

e no array eslintConfig (eslint.config.mjs) eu incluo alguns parâmetros.

Depois criei .vscode na raiz do projeto com o arquivo settings.json
e inclui um json pré configurado pra formatar os imports ao salvar

Depois disso vou adicionar o plugin para formatar classes do tailwind:

```bash
yarn add -D prettier-plugin-tailwindcss@0.6.5
```

Crie um arquivo .prettierrc.json na raiz do projeto
