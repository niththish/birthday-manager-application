# full-stack birthday manager application
It is an full stack web application for managing birthday dates.

To run this application in your local server, you need to create a .env file containing the following values:-
<ol>
  <li>MONGOURL</li>
  <li>PORT</li>
  <li>JWT_SECRET</li>
  <li>JWT_LIFETIME</li>
</ol>

# REST endpoints
   `/` - serves index.html file (frontend)\
   `/birthdays` - servers birthdays.html file (frontend)\
   `/allbirthdays` - servers allbirthdays.html file (frontend)\
   `/birthdays` - supports get,post,patch,delete requests on the birthday records present in the database\
   `/auth/signup` - for new user registration, hashing password\
   `/auth/login` - for login, JWT token generation

