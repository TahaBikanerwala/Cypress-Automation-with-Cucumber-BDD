Feature: End to End E-commerce website Validation

    A demo Ecommerce Application

    Scenario: Ecommerce product order
        Given User visits Ecommerce HomePage
        When User Navigates to the Products Page
        And Adds items to the Cart
        And Compares the Total price of all the Products in cart
        And Selects country of resident
        Then The product should be purchased

