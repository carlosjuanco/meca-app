import InformePorMeses from './InformePorMeses.vue'

describe('Componente InformePorMeses', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8084/')
  })

  it('¿Esta corriendo el sistema?', () => {
    cy.contains("p", "Acceso al sistema")
  })

  it('Afirmar que existe la lista desplegable con al menos el año actual 2025', () => {
    cy.request('POST', 'http://localhost:8082/api/login', {
      email: 'secretariadedistrito@gmail.com',
      password: 'secretariadistrito'
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')

      let token: string = response.body.apiToken

      // Ocupar el token
      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/api/getYears',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let years = responseWithToken.body.years

        cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariadistrito')

        cy.get('form').contains('Ingresar').click()

        // Verificar que ya exista el menú inicio
        cy.get('a').contains("Inicio")
        // Hacer clic para que se despliegue el menú
        cy.get(".js-burger").click()
        // Clic en el menú "Informe por meses"
        cy.get("a").contains("Informe por meses").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        cy.get("select").get(years[0])
      })
    })
  })

  it('Afirmar que existe el sub-componente "red para los meses del año", que contiene 12 botones', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    // Verificar que ya exista el menú inicio
    cy.get('a').contains("Inicio")
    // Hacer clic para que se despliegue el menú
    cy.get(".js-burger").click()
    // Clic en el menú "Informe por meses"
    cy.get("a").contains("Informe por meses").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // El sub-componente "red para los meses del año", que contiene 12 botones.
    cy.get(".columns .column button").should('have.length', 12)
  })

  it('Afirmar que al hacer clic para el mes de "Enero", aparezca el mensaje "Todavía no hay información para este mes"', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    // Verificar que ya exista el menú inicio
    cy.get('a').contains("Inicio")
    // Hacer clic para que se despliegue el menú
    cy.get(".js-burger").click()
    // Clic en el menú "Informe por meses"
    cy.get("a").contains("Informe por meses").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // El sub-componente "red para los meses del año", que contiene 12 botones.
    cy.get(".columns .column button").contains("Enero").click()

    // Clic en el modal interno
    cy.get(".fas.fa-exclamation-triangle.fa-10x").click()
  })

  it('Afirmar que al hacer clic para el mes de "Diciembre", aparezca el mensaje "Todavía no hay información para este mes"', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    // Verificar que ya exista el menú inicio
    cy.get('a').contains("Inicio")
    // Hacer clic para que se despliegue el menú
    cy.get(".js-burger").click()
    // Clic en el menú "Informe por meses"
    cy.get("a").contains("Informe por meses").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // El sub-componente "red para los meses del año", que contiene 12 botones.
    cy.get(".columns .column button").contains("Diciembre").click()

    // Clic en el modal interno
    cy.get(".fas.fa-exclamation-triangle.fa-10x").click()
  })

  it('Afirmar que al hacer clic para el mes de "Junio", se apertuera el componente "InformeMesSeleccionado"', () => {
    // De la prueba unitaria anterior, la voy a modificar, para que busque el mes abierto.
    cy.request('POST', 'http://localhost:8082/api/login', {
      email: 'secretariadedistrito@gmail.com',
      password: 'secretariadistrito'
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')

      let token: string = response.body.apiToken

      // Ocupar el token, para obtener todos los meses
      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/api/getMonths',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let months = responseWithToken.body.months

        let monthOpen = months.find((month) => month.status == 'Abierto')

        cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariadistrito')

        cy.get('form').contains('Ingresar').click()

        // Verificar que ya exista el menú inicio
        cy.get('a').contains("Inicio")
        // Hacer clic para que se despliegue el menú
        cy.get(".js-burger").click()
        // Clic en el menú "Informe por meses"
        cy.get("a").contains("Informe por meses").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", que contiene 12 botones.
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Existe el título "Informe de las iglesias del distrito de las flores"
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Informe de las iglesias del distrito de las flores")
      })
    })
  })
})