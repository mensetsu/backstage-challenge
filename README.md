# Technical challenge

## Objective

The goal of the challenge is to run Backstage locally, understand the basic parts, extend it with plugins and enhance both the backend and frontend part.

You are kindly requested to read the following document, follow the directions to complete the challenge and prepare answer any questions, noted as `Q*`, example `Q1`. The answers should be short and to the point. Challenge the questions and highlight any missing points.

> The time spent on the challenge should be limited to **4 hours**.
>
> Joke disclaimer: Don't count `yarn install` in the duration!

### What is Backstage?

Backstage is an open platform for building developer portals. Powered by a centralized software catalog, Backstage brings order to our microservices and infrastructure and enables the product teams to ship high-quality code quickly — without compromising autonomy.

Backstage unifies all our infrastructure tooling, services, apis and documentation to create a streamlined development environment from end to end.

### Why is Backstage part of the technical challenge?

In Developer Experience team of Celonis, we have invested heavily on Backstage and delivered impactful features that our team of developers uses every day. We have planned to extend further this platform and we invite you to demonstrate your skills in order to become part of this effort.

## Challenge

Contribute to an existing project, using Typescript and ReactJS, and understand the provided documentation. Also, put in use your git skills to publish your deliverables; be thorough on your commits and related messages to showcase your git practices.

When you finish your challenge, reply to the email you received and send the url to the private repo along with the answers to the questions.

### Run the app locally

> Note: You can run the challenge with your preferred setup, but we're also providing a `.devcontainer` folder configuration in case you want to use it with VSCODE.

**Steps:**

