# Nick's Quick Nix Tutorial

[![build-and-publish](https://github.com/Dieff/COS398-final/actions/workflows/build-and-publish.yaml/badge.svg)](https://github.com/Dieff/COS398-final/actions/workflows/build-and-publish.yaml)

Created for my final project in COS 398: client side web development Fall 2023
at Umaine.

Visit live at [https://dieff.github.io/COS398-final/](https://dieff.github.io/COS398-final/)!

## Design

The focus of COS 398 is client side web development. The class focuses on static site development with HTML, SCSS, and Typescript.

This website is a static site built from templates using Gulp. The Gulp runs a series of build tasks that assemple a fully compiled
website in `public/`. The code can be found in `gulpfile.js`. The following tools are used:

- Pug templates. These allow easy HTML templating and reuseable components.
- SCSS. Allows a common theme to be shared among all pages.
- Typescript. Implements the interactive site elements

All of the site's source code can be found under `src`.

## Development

The easy way to get started is by using [Nix](https://nixos.org/) and [direnv](https://direnv.net/).

```
direnv allow
```

Nix is not a hard dependency (because I didn't want to use it with Github actions).
You can also run all build tools through NPM.

To build a copy of the site:

```
npm run build
```

Resources:

Nix

- https://learnxinyminutes.com/docs/nix/

Flakes

- https://christine.website/blog/nix-flakes-1-2022-02-21/

Packages

NixOS

Home Manager
