describe('HTTP Request',()=>{
    it('GET CALL',()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts/1')
        .its('status') //to check the status 
        .should('equal',200);   //check value

    })

    it('Post Call', ()=>{

        cy.request(  {
                //three parameteers
            method: 'POST',  //method is a paramenter
            url: 'https://jsonplaceholder.typicode.com/posts', //url
            body: {                  //body
                title:"Test post",
                body:"This is post call",
                userId:1   
            }
        })
        .its('status')
        .should('equal',201);
    })
    it("Put Call", ()=>
    {
        cy.request({
            method: "PUT",
            url:"https://jsonplaceholder.typicode.com/posts/1", //url
            body:{
                title:"Test post -Updated",
                body:"This is put call",
                userId:1,
                id: 1

            }
        })
        .its("status")
        .should('equal',200);
    })
    it("Delete Call", ()=>
        {
            cy.request({
                method: "DELETE",
                url:"https://jsonplaceholder.typicode.com/posts/1" //url    
            })
            .its("status")
            .should('equal',200);
        })
})