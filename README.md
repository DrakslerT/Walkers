# Lastni projekt pri predmetu TPO

Vsaka skupina, ki je sestavljena iz 4 oz. 5 članov, mora razviti lastni projekt (LP) na izbrani problemski domeni, in sicer od **predloga projekta** do **implementacije**, kjer je podrobna razdelitev naslednja:

- **1. LP** - [Predlog projekta](docs/predlog-projekta),
- **2. LP** - [Zajem zahtev](docs/zajem-zahtev),
- **3. LP** - [Načrt rešitve](docs/nacrt) in
- **4. LP** - [Implementacija](src).

## Implementacija

[![CD for DogWalkers](https://github.com/tpo-2020-2021/LP234-11/actions/workflows/CD.yml/badge.svg?branch=production)](https://github.com/tpo-2020-2021/LP234-11/actions/workflows/CD.yml)
[![CI for DogWalkers](https://github.com/tpo-2020-2021/LP234-11/actions/workflows/CI.yml/badge.svg?branch=stage)](https://github.com/tpo-2020-2021/LP234-11/actions/workflows/CI.yml)

[Production Live site](https://tpo11-dogwalkers.herokuapp.com/)


### Projektna struktura za implementacijo

```md
src
│   README.md
|   .gitkeep 
│
└─── server
│   │   server.js <- server side router and middleware
│   │   ...
│   │
│   └───controllers <- controllers
│   |       AuthController.js
│   |       ProfileController.js
│   |       ...
|   └───DB <- instance connections to DB
|   |        BazaTransakcij.js
|   |        ...
|   └───middleware <- custom expressjs middleware
|           validationInputs.js
|            ...
│   
└─── web
|    │   ...
|    │   
|    └───src
│       │   Router.tsx <- client side routing
|       |   App.tsx <- App
│       │   ...
|       └───pages <- Views 
|       |     └───Iskalnik
|       |           index.tsx <- markup for GUI
|       |           iskalnik.module.css <- styles for index.tsx
|       |    ...
|       └───components <- shared components eg. navbar, footer, card..
|       └───shared <- shared util functions eg. access token, http,..
|
|
test <- project tests
└───
|    Auth.test.js <- .. define tests like *.test.js
|    ...
|    |
|    └───coverage <- tests coverage report

```

### Kako pognati razvojno okolje

Poskrbite, da si s pomočjo DDL skripte ustvarite delujoče MySQL bazo.
Po potrebi si prilagodite `.env` datoteko v server direktoriju.

1. Run server:

```bash
cd src/server/

yarn

yarn dev
```

2. Run web application:

```bash
cd src/web/

yarn

yarn dev
```
