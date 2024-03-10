# Role & Permission Documentation

## Table of contents

- [Public APIs](#public-apis)
- [Roles](#roles)
- [Permissions](#permissions)
- [Role Permissions](#role-permissions)

### Public APIs

| **No.** | **HTTP** |           **API**            |    **Description**    |
|:-------:|:--------:|:----------------------------:|:---------------------:|
|  **1**  |  `POST`  | `/api/v1/auth/authenticate`  |         Login         |
|  **2**  |  `POST`  |   `/api/v1/auth/register`    |       Register        |
|  **3**  |  `GET`   |     `/api/v1/categories`     |  Get all categories   |
|  **4**  |  `GET`   |  `/api/v1/categories/{id}`   |  Get category by id   |
|  **5**  |  `GET`   |      `/api/v1/products`      |   Get all products    |
|  **6**  |  `GET`   |   `/api/v1/products/{id}`    |   Get product by id   |
|  **7**  |  `GET`   |   `/api/v1/auth/activate`    | Activate user account |
|  **8**  |  `GET`   | `/api/v1/auth/resetPassword` |    Forgot password    |

### Notes

- `xxx:read` -> `GET`
- `xxx:write` -> `POST` + `PUT` + `DELETE`

### Role Permissions

- **Admin**
    - All permissions

- **Employee**
    - **User:**
        - `get:getUserByUserID`
        - `put:putUser`
    - **User Address:**
        - `user_address:read`
        - `user_address:write`
    - **Product:**
        - `product:read`
        - `product:write`
    - **Category:**
        - `category:read`
        - `category:write`
    - **Order:**
        - `order:read`
        - `order:write`
    - **Order Detail:**
        - `order_detail:read`
        - `order_detail:write`
    - **Rating:**
        - `rating:read`
        - `rating:write`
    - **Change Password:**
        - `put:changePassword`

- **Customer**
    - **User:**
        - `get:getUserByUserID`
        - `put:putUser`
    - **User Address:**
        - `user_address:read`
        - `user_address_write`
    - **Product:**
        - `product:read`
    - **Category:**
        - `category:read`
    - **Order:**
        - `order:read`
        - `order:write`
    - **Order Detail:**
        - `order_detail:read`
        - `order_detail:write`
    - **Rating:**
        - `rating:read`
        - `rating:write`
    - **Change Password:**
        - `put:changePassword`
