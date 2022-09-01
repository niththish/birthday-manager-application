# full-stack-birthday-manager-application
full stack application for managing birthday dates.

To run this application in your local server, you need to have a .env file containing the following values:-
<ol>
  <li>MONGOURL</li>
  <li>PORT</li>
  <li>JWT_SECRET</li>
  <li>JWT_LIFETIME</li>
</ol>

# REST endpoints
<ol>
  <li> / -> serves index.html file (frontend) </li>
  <li> /birthdays -> servers birthdays.html file (frontend) </li>
  <li> /allbirthdays -> servers allbirthdays.html file (frontend) </li>
  <li> /birthdays -> supports get,post,patch,delete requests on the birthday records present in the database </li>
  <li> /auth/signup -> for new user registration, hashing password </li>
  <li> /auth/login -> for login, JWT token generation </li>
</ol>
