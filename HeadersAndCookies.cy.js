describe("API testing", () => {
    let authToken = null;

    before("creating access token", (done) => {
        cy.request({
            method: 'POST',
            url: "https://simple-books-api.glitch.me/api-clients/",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                clientName: 'ABC',
                clientEmail: Math.random().toString(36).substring(2) + "@gmail.com"
            }
        }).then((response) => {
            authToken = response.body.accessToken;
            done();
        });
    });

    before("creating new order", (done) => {
        cy.request({
            method: 'POST',
            url: "https://simple-books-api.glitch.me/orders/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: {
                "bookId": 1,
                "customerName": "xyzabc"
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true);
            done();
        });
    });

    it("should verify order creation", () => {
        // Add test steps to verify order creation or any other assertions
        cy.log('Order creation verified');
    });

    it("Fetching the orders",()=>{
        cy.request({
            method:'GET',
            url:"https://simple-books-api.glitch.me/orders/",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+authToken
            },
            cookies:{
                'cookieName' : 'mycookie'
            }
        }). then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).has.length(1);
        })
    })
});
