class LocationPage{
    getDropDown(){
        return cy.get('#country')
    }
    getTermsCheckBox(){
        return cy.get('#checkbox2')
    }

    getSuggestionList(){
        return cy.get('div.suggestions ul li a')
    }

    getPurchaseBtn(){
        return cy.get('input.btn')
    }

    getSuccessMessage(){
        return cy.get('.alert')
    }

    
}

export default LocationPage