import Ajv from 'ajv'
import {definitionHelper} from '../utils/schemaDefinitions'

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
Cypress.Commands.add('testeContrato',(schema, resposta)=>{
    // Função de mostrar os erros
    const getSchemaError(ajvErros)=>{
        return cy.wrap(
            `campo:${ajvErros[0]['instancePath']} é invalido.Erros:${ajvErros[0]['message']}`

        )

    }
    // iniciar o ajv
    const ajv = new Ajv()
    const validacao = ajv.addSchema().compile(schema)
    const valido = validacao.validate(resposta)

    //verificar se o schema passou ou falhou
    if(!valido){
        getSchemaError(validacao.errors).then((schemaError)=>{
            throw new Error(schemaError)
        })
    }else{
        expect(valido, 'validacão de contrato').to.be.true
    }
     
})
