# Role & Permission Documentation

### Notes

- `xxx:read` -> `GET`
- `xxx:write` -> `POST` + `PUT` + `DELETE`

### Role Permissions

- **Admin**
    - All permissions

- **Employee**
    - User:
        - `get:getUserByUserID`
        - `put:putUser`
    - User Address:
        - `user_address:read`
        - `user_address:write`
    - Product:
        - `product:read`
        - `product:write`
    - Category:
        - `category:read`
        - `category:write`
    - Order:
        - `order:read`
        - `order:write`

- **Customer**
    - User:
        - `get:getUserByUserID`
        - `put:putUser`
    - User Address:
        - `user_address:read`
        - `user_address_write`
    - Product:
        - `product:read`
    - Category:
        - `category:read`
    - Order:
        - `order:read`
        - `order:write`
