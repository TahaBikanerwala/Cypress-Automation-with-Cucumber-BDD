class ProductPage {

    getCheckoutButton() {
        return cy.contains('Checkout')
    }

    getProductAmount(){
        return cy.get('tr td:nth-child(4) strong')
    }

    
    getTotalAmount(){
        return cy.get("td h3 strong")
    }

    
    getProductAmountTotalText(){
        this.getProductAmount().then((price)=>{
            var total = price.text()
            var totalTxt = total.split(" ")
            totalTxt = totalTxt[1].trim()
            return totalTxt
        })
    }


}

export default ProductPage