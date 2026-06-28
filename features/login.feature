Feature: ParaBank User Registration and Login

  Scenario: Register new user, login, and verify account balance
    Given User launches the ParaBank application
    When User clicks on Register link
    And User fills the registration form with valid details
    And User submits the registration form
    Then User account should be created successfully
    When User logs out of the application
    And User logs in with newly created credentials
    Then User should be navigated to Accounts Overview page
    And User should capture the account balance
    And User prints the account balance
