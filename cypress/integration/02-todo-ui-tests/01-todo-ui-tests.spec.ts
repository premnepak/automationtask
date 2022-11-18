
import { todoNameGenerator } from "../../support/todoNameGenerator";

describe('ToDo List App Operations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Add a ToDo item and verify it is added successfully', () => {
    const todoItemName = todoNameGenerator(8); //generating a random new todo item 
    cy.get('#formAddTodoItem').type(todoItemName);
    cy.get('.hstack > .btn-primary').should('have.text', 'Add Item').click();
    cy.get('tbody').contains(todoItemName);
  });

  it('Verify Duplicate Item can\'t be added', () => {
    const todoItemName = todoNameGenerator(8);
    cy.get('#formAddTodoItem').type(todoItemName);
    cy.get('.hstack > .btn-primary').should('have.text', 'Add Item').click();
    cy.contains(todoItemName).should('be.visible'); //this or the next line can be used for assertion
    cy.get('tbody').contains(todoItemName);

    //trying to add the same todo item again
    cy.get('.btn-secondary').should('have.text', 'Clear').click(); //clear the Description field
    cy.get('#formAddTodoItem').type(todoItemName);
    cy.get('.hstack > .btn-primary').should('have.text', 'Add Item').click();
    cy.get('.alert-danger > .alert-heading').should('be.visible')
      .and('have.text', 'Oh snap! You got an error!');

    cy.get('.alert-danger > p').should('have.text', 'A todo item with description already exists');


  });

  it('Mark a ToDo Item as Completed', () => {

    //adds a ToDo Item
    const todoItemName = todoNameGenerator(8);
    cy.get('#formAddTodoItem').type(todoItemName);
    cy.get('.hstack > .btn-primary').should('have.text', 'Add Item').click();
    cy.contains(todoItemName).should('be.visible');

    //Mark that Item as completed
    cy.contains(todoItemName).parent().find('button').click();
    cy.get('tbody').should('not.contain', todoItemName); //this assertion
    expect('tbody').does.not.contain(todoItemName); //or this can be used

  });

});