- Fork this repository into a private repository and give access to the following handles: `georgeyord`, `LauraMoraB` and `mariosant`.
- Read [Backstage’s docs](https://backstage.io/docs/getting-started/#create-your-backstage-app) to initialize Backstage locally
- Use SQlite as _persistent_ database by adding to the `app-config.local.yaml`:

```yaml
backend:
  database:
    client: better-sqlite3
    connection:
      directory: ../../challenge-data/sqlite
```

- At this point, you should have a working Backstage instance running locally. Verify it and continue to the next section.

**Questions with Answers**

- **Q1.** When Backstage service is up and running, how many apps are running?

There should be two apps running, the frontend and backend.

- **Q2.** How many ports are used on the hosting machine?

Ports 3000 for the frontend and 7007 for the backend.

- **Q3.** Why do we have 3 `package.json` files?

Backstage is a monorepo so there is a top-level parent package.json file, followed by frontend/backend package.json files under packages/[app, backend] directories.

- **Q4.** In which `package.json` file would you put a new dependency and why?

I think it would depend on what kind of dependency: if it was a frontend/backend dependency, then it would go in the appropriate packages/[app, backend]/package.json file, if it was a dev dependency for something that applies to all apps/plugins, then it should probably go in the top-level package.json file.

- **Q5.** Why changes on `app-config.local.yaml` are not commited by default on git? Is this a good or bad practice and why?

The local.yaml config file is ony used for local (developer) testing so it's not necessary to commit. I feel that it could be a bad practise as developers could commit some private info inadvertently; however, if there is no compromising info in the files, it might be ok as it ensures that devs will all share a common setup (which may be easier to setup/debug). However, for you folks, I guess you use devcontainers, so it's not necessary.

- **Q6.** Would you use the existing `app-config.production.yaml` to configure the database credentials for your production database and commit the changes in git?

No, private information should be stored securely and properly encrypted to make it harder for abuse.

- **Q7.** Can you describe why we configure `backend.cors` values in `app-config.yaml`? What is CORS? Why is it important on modern browsers?

CORS is a security feature to allow (or restrict) web browsers to/from make requests to a different domain than where the website is served from; this can prevent malicious websites from accessing or changing info from another website. A malicious example of this would be XSS or cross-site scripting. The default configuration of:

```
  cors:
    origin: http://localhost:3000
    methods: [GET, HEAD, PATCH, POST, PUT, DELETE]
    credentials: true
```

allows web requests from `localhost:3000` to access the backend with the listed http methods.

### Extend Backstage

Now that you've successfully set up Backstage locally and confirmed its functionality, let's delve into understanding its plugin system.

#### 1. Installing the Shortcuts Plugin

Begin by integrating an open-source plugin into your Backstage instance. We'll install the [Shortcuts plugin](https://github.com/backstage/backstage/tree/master/plugins/shortcuts). This plugin enhances Backstage by adding a new section to the sidebar. Follow the instructions outlined in its README file to integrate it with your Backstage application.

Once the Shortcuts plugin is integrated and operational, we'd like to implement a few modifications:

- **Adding a Shortcut**: Incorporate a direct shortcut to the URL `https://www.celonis.com/` within the Shortcuts section; external url is used _on purpose_.
- **Changing the Sidebar Icon**: Adjust the icon displayed on the sidebar to reflect a ChatIcon for improved visual representation.

#### 2. Modifying Route Names

As part of our customization process, we aim to alter the route name for the `Create...` section from `/create` to `/innovate`.

**Questions**

- **Q8:** Where it needs to be changed and why?
- **Q9:** Which page is loaded first `Root.tsx` or `App.tsx` and why?

### Creating a Custom Backstage Plugin: Display Users

Now that we've successfully installed an open-source plugin, it's time to work on custom features to display a list of Users in Backstage. To accomplish this, we'll divide the work between enhancing an existing Backend plugin and creating from scratch a Frontend one.

#### 1. Extend a Backstage Backend plugin

Let's begin with the Backend aspect of our feature. We provide an existing plugin located at the root of this repository, under `sample-backend`. This plugin comes with two default endpoints: `health` and `users`.

##### **Initial Setup and Verification**

- Add the `sample-backend` plugin to your Backstage application. TODO: [https://backstage.io/docs/plugins/integrating-plugin-into-software-catalog#import-your-plugin-and-embed-in-the-entities-page](plugin integration)
- Run Bakcstage and verify the functionality by accessing the provided endpoints (`/api/sample-backend/health` and `/api/sample-backend/users`).

**Questions**

- **Q10:** Can you explain how did you verify the plugin worked?

> Please, note that the plugin as we're providing it should work, _though some of the tests may be failing_.

##### **Modifications**

1. We ultimetly want to add a feature for displaying a list of items on a webpage. The list can potentially contain a large number of items, and we want to ensure smooth performance and user experience. Implement a function or method that takes in a list of items and returns a subset of items, limited to five items per page.
2. For verification purposes, modify the API to also return the MD5 hash of each user's email.

#### 2. Create a Backstage Frontend plugin

- With our Backend setup in place, let's move on to developing the UI. Follow [this guide](https://backstage.io/docs/plugins/create-a-plugin/) to initialize a Frontend Plugin.
- Run Backstage and verify that the Frontend plugin is visible in the UI.

##### 1. Integration with Backend

The sample plugin has already a functinality similar to our goal. The issue is that the user list is static. Enhance the Frontend plugin to consume the API provided by `sample-backend`. This doc on [Consuming APIs](https://backstage.io/docs/frontend-system/utility-apis/consuming/) is at you disposal.

##### 2. UI Implementation

Display the list of users using a tile view, as described in the [Tile View documentation](https://backstage.io/storybook/?path=/story/layout-item-cards--default).

##### 3. Verification of Email Integrity

Implement a status icon to visually indicate the validity of each user's email. Verify that the email value has not been tampered with and is authentic.

**Questions**

- **Q11:** How did this hash related to the email upgraded the validity of our data?
- **Q12:** How does nd5 work, where should it be used and where not? Give some examples.

### Notes

- Backstage is currenlty migrating the backend to a new system. Since it's still in alpha, we won't be using it in this challenge. Beware that some packages may appear as deprecated (like `useHotMemoize`), please ignore these warnings and proceed with your development as usual.
- When running `yarn install` for the first time, please be aware that it may take a significant amount of time to complete. This delay is expected due to the installation of necessary dependencies and configurations.
