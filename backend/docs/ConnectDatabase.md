### Requirements
1. [Docker Desktop](https://www.docker.com/)



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


- Copy all [dbs_model.sql](../assets/databases/mysql/dbs_model.sql) and paste to console tab.
  
  - Pick any database drop down 

![connection-picking-database](../assets/images/database/connection-picking-database.png)


> **No Console tab?** -> On tab Database, New -> Query Console (Ctrl + Shift + Q)

   - `Execute`(Ctrl + Enter)
![connection-run](../assets/images/database/connection-run.png)
![connection_result](../assets/images/database/connection_result.png)

Now you can work with the API. Check [APIs documentation](APIs.md) for more information.
