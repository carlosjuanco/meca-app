import InformeMesX from './InformeMesX.vue'

describe('Componente InformeMesX', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8083/')
  })

  it('¿Esta corriendo el sistema?', () => {
    cy.contains("p", "Acceso al sistema")
  })

  it('Afirmar que si se abre el componente "Informe mes x", al hacer clic en el mes de "Mayo", desde el componente "Informe por mes"', () => {
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
        url: 'http://localhost:8082/api/getMonths',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let months = responseWithToken.body.months
        let monthOpen = months.find((month) => month.status == 'Abierto')

        cy.get('form').get("input[type='email']").type('secretariadeiglesia@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariaiglesia')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por mes").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Mayo"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que ya existe el botón con el texto "Exportar en PDF"
        cy.get(".button.is-info.is-large.pt-3.pb-3.is-fullwidth").contains("Exportar en PDF")

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que tiene 4 semanas capturadas', () => {
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
        url: 'http://localhost:8082/api/getMonths',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let months = responseWithToken.body.months
        let monthOpen = months.find((month) => month.status == 'Abierto')

        cy.get('form').get("input[type='email']").type('secretariadeiglesia@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariaiglesia')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por mes").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Mayo"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que ya existe el botón con el texto "Exportar en PDF"
        cy.get(".button.is-info.is-large.pt-3.pb-3.is-fullwidth").contains("Exportar en PDF")

        // Afirmar que es de la iglesia "Las flores".
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Iglesia Las Flores")

        // Afirmar que tiene 4 semanas capturadas
        cy.get(".table tbody tr:nth-child(1)").find("th:nth-child(1)").contains('Primera semana')
        cy.get(".table tbody tr:nth-child(2)").find("th:nth-child(1)").contains('Segunda semana')
        cy.get(".table tbody tr:nth-child(3)").find("th:nth-child(1)").contains('Tercera semana')
        cy.get(".table tbody tr:nth-child(4)").find("th:nth-child(1)").contains('Cuarta semana')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la primera fila tiene 50 en cada concepto', () => {
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
        url: 'http://localhost:8082/api/getMonths',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let months = responseWithToken.body.months
        let monthOpen = months.find((month) => month.status == 'Abierto')

        cy.get('form').get("input[type='email']").type('secretariadeiglesia@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariaiglesia')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por mes").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Mayo"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que ya existe el botón con el texto "Exportar en PDF"
        cy.get(".button.is-info.is-large.pt-3.pb-3.is-fullwidth").contains("Exportar en PDF")

        // Afirmar que es de la iglesia "Las flores".
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Iglesia Las Flores")

        // Afirmar que tiene 4 semanas capturadas
        cy.get(".table tbody tr:nth-child(1)").find("th:nth-child(1)").contains('Primera semana')
        
        // Afirmar que la primera fila tiene 50 en cada concepto
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(2) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(3) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(4) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(5) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(6) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(7) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(8) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(9) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(10) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(11) input[type='number']")
          .should('have.value', '50')     // el valor es 50
          .should('be.disabled');

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la segunda fila tiene 51 en cada concepto', () => {
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
        url: 'http://localhost:8082/api/getMonths',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let months = responseWithToken.body.months
        let monthOpen = months.find((month) => month.status == 'Abierto')

        cy.get('form').get("input[type='email']").type('secretariadeiglesia@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariaiglesia')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por mes").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Mayo"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que ya existe el botón con el texto "Exportar en PDF"
        cy.get(".button.is-info.is-large.pt-3.pb-3.is-fullwidth").contains("Exportar en PDF")

        // Afirmar que es de la iglesia "Las flores".
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Iglesia Las Flores")

        // Afirmar que tiene 4 semanas capturadas
        cy.get(".table tbody tr:nth-child(2)").find("th:nth-child(1)").contains('Segunda semana')
        
        // Afirmar que la primera fila tiene 51 en cada concepto
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11) input[type='number']")
          .should('have.value', '51')     // el valor es 51
          .should('be.disabled');

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que al mandar a llamar la ruta "monthlyReportOfTheChurchSecretary", regresa el nombre del archivo pdf', () => {
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
        url: 'http://localhost:8082/api/getMonths',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((responseWithToken) => {
        expect(responseWithToken.status).to.eq(200);
        expect(responseWithToken).to.have.property('headers')

        let months = responseWithToken.body.months
        let monthOpen = months.find((month) => month.status == 'Abierto')

        cy.request('POST', 'http://localhost:8082/api/login', {
          email: 'secretariadeiglesia@gmail.com',
          password: 'secretariaiglesia'
        })
        .then((responseChurchSecretary) => {
          expect(responseChurchSecretary.status).to.eq(200)
          expect(responseChurchSecretary).to.have.property('headers')

          let tokenChurchSecretary: string = responseChurchSecretary.body.apiToken

          // Llamar al método "monthlyReportOfTheChurchSecretary"
          cy.request({
            method: 'PUT',
            url: `http://localhost:8082/api/monthlyReportOfTheChurchSecretary/${monthOpen.id}`,
            headers: {
              Authorization: `Bearer ${tokenChurchSecretary}`
            }
          }).then((responseWithTokenChurchSecretary) => {
            expect(responseWithTokenChurchSecretary.status).to.eq(200);
            expect(responseWithTokenChurchSecretary).to.have.property('headers')

            let file = responseWithTokenChurchSecretary.body.file
            console.info('Si trae el nombre del archivo', file)
          })
        })
      })
    })
  })
})