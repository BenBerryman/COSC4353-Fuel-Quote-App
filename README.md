# FULR
A web app to simulate the purchase of fuel, complete with login/registration and dynamic pricing.

### Languages:

**Front End:** JavaScript (Node.js, jQuery), HTML, CSS

**Back End:** JavaScript (Node.js), MongoDB, Mocha, Chai

## Getting Started

### Prerequisites
- Node.js installed on your local machine (nodejs.org)
- Access to a web browser (Firefox recommended)

### Installation
#### Start up the server
+ Open a new Terminal window
+ Navigate to the 'Server' folder
+ Type:
```text
npm install
```
+ If on Windows, start both the web and database servers by typing:
```text
runserver.bat
```
+ If on Mac/Linux, start both the web and database servers by typing:
```text
./runserver.sh
```
#### Display the webpage
+ Open a new window in your web browser
+ Type into the URL:
```text
localhost:8000/homepage.html
```

This is the main homepage for FULR. Start by either logging in or registering!

## Code Coverage

This project comes included with unit and integration tests. To run tests:
+ First ensure that both the web server and the database server are inactive.
+ Navigate to the 'Server' folder
+ Type:
```text
npm test
```
This will run all tests found in the 'Server/test' folder.