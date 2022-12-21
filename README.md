# Backstop Boilerplate.

## Copy everything but readme and .gitignore into the root of your project. 
Add values for Backstop.JS and NPM to your project's .gitignore. Examples of
.gitignore values included with this repo.

## Setup
### Update files to match your project

### package.json
Change package name and description

### backstop_scenarios.js
Add dev and prod information. Oh, and your test routes.

### Set cookie data (optional)
Edit cookies.json in backstop_data/engine_scripts to send a special cookie. 

### Install dependencies from the main project directory
```npm install```

## Usage

### Create reference snapshots as needed
This is usually from the production env.

```npm run backstop:reference```
### Create any number of diffs from the reference. 
This is usually the lando env or platform

```npm run backstop:test```

### (Optional) Use a Global Install of Backstop

#### Install backstop cli globally if not installed. 
```npm install -g backstopjs```

#### Create reference snapshots as needed
This is usually from the production env.

```backstop reference --config=backstop_config.js --scenariosPath=backstop_scenarios.js```

#### Create any number of diffs from the reference. 
This is usually the lando env or platform

```backstop test --config=backstop_config.js --scenariosPath=backstop_scenarios.js```
