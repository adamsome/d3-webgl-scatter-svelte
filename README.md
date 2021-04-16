# D3 WebGL Scatterplot Svelte

[Demo](https://d3-webgl.vercel.app)

Demonstrates rendering up to 1 million data points in a scatterplot using D3 WebGL rendering. Uses the following:

- [D3 v5.16.0](https://d3js.org) for rendering the chart axes and colors
  - [D3FC v15.0.4](https://d3fc.io) for its high-level abstraction for WebGL rendering
- [Svelte v3.0.0](https://reactjs.org)
- [Tailwind CSS v2.1.1](https://tailwindcss.com/) for CSS utility
- [TypeScript v4.0.0](https://www.typescriptlang.org) for build-time type safety
  - [Prettier v2.0.2](https://prettier.io/) for code formatting

## Run in development mode

```bash
npm install
npm run dev
```

## Run in production mode

```bash
npm install
npm run build
npm run start
```
