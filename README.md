# Hapi Rest Jwt and Angular Application template

## THIS IS WORK IN PROGRESS

### 1) .env
JWT_SECRET=<LONG RANDOM STRING HERE>
PASSWORD_SECRET=<SHOT RANDOM STRING HERE>
JWT_DURATION=2592000000
DB_DATABASE=''
DB_USERNAME=''
DB_PASSWORD=''  
DB_CONNECTION='mysql'
DB_PORT=3306
### 2) backend/database/config/config.json
Needs to be configured as well.

NOTE: need to have sequelize-cli installed globally npm install --global sequelize-cli
### 3) configure database
- cd backend/database
- sequelize db:migrate
- sequelize db:seed:all

### 4) node app.js

