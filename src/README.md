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
|   └───models <- entities
|           Owner.js
|           Walker.js
|           Ad.js
|           Walk.js
|            ...
│   
└─── web
|    │   ...
|    │   
|    └───src
│       │   Router.tsx <- client side routing
│       │   ...
|       └───pages <- Views 
|       |     └───Iskalnik
|       |           index.tsx <- markup for GUI
|       |           styled.ts <- styles for index.tsx
|       |    ...
|       └───components <- shared components
|       └───utils <- shared util functions

```

## Kako pognati razvojno okolje

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
