import Ajv from 'ajv'
Cypress.Commands.add('login',(email, password) =>{
    cy.request({
        method:'POST',
        url:'/api/auth',
        body:{
            email,
            password
        }    
    }).then(()=>{
        cypress.Cookies.defaults({
            preserve: 'jwt'

        })
    })
})
Cypress.Commands.add('testeContrato',()=>{
    // Função de mostrar os erros
    const getSchemaErros(ajvErros)=>{
        return cy.wrap(
            `campo:${ajvErros[0]['instancePath']} é invalido.Erros:${ajvErros[0]['message']}`

        )

    }
})
