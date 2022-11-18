
import { todoNameGenerator } from "../../support/todoNameGenerator";

let todoItemCreatedId = ''; 
let todoItemNameGenerated = '';


describe('ToDo List API Tests', () => {

  it('Add a ToDo item (POST - 201) ', () => {
    todoItemNameGenerated = todoNameGenerator(8); //generating a random new todo item 
    cy.request({
      method: 'POST',
      url: '/api/todoItems',
      body: {
        description: todoItemNameGenerated
      },
    }).then(response => {
      expect(response.status).eq(201);
      expect(response.statusText).eq("Created");
      todoItemCreatedId = response.body;
    });
  });

  it('Checks Duplicate Item can\'t be added (POST -409)', () => {

    const todoItemName = todoNameGenerator(8);
    cy.request({
      method: 'POST',
      url: '/api/todoItems',
      body: {
        description: todoItemName
      },
    }).then(response => {
      expect(response.status).eq(201);
    });

    //Creating the todo item with same name/description
    cy.request({
      method: 'POST',
      url: '/api/todoItems',
      failOnStatusCode: false,
      body: {
        description: todoItemName
      },
    }).then(response => {
      expect(response.status).eq(409);
      expect(response.statusText).eq("Conflict");
      expect(response.body).contains('A todo item with description already exists');
    });

  });

  it('GET all ToDo Items', () => {

    //Create a new todo Items
    const todoItemName = todoNameGenerator(8);
    cy.request({
      method: 'POST',
      url: '/api/todoItems',
      body: {
        description: todoItemName
      },
    }).then(response => {
      expect(response.status).eq(201);
    });

    //Get all todoItems and verify the above created item exists
    cy.request({
      method: 'GET',
      url: '/api/todoItems',
    }).then(response => {
      expect(response.status).eq(200);
      expect(response.body.length).gt(0);
      expect(JSON.stringify(response.body)).to.contain(todoItemName);
    });

  });

  it('GET ToDo Item by ID', () => {
    //Get todoItem by the todoItem Id Created by the first test. 
    cy.request({
      method: 'GET',
      url: `/api/todoItems/${todoItemCreatedId}`,
    }).then(response => {
      expect(response.status).eq(200);
      expect(response.body.id).to.contain(todoItemCreatedId);
    });
  });

  it('Mark a ToDo Item as Completed (PUT)', () => {
    //Get todoItem by the todoItem Id Created by the first test. 
    cy.request({
      method: 'PUT',
      url: `/api/todoItems/${todoItemCreatedId}`,
      body: {
        id: todoItemCreatedId,
        description: todoItemNameGenerated,
        isCompleted: true
      },
    }).then(response => {
      expect(response.status).eq(204);
    });
  });
});