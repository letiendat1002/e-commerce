### Requirements

1. [Docker Desktop](https://www.docker.com/)
2. [IntelliJ IDEA Community/Ultimate Edition](https://www.jetbrains.com/idea/download/other.html)

### Step By Step

1. Docker Desktop -> Dev Environments -> Create a new environment

![docker-desktop](../assets/images/database/docker-desktop.png)

2. Include these steps:
    1. On step 1, choose `Get Started`.
    2. On step 2, `Choose source` -> `Local directory` -> `Select` path to /backend -> `Continue`.

   ![step-3-select-path](../assets/images/database/docker-select-path.png)

    3. Wait for Docker setting up successfully -> `Continue` -> `Done`.

   ![docker-setting-up-sucessfully](../assets/images/database/docker-setting-up-sucessfully.png)
   ![docker-done](../assets/images/database/docker-done.png)
   ![docker-service-running](../assets/images/database/docker-service-running.png)


3. Go to tab Database and connect to mysql server

- New -> Data Source -> MySQL
  ![connect_instruction](../assets/images/database/connect_instruction.png)


- Naming: ecommerce@localhost
- Port: 3333
- User: root
- Password: root
- Then Apply -> OK
  ![try_to_connect_database](../assets/images/database/try_to_connect_database.png)


- Copy all [data_sample.sql](../assets/databases/mysql/data_sample.sql) and paste to console tab - It includes creating
  database and tables, and inserting data.

> **No Console tab?** -> On tab Database, New -> Query Console (Ctrl + Shift + Q)

- Pick any option from the dropdown list.
  ![connection-picking-database](../assets/images/database/connection-picking-database.png)

- Execute second option.
  ![connection-run](../assets/images/database/connection-run.png)

- Wait till it's done.
  ![connection_result](../assets/images/database/connection_result.png)

Now you can work with the API. Check [APIs documentation](APIs.md) for API specifications.
