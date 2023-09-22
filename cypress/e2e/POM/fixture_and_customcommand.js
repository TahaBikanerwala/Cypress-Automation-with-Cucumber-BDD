/// <reference types="Cypress"/>
import HomePage from "../../support/pageObjects/HomePage";
import ProductPage from "../../support/pageObjects/ProductPage";
import CheckoutPage from "../../support/pageObjects/CheckoutPage";
import LocationPage from "../../support/pageObjects/LocationPage";

describe("Test Suite for Fixture,Custom Command and Framework", function () {
  let dataa;
  let homePage = new HomePage();
  let productPage = new ProductPage();
  let checkoutPage = new CheckoutPage();
  let locationPage = new LocationPage();
  before(function () {
    cy.fixture("example").then(function (data) {
      dataa = data;
    });
  });

  it("Using Fixtures", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    homePage.inputName("Bob");
    // homePage.getNameEditBox().type('Bob')
    // cy.get("form input[name='name']").type(dataa.name)
    homePage.getGenderDropDown().select(dataa.gender);
    // cy.get('#exampleFormControlSelect1').select(dataa.gender)
  });

  it("Assertions", () => {
    homePage.getTwoWayBindingElement().should("have.value", dataa.name);
    homePage.getNameEditBox().should("have.attr", "minlength", "2");
    homePage.getradioButton().should("not.be.enabled");
    homePage.getradioButton().should("be.disabled");
    homePage.getradioButton().check({
      force: true,
    });
  });

  it("Add to Cart using Custom Commands", function () {
    homePage.getShopButton().click();
    dataa.products.forEach(function (productName) {
      cy.selectProduct(productName, ".card-title a", ".btn.btn-info");
    });
  });

  it("Proceed To Checkout", function () {
    productPage.getCheckoutButton().click();
  });

  it("Compare Total", function () {
    var sum = 0;
    productPage
      .getProductAmount()
      .each((el, index, list) => {
        const priceTxt = el.text();
        var result = priceTxt.split(" ");
        result = result[1].trim();
        sum = sum + Number(result);
      })
      .then(function () {
        cy.log(sum);
      });

    productPage.getTotalAmount().then(function (element) {
      const totalTxt = element.text();
      var resultTotal = totalTxt.split(" ");
      resultTotal = resultTotal[1].trim();
      expect(sum).to.equal(Number(resultTotal));
    });
  });

  it("Proceed To Final Checkout", function () {
    checkoutPage.getCheckOutButton().click();
  });

  it("Select Country", function () {
    locationPage.getDropDown().type("a");
    locationPage.getSuggestionList().contains(dataa.deliveryLocation).click();
    locationPage.getTermsCheckBox().check({
      force: true,
    });
    locationPage.getPurchaseBtn().click();
    locationPage.getSuccessMessage().then(function (element) {
      const textMsg = element.text();
      expect(textMsg.includes("Success! Thank you!")).to.be.true;
    });
  });
});
