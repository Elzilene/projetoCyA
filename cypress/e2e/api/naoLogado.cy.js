describe('API - Profile', () => {
    let urlPerfis = '/api/profile'
    //DRY - Don't Repeat  Yourself
    context('todos os perfis', () => {
        it('Valida', () => {
            cy.log('Teste de texto')
            cy.request({
                method: 'GET',
                url:'urlPerfis'
            }).then(({status, duration, body, headers}) =>{
                expect(status).to.eq(200)
                expect(duration).to.be.lessThan(10000)
                expect(body[0].status).to.eq('Gerentes de Testes')
                expect(body[0].user.name).to.eq('Lene Soares')
                expect(body[0].skillis[0]).to.eq('cypress')
                expect(body[0].skillis).to.have.lengthOf(1)
                expect(body[0].date).to.note.be.null
                expect(headers['x-powered-by']).to.eq('Express')
            })
            
        })
        
    })
    context('perfil específico', () => {
        let urlPerfil = '/api/profile/user/'
        it('selecionar usuário invalido', () => {
            cy.request({
                method:'GET',
                url:`${urlPerfil}/1`,
                failOnSatusCode:false
            }).then(({status, body}) =>{
                expect(status).to.eq(404)
                expect(body.errors[0].masg).to.eq('perfil não')
            })
            
        })
        it('Validar um usuário válido', () => {
            let usuarioId ='637d72b11fb5cb0015a02258'
            cy.request({
                method:'GET',
                url:`${urlPerfil}/${usuarioId}`
            }).then(({status, body})=>{
                expect(status).to.eq(200)
                expect(body,user.name).to.eq('Lene Soares')
            })
            
        })
        it('Valida um usuário válido buscando na base', () => {

            cy.request({
                method:'GET',
                url:urlPerfis
            }).then(({body}) =>{
               
                cy.request({
                    method:'GET',
                    url:`${urlPerfil}/${body[1].user_id}`
                }).then(({status,body})=>{
                    expect(status).to.eq(200)
                    expect(body.status).to.eq('outro')
                })
            })

            })
            
        })
        
    })
    
