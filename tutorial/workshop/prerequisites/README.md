# Prerequisites

It's important to download all dependencies and creating the workspace before coming to the workshop. This will avoid traffic jams on the public Wi-Fi :D. 

## NodeJS

Download LTS version of NodeJS in: https://nodejs.org/en/download/

After installing NodeJS, you will be ready to install Angular CLI and Nx.

## Angular CLI

In your console, execute the following command:

```
npm install -g @angular/cli
```

## Nx: 

In your console, execute the following command:

```
npm i -g @nrwl/nx
```

## Create initial workspace

Use the name ``myapp`` for your workspace in order to follow the workshop easier.

In your console, execute the following command:

```
npm init nx-workspace myapp
```

Answer the questions that appear with the following:

* <b>What to create in the new workspace?</b> angular (a workspace with a single angular application)
* <b>Application Name?</b> myapp
* <b>Default stylesheet format?</b> CSS

After answering this questions, dependencies will be downloaded, and the initial workspace will be configured. It takes around 2-3 minutes to complete.

Continue to [Diff 1: Basic structure of application](../diff2)
