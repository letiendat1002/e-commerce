# Back-end documentation

## Technologies

1. [MySQL](https://www.mysql.com/)
2. [Spring Boot 3](https://spring.io/projects/spring-boot)
3. Other Spring Ecosystems
    - [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
    - [Spring Security](https://spring.io/projects/spring-security)
    - [Spring Web](https://spring.io/projects/spring-web)
    - [Spring Test](https://spring.io/guides/gs/testing-web/)
    - More details please refer to [pom.xml](pom.xml)

## Requirements

1. [Java 17+](https://adoptium.net/)
2. [Docker Desktop](https://www.docker.com/)

## Resources

1. [MySQL Scripts](assets/databases/mysql)
2. [Database Design](assets/images/database/database_design.png)
3. [Spring Security Architecture](assets/images/security)

## Documentation

1. [Docs folder](docs)
2. [Connect to database](docs/ConnectDatabase.md)
3. [APIs](docs/APIs.md)
4. [Role & Permission](docs/RolePermission.md)
5. [Deployment](docs/Deployment.md)

**Notice**:
- To initiate the backend properly, please open this project in the `backend/` folder not the root `e-commerce/` folder.
- To run the project locally, please refer to [Connect to database](docs/ConnectDatabase.md) for more details and remember to change `spring.profiles.active` in [application.yml](src/main/resources/application.yml) from `prod` to `dev` (default value is `prod`).
- To deploy the project, please refer to [Deployment](docs/Deployment.md) for more details and remember to change `spring.profiles.active` in [application.yml](src/main/resources/application.yml) from `dev` to `prod`.
