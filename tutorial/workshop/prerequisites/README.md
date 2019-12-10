# Prerequisites

It's important to download all dependencies and creating the workspace before coming to the workshop. This will avoid traffic jams on the public Wi-Fi :D. 

## NodeJS

Download LTS version of NodeJS in: https://nodejs.org/en/download/

## Angular CLI

```
npm install -g @angular/cli
```

## Nx: 

```
npm i -g @nrwl/nx
```

## Create initial workspace

Use the name ``myapp`` for your workspace in order to follow the workshop easier.

```
npm init nx-workspace myapp
```

You will need to answer a few questions to setup your application:

* <b>What to create in the new workspace?</b> angular (a workspace with a single angular application)
* <b>Application Name?</b> myapp
* <b>Default stylesheet format?</b> CSS

After answering this questions, dependencies will be downloaded, and the initial workspace will be configured. It takes around 2-3 minutes to complete.

Continue to [Diff 1: Basic structure of application](../diff2)
