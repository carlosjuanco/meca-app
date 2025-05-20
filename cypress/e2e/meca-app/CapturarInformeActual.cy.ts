import CapturarInformeActual from './CapturarInformeActual.vue'

describe('Componente CapturarInformeActual', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8083/')

    // Login y guardar el token en un alias
    // Enlace: https://docs.cypress.io/app/core-concepts/variables-and-aliases#Aliases-are-reset-before-each-test
    cy.request('POST', 'http://localhost:8082/api/login', {
      email: 'secretariadeiglesia@gmail.com',
      password: 'secretariaiglesia'
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')
      cy.wrap(response.body.api_token).as('authToken');
    })

    // Ocupar el token
    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/api/check',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property('headers')
        cy.wrap(response.body.user).as('user');
      });
    });

    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/api/getConcepts',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property('headers')
        cy.wrap(response.body.concepts).as('concepts');
      });
    });

    // cy.get('@authToken').then((token) => {
    //   cy.request({
    //     method: 'GET',
    //     url: 'http://localhost:8082/api/getChurcheWithConcepts',
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }).then((response) => {
    //     expect(response.status).to.eq(200);
    //     expect(response).to.have.property('headers')
    //     cy.wrap(response.body.churcheConceptMonthHuman).as('churche_concepts');
    //   });
    // });
  })

  it('¿Esta corriendo el sistema?', () => {
    cy.contains("p", "Acceso al sistema")
  })

  it('Iniciar sesión con el usuario "Secretaria de iglesia" y comprobar que el menú "Capturar informe actual" exista', () => {
    cy.get('form').get("input[type='email']").type('secretariadeiglesia@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Verificar que usuario si pertenezca a la iglesia "Las flores"', () => {
    cy.get('@user').then((user) => {
      cy.get('form').get("input[type='email']").type('secretariadeiglesia@gmail.com')
      cy.get('form').get("input[type='password']").type('secretariaiglesia')

      cy.get('form').contains('Ingresar').click()

      cy.contains("a", "Inicio")
      // Clic, para que aparezca el menú
      cy.get(".js-burger").click()
      cy.get("a").contains("Capturar informe actual").click()
      // Desaparecer menú
      cy.get(".js-burger").click()
      // ¿Pertenecesi a la iglesia "Las flores"?
      cy.get(".title").contains(`Iglesia ${user.church_to_which_it_belongs}`)

      // Clic, para que aparezca el menú
      cy.get(".js-burger").click()
      // Cerrar sesión
      cy.get(".button").contains("Cerrar").click()
    })
  })

  it('Verificar que los conceptos se desplieguen horizontalmente"', () => {
    cy.get('@concepts').then((concepts) => {
      cy.get('form').get("input[type='email']").type('secretariadeiglesia@gmail.com')
      cy.get('form').get("input[type='password']").type('secretariaiglesia')

      cy.get('form').contains('Ingresar').click()

      cy.contains("a", "Inicio")
      // Clic, para que aparezca el menú
      cy.get(".js-burger").click()
      cy.get("a").contains("Capturar informe actual").click()
      // Desaparecer menú
      cy.get(".js-burger").click()
      // Estan todos los conceptos
      concepts.forEach(concept => {
        // Si no se agrega comilla simple al revez, marca el error, que el método "contains"
        // solo acepta texto, número y ...
        cy.get(".table thead tr").contains(`${concept.concept}`)
      })

      // Clic, para que aparezca el menú
      cy.get(".js-burger").click()
      // Cerrar sesión
      cy.get(".button").contains("Cerrar").click()
    })
  })

  it('De la fila "Primera semana", ingresar por cada concepto el valor de 20, guardamos los datos"', () => {
    cy.get('form').get("input[type='email']").type('secretariadeiglesia@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 20
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}20')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Agregar una segunda fila (Segunda semana), ingresar por cada concepto el valor de 30, guardamos los datos', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 20
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}30')

    // // Clic en guardar
    cy.get(".button.is-success").click()
    // // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Agregar una tercera fila (Segunda semana), ingresar por cada concepto el valor de 40, guardamos los datos', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 20
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}40')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}40')

    // // Clic en guardar
    cy.get(".button.is-success").click()
    // // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Agregar una cuarta fila (Segunda semana), ingresar por cada concepto el valor de 50, guardamos los datos.', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 20
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}50')

    // // Clic en guardar
    cy.get(".button.is-success").click()
    // // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })
})