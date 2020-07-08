# DirektoriAWS
Store Directory implemented using React and lambda

## Lambda Functions
### Public

GET /allstores - get all store that are registered

### Private

GET /stores - retrieve stores based on the login 
POST /stores - add new stores
PATCH /stores/:storeId - edit store
DEL /stores/:storeId - delete a store 
GET /stores/:storeId/attachment - Get Upload URL to put image in the store

## End Point for test
https://direktori.perdhevi.com/

### Test Scenarios
#### public display
1. Open the home page 
2. Click More to get more stores

#### Login
1. Click login on the top right
2. Login with email or google auth

#### List personal Store
1. While Logged in
2. Click Store Menu
3. Personal Store Listed

#### Create Store
1. While Logged in and in Store list
2. Create New Button
3. Enter Information needed
4. Press Submit

#### Edit Store
1. While Logged in and in Store list
2. Click Edit
3. Enter Information needed
4. Enter Submit
5. If image is needed to be uploaded, Click Choose File
6. Click Submit in the lower section

#### Delete Store
1. While Logged in and in Store list
2. Click Delete
3. Click Yes to confirm deletion
