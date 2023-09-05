
describe('CRUD - Posts', () => { 
    let postid = '' 
    let mensagem = 'Este post foi feito pelo cypres' // Refatorar significa duas mensagens iguais = Variável
    urlGET = `/api/post/${postid}`
    
    before(() => {
        cy.request({
            method:'POST',
            url:'/api/auth',
            body:{
                email:Cypress.env('email'),
                password:Cypress.env('password')
            }    
        }).then(()=>{
            cypress.Cookies.defaults({
                preserve: 'jwt'

            })
        })
        
    })
    it('cria um post', () => {
        
        cy.request({
            method:'POST',
            url:'/api/posts',
            body:{
                text:'mensagem'
            }
        }).then(({status, body}) =>{
            expect(status).to.eq(201)
            expect(body.text).to.equal('mensagem')
            postid =body._id
        })
        
    })
    it('lê o post', () => {
        cy.request({
            method:'GET',
            url:urlGET
        }).then(({status})=> {
            expect(status).to.eq(200)
            expect(body.text).to.equal('mensagem')
            expect(body.likes).to.have.lengthOf(0)
        })
        
        
    })
    it('atualiza o post', () => {
        cy.request({
            method:'PUT',
            url:`/api/post/like/${postid}`
    
        }).then(({status}) =>{
            expect(status).to.eq(200)

            cy.request({
                method:'GET',
                url:`/api/post/${postid}`,
                failOnStatusCode:false
        }).then(({body}) =>{
            expect(body.likes).to.have.lengthOf(1)
           
       
            })

        })
    
    })
    it('Deleta o post', () => {
        cy.request({
            method:'DELETE',
            url:`/api/post/${postid}`
        }).then(({status, body}) =>{
            expect(status).to.equal(200)
            expect(body.msg).to.eq('Post removido')
        }).then(({status}) =>{
            expext(status).to.equ(404)
        })
        
    })
    
})