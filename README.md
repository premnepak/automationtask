This is created to test the ToDo applications. 
Cypress.io framework has been used to create the API and also UI tests. 

Setup Instructions

1. Install the node.js and npm
2. Install typeScript
3. Clone this repository
4. In the repository directory in the command line run : 
    `npm install`  (this should install Cypress and associated node modules)

5. Let the installation completed. 
6. Start the ToDo App in Docker
7. To run the tests in command line,  type : 
    `npx cypress run`  -- This will run all the tests and will publish the results (both API as well UI tests)

8. To run the tests using Cypress runner, type : 
    `npx cypress open` -- this will open the Cypress application and will show the API and UI test cases.
    Click on `01-todo-api-tests.spec.ts` and it will open the browser and run the API test cases there. 

    Click on `01-todo-ui-tests.spec.ts` and it will open the browser and run the UI test cases there. 

9. Depending on the enviornment and CI pipeline - command line scripts can be run to trigger the test automation run as desired. 





