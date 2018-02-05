# Docker-composer
Single Page Application to help you create your personalized DRIVER+ test-bed, based on Apache Kafka.
A preview is available at [https://driver-eu.github.io/docker-composer](https://driver-eu.github.io/docker-composer).

# Introduction
The Driver+ test-bed combines many different Docker images into one Docker-compose file. To manage the complexity, the GUI helps you select only the services that you need, and creates a personalized Docker-compose file for you.

# Installation

First, clone the repository:
```console
git clone https://github.com/DRIVER-EU/docker-composer.git
cd docker-composer
```

And install the dependencies and run the development server:
```console
npm i
npm run start
```

## Production build

Run `yarn build` and copy the newly created bundle in the `dist` folder (and `content.yml`) to the `docs` folder. The `docs` folder is automatically visible at [https://driver-eu.github.io/docker-composer](https://driver-eu.github.io/docker-composer).

# About the application structure

The `content.yml` file contains the relevant input, i.e. upon loading the application in `app.ts`, the `content.yml` datasource is loaded, and each entry is converted to a tab in the application.

The `content.yml` file is actually nothing more than a `Docker-compose.yml` file, supplemented with a description of the services, i.e. the `content` part of this file describes the items that you can select in the web application, and each piece consists of one or more Docker images. Furthermore, the content may have a `depends_on` property, which indicates that there is a dependency on another content item. Finally, each content item may have parameters, for example to specify its port, and in the generated `Docker-compose.yml` file, these parameters are replaced with the supplied input. For example, the parameter `KAFKA_PORT` is replaced by its default value, e.g. `3052` everywhere where we have used the `$KAFKA_PORT` string.

# Example

Please see below example: the `content` is an object, where each property like `core` is represented as a tab in the GUI. Each item is something a user may select to be part of the generated `Docker-compose.yml` file. Most properties speak for themselves, and the services array refers to the Docker images that this item requires.

```yaml
content:
  core:
    title: Core services
    description: Most of the time, you will need these services.
    logo: https://avatars2.githubusercontent.com/u/16935616?s=200&v=4
    items:
      kafka:
        title: DRIVER+ test-bed core
        description: >
          The test-bed allows you to trial and test different solutions in the
          crisis-management domain. It consists of a complete setup of Apache
          Kafka, and some additional tooling, such as the REST interface,
          schema registry and UI, and topics UI.
        logo: https://avatars2.githubusercontent.com/u/16935616?s=200&v=4
        website: http://driver-project.eu
        depends_on:
        services:
          - zookeeper
          - broker
          - schema_registry
          - kafka_schema_registry_ui
          - kafka_topics_ui
          - kafka_rest
        parameters:
          ZOOKEEPER_CLIENT_PORT: 3500
          KAFKA_BROKER_PORT: 3501
          SCHEMA_REGISTRY_PORT: 3502
          SCHEMA_REGISTRY_UI_PORT: 8000
          KAFKA_TOPICS_PORT: 3600
          KAFKA_REST_PORT: 8082
```