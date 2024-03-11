# Deployment Guide

This guide outlines the steps to deploy Linkking project backend web services to a production environment.

## Table of Contents

- [Deploy MySQL](#deploy-mysql)
- [Environment Variables](#environment-variables)
- [Deploy Backend](#deploy-backend)

## Deploy MySQL

1. **Setup MySQL Server:**
    - Install MySQL server on your hosting environment or use a cloud-based MySQL service provider.
    - We recommend [aiven.io](https://aiven.io) for cloud-based MySQL hosting.
    - Configure the MySQL server to allow remote connections if necessary.

2. **Database Initialization:**
    - Execute the provided SQL script [data_sample.sql](/assets/databases/mysql/data_sample.sql) to initialize the
      database schema, necessary tables and sample data.

## Environment Variables

1. **Database Configuration:**
    - `DB_HOST`: Hostname or IP address of the MySQL server.
    - `DB_PORT`: Port number for MySQL server.
    - `DB_USERNAME`: Username for accessing the MySQL database.
    - `DB_PASSWORD`: Password for accessing the MySQL database.
    - `DB_NAME`: Name of the MySQL database (if using sample data, use `myecommerce` as the database name)
    - `DB_URL` with format `jdbc:mysql://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>?ssl-mode=REQUIRED`

2. **Other Configurations:**
    - `API_URL`: Base URL for the deployed backend service (Assign API url after web service deployment).
    - `MAIL_USERNAME`: Email address for sending emails.
    - `MAIL_PASSWORD`: Password for the email address (Use
      an [app password](https://support.google.com/accounts/answer/185833?hl=en) if using Gmail).

## Deploy Backend

This guide will help you deploy the Linkking project backend web services to [Render](https://render.com/).

1. **Prerequisites:**
    - **Docker Desktop:** Ensure you have Docker Desktop installed on your system.
    - **Docker Hub Account:** Create an account on [Docker Hub](https://hub.docker.com/) if you don't have one already.

2. **Build JAR files:**
    - Run the following command to build the JAR file:
        ```bash
        mvn clean -DskipTests package
        ```
    - You can also run this command via IntelliJ IDEA by right-clicking on the project and
      selecting `Run Maven` -> `New Goal...` -> `clean -DskipTests package`.

3. **Build Docker Image and Deploy to Render:**

    - For proper instructions, please refer to this blog
      post: [How to host a Spring Boot application for free with Render](https://hostingtutorials.dev/blog/free-spring-boot-host-with-render) (You may skip to the **Building your docker image** section).
    - Example commands used from above blog post (Assume you already in `backend/` directory):
         ```bash
         docker build -t linkking .
         docker tag linkking letiendat1002/linkking
         docker login -u letiendat1002
         docker push letiendat1002/linkking:latest
         ```
