describe('CRUD - Posts', () => {  
    before(() => {
        cy.request({
            method:'POST',
            url:'/api/auth',
            body:{
                email:'tetesIterasys@iterasys.com',
                password:'123456'
            }
        })
        
    })
    it('Teste', () => {
        cy.log('Teste')
        
    })
    
})