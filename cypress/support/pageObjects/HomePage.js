class HomePage {
    getNameEditBox() {
        return cy.get("form input[name='name']")
    }

    getEmailEditBox() {
        return cy.get("input[name='email']")
    }

    getGenderDropDown() {
        return cy.get('#exampleFormControlSelect1')
    }

    getTwoWayBindingElement() {
        return cy.get("h4 input[name='name']")
    }

    getradioButton() {
        return cy.get('#inlineRadio3')
    }
 
    getShopButton(){
        return cy.get('a').contains('Shop')
    }

    inputName(name){
        this.getNameEditBox().type(name)
    }


}

export default HomePage;