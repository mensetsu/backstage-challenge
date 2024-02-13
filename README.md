# Technical challenge 

## Objective

You are kindly requested to read the following document, follow the directions and prepare a brief answer for every question. Do not get overwhelmed by the wide variety of subjects. It is expected that you may not be familiar with all of them. Challenge the questions and highlight any missing points.

The goal of the challenge is to run Backstage locally, understand the basic parts, extend it with a plugin and enhance both the backend and frontend part.

The time spent on the challenge should be limited to **3 hours** at most. The answers should be short and to the point.

### What is Backstage?

Backstage is an open platform for building developer portals. Powered by a centralized software catalog, Backstage brings order to our microservices and infrastructure and enables the product teams to ship high-quality code quickly — without compromising autonomy.

Backstage unifies all our infrastructure tooling, services, apis and documentation to create a streamlined development environment from end to end.

### Why is Backstage part of the technical challenge?

In Developer Experience team of Celonis, we have invested heavily on Backstage and delivered impactful features that our team of developers uses every day. We have planned to extend further this platform and we invite you to demonstrate your skills in order to become part of this effort.

## Challenge

Through this challenge, we will be able to check how you would contribute on an existing project and understand provided documentation, how you work in a project written in Typescript and ReactJS and enhance the code to resolve the acceptance criteria given. In the meantime, you will need to use your git skills to publish your deliverables; be thorough on your commits and related messages to showcase your git practices. Is the work for your reviewer. When you finish your challenge, reply to the email you received and send the url to the public repo along with the answers to the questions. The answers can be part of the repo if you want.

### Run the app locally

Steps:

- Create a public Github repo to push your code
- Read [Backstage’s docs](https://backstage.io/docs/getting-started/#create-your-backstage-app) to initialize the app locally 
- Use SQlite as *persistent* database by adding to the `app-config.local.yaml`:
  ```
  backend:
    database:
      client: better-sqlite3
      connection:
        directory: ../../challenge-data/sqlite
  ```
- Protect `challenge-data` folder from being accidentally committed in git.

**Questions**

1. When Backstage service is up and running, how many apps are running?
1. How many ports are used on the hosting machine?
1. Why do we have 3 `package.json` files?
1. In which `package.json` file would you put a new dependency and why?
1. Why changes on `app-config.local.yaml` are not commited by default on git? Is this a good or bad practice and why?
1. Would you use the existing `app-config.production.yaml` to configure the database credentials for your production database and commit the changes in git?
1. Can you describe why we configure `backend.cors` values in `app-config.yaml`? What is CORS? Why is it important on modern browsers?

### Extend and enhance Backstage

- Install this [open source plugin](https://github.com/backstage/backstage/tree/master/plugins/shortcuts) called `Shortcuts`; Follow the README file and make the appropriate changes to make it work.
- Add a link to `https://www.celonis.com/`. Is it an acceptable url? If no, can you change the plugin in order to make it acceptable?
- Please change the sidebar icon of `Add Shortcuts` to `ChatIcon`.
- Change the route name to the `Create...` functionality from `/create` to `/innovate` and check that the sidebar link works.

**Questions**

1. Which page is loaded first `Root.tsx` or `App.tsx` and why?
1. How many files were edited to change the route name? 
