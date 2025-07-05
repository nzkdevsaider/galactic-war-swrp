# Galactic War SWRP

![map](/public/image.png)

Galactic War SWRP is an interactive map that simulates the progress of a galactic war, inspired by Star Wars roleplay servers.

## Features

- Allows you to view planets, routes and consult information about each one.
- Add new planets or routes to the galactic map to a database.
- API to query information about planets on a specific map, planet or route.

## Plans to Future

- Adding styles/textures to planets and routes.
- Add an administration panel to facilitate the addition of planets, routes and update their status.

## How To Contribute

- Take some inspiration from [solutions that already exist](https://helldiverscompanion.com/)
- [Open a PR](https://github.com/nzkdevsaider/galactic-war-swrp/pulls) with any possible improvement; you are free to do so

## Development

Install dependencies & run a development server:

```bash
pnpm i
pnpm run dev
```

Run the initial migration script to load test data:

```bash
pnpm run db:seed
```
