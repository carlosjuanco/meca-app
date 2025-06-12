import InformeMesSeleccionado from './InformeMesSeleccionado.vue'

describe('Componente InformeMesSeleccionado', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8083/')
  })

  it('¿Esta corriendo el sistema?', () => {
    cy.contains("p", "Acceso al sistema")
  })

  it('Afirmar que si se abre el componente "Informe mes seleccionado", al hacer clic en el mes de "Junio", desde el componente "Informe por meses"', () => {
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

        cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariadistrito')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por meses").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Junio"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que existe el título "Informe de las iglesias del distrito de las flores"
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Informe de las iglesias del distrito de las flores")

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Centenario" por cada concepto tiene el valor 140', () => {
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

        cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariadistrito')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por meses").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Junio"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que existe el título "Informe de las iglesias del distrito de las flores"
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Informe de las iglesias del distrito de las flores")

        // Afirmar que de la iglesia "Centenario".
        cy.get(".table tbody tr:nth-child(1) td:first-child").contains("Centenario")

        // por cada concepto tiene el valor 140
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(2)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(3)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(4)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(5)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(6)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(7)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(8)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(9)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(10)").contains('140')
        cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(11)").contains('140')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Familias en Crecimiento" por cada concepto tiene el valor 30', () => {
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

        cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariadistrito')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por meses").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Junio"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que existe el título "Informe de las iglesias del distrito de las flores"
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Informe de las iglesias del distrito de las flores")

        // Buscar la fila de la iglesia "Familias en Crecimiento".
        cy.get(".table tbody tr:nth-child(2) td:first-child").contains("Familias en Crecimiento")

        // Cada concepto debe de tener 30 de la iglesia "Familias en Crecimiento"
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").contains('30')
        cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").contains('30')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Las Flores" por cada concepto tiene el valor 206', () => {
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

        cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariadistrito')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por meses").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Junio"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que existe el título "Informe de las iglesias del distrito de las flores"
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Informe de las iglesias del distrito de las flores")

        // Buscar la fila de la iglesia "Las flores".
        cy.get(".table tbody tr:nth-child(3) td:first-child").contains("Las Flores")

        // Cada concepto debe de tener 206 de la iglesia "Las Flores"
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").contains('206')
        cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").contains('206')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Volcanes" por cada concepto tiene el valor 86', () => {
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

        cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariadistrito')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por meses").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Junio"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que existe el título "Informe de las iglesias del distrito de las flores"
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Informe de las iglesias del distrito de las flores")

        // Buscar la fila de la iglesia "Volcanes".
        cy.get(".table tbody tr:nth-child(4) td:first-child").contains("Volcanes")

        // Cada concepto debe de tener 86 de la iglesia "Volcanes"
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").contains('86')
        cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").contains('86')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Donaji" por cada concepto tiene el valor 126', () => {
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

        cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
        cy.get('form').get("input[type='password']").type('secretariadistrito')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        cy.get("a").contains("Informe por meses").click()
        // Desaparecer menú
        cy.get(".js-burger").click()

        // El sub-componente "red para los meses del año", hacer clic en el mes de "Junio"
        cy.get(".columns .column button").contains(monthOpen.month).click()

        // Afirmar que existe el título "Informe de las iglesias del distrito de las flores"
        cy.get(".title.is-1.has-text-centered.mt-1").contains("Informe de las iglesias del distrito de las flores")

        // Buscar la fila de la iglesia "Donaji".
        cy.get(".table tbody tr:nth-child(5) td:first-child").contains("Donaji")

        // Cada concepto debe de tener 126 de la iglesia "Donaji"
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(2)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(3)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(4)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(5)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(6)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(7)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(8)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(9)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(10)").contains('126')
        cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(11)").contains('126')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })
})