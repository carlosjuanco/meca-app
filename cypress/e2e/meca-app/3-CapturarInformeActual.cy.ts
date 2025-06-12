import CapturarInformeActual from './CapturarInformeActual.vue'

describe('Componente CapturarInformeActual', () => {
  beforeEach(() => {
    // Para realizar bien esta prueba unitaria eliminar toda la informacion de la tabla "churche_concept_month_human"
    cy.visit('http://localhost:8083/')
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
    /* 
      La razón por el cual, en este método, se inicia sesión, posteriormente se hace la petición a la ruta
      "api/check", es que solamente en dos pruebas unitarias se utiliza, en las demás nunca.
      Se realizan muchas peticiones, ya que cada vez que termina una prueba unitaria y comienza otra
      se ejecuta la función "beforeEach" y después de correr muchas veces las pruebas unitarias, me marco
      el error que son demasiadas peticiones.
      Y tiene razón.
      En cambio las pruebas unitarias para él componente "AperturaDeMes", en cada prueba si se utilizan 
      los datos de las peticiones, por eso, para ese componente, se engloban las peticiones en la 
      función "beforeEach".
    */ 
    // Enlace: https://docs.cypress.io/app/core-concepts/variables-and-aliases#Aliases-are-reset-before-each-test
    cy.request('POST', 'http://localhost:8082/api/login', {
      email: 'secretariadeiglesia@gmail.com',
      password: 'secretariaiglesia'
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')

      let token: string = response.body.apiToken

      // Ocupar el token
      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/api/check',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let user = responseWithToken.body.user

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
        cy.get(".title").contains(`Iglesia ${user.churchToWhichItBelongs}`)

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Verificar que los conceptos se desplieguen horizontalmente"', () => {
    cy.request('POST', 'http://localhost:8082/api/login', {
      email: 'secretariadeiglesia@gmail.com',
      password: 'secretariaiglesia'
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')

      let token: string = response.body.apiToken

      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/api/getConcepts',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let concepts = responseWithToken.body.concepts

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
  })

  /*
    De la "Secretaria de iglesia" que pertenece a la iglesia "Centerio", realizar lo siguiente.
  */
  it('De la fila "Primera semana", ingresar por cada concepto el valor de 20, guardamos los datos"', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

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
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

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

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Agregar una tercera fila (Tercera semana), ingresar por cada concepto el valor de 40, guardamos los datos', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

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

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Agregar una cuarta fila (Cuarta semana), ingresar por cada concepto el valor de 50, guardamos los datos', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

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

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Agregar una quinta fila, no debe de aparecer ningula fila más', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(5)").contains("Nueva semana").click()

    // No debe existir una 5 fila de conceptos
    cy.get(".table tbody tr").should('have.length', 5)

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Terminar la "Primera semana", deben de deshabilitarse todos los campos de esa fila', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar botón "Terminar semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo lo filtro por fila
    cy.get(".table tbody tr:nth-child(1)").contains("Terminar semana").click()

    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Verificar que los campos tengan la propiedad disabled
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(2)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(3)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(4)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(5)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(6)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(7)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(8)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(9)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(10)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(11)").find("input[type='number']").should('be.disabled')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Terminar la "Segunda semana", deben de deshabilitarse todos los campos de esa fila', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar botón "Terminar semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo lo filtro por fila
    cy.get(".table tbody tr:nth-child(2)").contains("Terminar semana").click()

    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Verificar que los campos tengan la propiedad disabled
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").should('be.disabled')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Terminar la "Tercera semana", deben de deshabilitarse todos los campos de esa fila', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar botón "Terminar semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo lo filtro por fila
    cy.get(".table tbody tr:nth-child(3)").contains("Terminar semana").click()

    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Verificar que los campos tengan la propiedad disabled
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").should('be.disabled')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Terminar la "Cuarta semana", deben de deshabilitarse todos los campos de esa fila', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar botón "Terminar semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo lo filtro por fila
    cy.get(".table tbody tr:nth-child(4)").contains("Terminar semana").click()

    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Verificar que los campos tengan la propiedad disabled
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").should('be.disabled')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").should('be.disabled')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Ir al componente "Inicio" y regresamos a "Capturar informe actual", todos los botones por cada fila deben decir "Habilitar semana"', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Todos los botones por cada fila deben decir "Habilitar semana"
    // Primera fila
    cy.get(".table tbody tr:nth-child(1)").contains("Habilitar semana")
    // Segunda fila
    cy.get(".table tbody tr:nth-child(2)").contains("Habilitar semana")
    // Tercera fila
    cy.get(".table tbody tr:nth-child(3)").contains("Habilitar semana")
    // Cuarta fila
    cy.get(".table tbody tr:nth-child(4)").contains("Habilitar semana")

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('Habilitar la segunda semana, guardar cambios, me voy al componente "Informe por mes" y regreso, la segunda semana debe seguir habilitada', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia2@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia2')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Todos los botones por cada fila deben decir "Habilitar semana"
    // Segunda fila
    cy.get(".table tbody tr:nth-child(2)").contains("Habilitar semana").click()

    // Guardar cambios
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Me voy al componente "Informe por mes"
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Clic en el menú "Informe por mes"
    cy.get("a").contains("Informe por mes").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Regresar al menú "Capturar informe actual"
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Clic en el menú "Capturar informe actual"
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // La segunda semana debe seguir habilitada
    // Segunda fila
    cy.get(".table tbody tr:nth-child(2)").contains("Terminar semana")

    // Verificar que los campos no esten deshabilitados
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").should('not.be.disabled')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").should('not.be.disabled')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })
})