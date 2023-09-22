import {Before, Given, When, Then,} from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../support/pageObjects/HomePage";
import ProductPage from "../../../support/pageObjects/ProductPage";
import CheckoutPage from "../../../support/pageObjects/CheckoutPage";
import LocationPage from "../../../support/pageObjects/LocationPage";

let dataa;
const homePage = new HomePage();
const productPage = new ProductPage();
const checkoutPage = new CheckoutPage();
const locationPage = new LocationPage();

Before(function () {
  cy.fixture("example").then(function (data) {
    dataa = data;
  });
});
Given("User visits Ecommerce HomePage", function () {
  cy.visit("https://rahulshettyacademy.com/angularpractice/");
});

When("User Navigates to the Products Page", function () {
  homePage.getShopButton().click();
});

When("Adds items to the Cart", function () {
  dataa.products.forEach(function (productName) {
    cy.selectProduct(productName, ".card-title a", ".btn.btn-info");
  });
  productPage.getCheckoutButton().click();
});

When("Compares the Total price of all the Products in cart", function () {
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

When("Selects country of resident", () => {
  checkoutPage.getCheckOutButton().click();
  locationPage.getDropDown().type("a");
  locationPage.getSuggestionList().contains(dataa.deliveryLocation).click();
  locationPage.getTermsCheckBox().check({
    force: true,
  });
});

Then("The product should be purchased", () => {
  locationPage.getPurchaseBtn().click();
  locationPage.getSuccessMessage().then(function (element) {
    const textMsg = element.text();
    expect(textMsg.includes("Success! Thank you!")).to.be.true;
  });
});
