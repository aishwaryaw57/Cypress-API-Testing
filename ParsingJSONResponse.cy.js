const { expect } = require("chai");

describe("Parsing JSON Response", () => {
    it("Parsing simple JSON response", () => {
        cy.request({
            method: 'GET',
            url: "https://fakestoreapi.com/products",
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            
            // Log the response body to the console to inspect it
            console.log(response.body);
            
            // Adjust the assertions based on the actual response structure
            expect(response.body[0].id).to.equal(1);
            expect(response.body[0].title).to.equal("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
            expect(response.body[0].price).to.equal(109.95);
            expect(response.body[0].rating.rate).to.equal(3.9);

            expect(response.body[19].id).to.equal(20);
            expect(response.body[19].title).to.equal("DANVOUY Womens T Shirt Casual Cotton Short");
            expect(response.body[19].price).to.equal(12.99);
            expect(response.body[19].rating.rate).to.equal(3.6);
        });
    });

    it("Parsing complex JSON response", () => {
        cy.request({
            method: 'GET',
            url: "https://fakestoreapi.com/products",
            qs: { limit: 5 }
        })
        .then((response) => {
            expect(response.status).to.equal(200);

            // Initialize totalprice variable
            let totalprice = 0;

            // Iterate directly over response.body, which is an array
            response.body.forEach(element => {
                totalprice = totalprice + element.price;
            });

            // Ensure the total price matches the expected value
            expect(totalprice).to.equal(899.23); // Adjust this value to match the actual expected total price
        });
    });
});
