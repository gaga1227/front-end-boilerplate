# DT Test

#### Node and npm
Make sure you have Node and npm installed:

```sh
node --version
```
```sh
npm --version
```

#### Node Module Dependencies

Make sure all Node module dependencies are installed:
```sh
npm install
```

#### Gulp Task Runner and Command Line Interface (CLI)

Make sure Gulp CLI is installed:
```sh
npm install gulp-cli -g
```
```sh
gulp --version
```

#### Gulp Tasks

Default Task: Starts a local server in browser for development
```sh
gulp
```

Build Task: Builds all SCSS/CSS and JS files with linting
```sh
gulp build
```

Distribution Task: Prepares distribution artifacts including all files and assets to the 'dist' folder
```sh
gulp dist
```