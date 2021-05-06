# Dog walkers

Vse podrobnosti in načrt si lahko preberete v `../docs/*`

## Projektna struktura za implementacijo

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

```

## Kako pognati razvojno okolje

Poskrbite, da si s pomočjo DDL skripte ustvarite delujoče MySQL bazo.
Po potrebi si prilagodite `.env` datoteko v server direktoriju.

1. Run server:

```bash
cd server

yarn

yarn start
```

2. Run web application:

```bash
cd web

yarn

yarn start
```
