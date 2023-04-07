### IntelliJ Plugins Requirements
1. Docker


### Step By Step
1. Run file [docker-compose.yml](..%2Fdocker-compose.yml)
![docker_run](../assets/images/database/docker_run.png)

    **Result:** (Message: ... ready for connections ... port: 3306  MySQL Community Server - GPL.)
    ![docker_result](../assets/images/database/docker_result.png)


2. Go to tab Database and connect to mysql server
- New -> Data Source -> MySQL
![connect_instruction](../assets/images/database/connect_instruction.png)


- Naming: ecommerce@localhost
- Port: 3333
- User: root
- Password: Ecommerc3
- Then Apply -> OK
![try_to_connect_database](../assets/images/database/try_to_connect_database.png)


- Copy all [dbs_model.sql](..%2Fassets%2Fdatabases%2Fmysql%2Fdbs_model.sql) and paste to console tab -> Execute
![connection_result](../assets/images/database/connection_result.png)
