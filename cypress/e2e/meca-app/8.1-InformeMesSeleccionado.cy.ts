import InformeMesSeleccionado from './InformeMesSeleccionado.vue'

describe('Componente InformeMesSeleccionado', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8083/')
  })

  /*
    Cree otro archivo porque al ejecutar la prueba de "Afirmar que la iglesia "Jardín" por cada concepto tiene el valor 23"
    dentro del archivo "8-InformeMesSeleccionado.cy.ts" me marcaba error, y revisando no tiene, solo se me ocurrio que son
    demasiadas solicitudes, pero tampoco marca ese error, porque si me ha tocado en el archivo de prueba 
    "2-AperturaDeMes.cy.ts", que me marque ese error.
    Incluso corriendo los archivos consecutivamente, cuando llega aquí debo cerrar y abrir de nuevo cypress, para que corra
    correctamente.
  */
  it('Afirmar que la iglesia "Jardín" por cada concepto tiene el valor 23', () => {
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

        // Buscar la fila de la iglesia "Jardín".
        cy.get(".table tbody tr:nth-child(6) td:first-child").contains("Jardín")

        // Cada concepto debe de tener 23 de la iglesia "Jardín"
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(2)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(3)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(4)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(5)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(6)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(7)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(8)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(9)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(10)").contains('23')
        cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(11)").contains('23')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "7 Regiones" por cada concepto tiene el valor 60', () => {
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

        // Buscar la fila de la iglesia "7 Regiones".
        cy.get(".table tbody tr:nth-child(7) td:first-child").contains("7 Regiones")

        // Cada concepto debe de tener 60 de la iglesia "7 Regiones"
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(2)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(3)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(4)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(5)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(6)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(7)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(8)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(9)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(10)").contains('60')
        cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(11)").contains('60')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "San Luis Beltran" por cada concepto tiene el valor 259', () => {
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

        // Buscar la fila de la iglesia "San Luis Beltran".
        cy.get(".table tbody tr:nth-child(8) td:first-child").contains("San Luis Beltran")

        // Cada concepto debe de tener 259 de la iglesia "San Luis Beltran"
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(2)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(3)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(4)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(5)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(6)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(7)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(8)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(9)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(10)").contains('259')
        cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(11)").contains('259')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Zogocho" por cada concepto tiene el valor 227', () => {
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

        // Buscar la fila de la iglesia "Zogocho".
        cy.get(".table tbody tr:nth-child(9) td:first-child").contains("Zogocho")

        // Cada concepto debe de tener 227 de la iglesia "Zogocho"
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(2)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(3)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(4)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(5)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(6)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(7)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(8)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(9)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(10)").contains('227')
        cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(11)").contains('227')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Huayapam" por cada concepto tiene el valor 231', () => {
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

        // Buscar la fila de la iglesia "Huayapam".
        cy.get(".table tbody tr:nth-child(10) td:first-child").contains("Huayapam")

        // Cada concepto debe de tener 231 de la iglesia "Huayapam"
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(2)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(3)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(4)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(5)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(6)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(7)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(8)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(9)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(10)").contains('231')
        cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(11)").contains('231')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Yatareni" por cada concepto tiene el valor 231', () => {
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

        // Buscar la fila de la iglesia "Yatareni".
        cy.get(".table tbody tr:nth-child(11) td:first-child").contains("Yatareni")

        // Cada concepto debe de tener 231 de la iglesia "Yatareni"
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(2)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(3)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(4)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(5)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(6)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(7)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(8)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(9)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(10)").contains('231')
        cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(11)").contains('231')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que la iglesia "Tres Cruces" por cada concepto tiene el valor 147', () => {
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

        // Buscar la fila de la iglesia "Tres Cruces".
        cy.get(".table tbody tr:nth-child(12) td:first-child").contains("Tres Cruces")

        // Cada concepto debe de tener 147 de la iglesia "Tres Cruces"
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(2)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(3)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(4)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(5)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(6)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(7)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(8)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(9)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(10)").contains('147')
        cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(11)").contains('147')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que el concepto "Anterior" por cada concepto tiene el valor 0', () => {
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

        // Buscar la fila de la "Anterior".
        cy.get(".table tbody tr:nth-child(13) td:first-child").contains("Anterior")

        // Cada concepto debe de tener 0 de la fila "Anterior"
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(2)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(3)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(4)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(5)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(6)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(7)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(8)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(9)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(10)").contains('0')
        cy.get(".table tbody tr:nth-child(13)").find("td:nth-child(11)").contains('0')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })

  it('Afirmar que el concepto "Total distrital" por cada concepto tiene el valor 1766', () => {
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

        // Buscar la fila de "Total distrital".
        cy.get(".table tbody tr:nth-child(14) td:first-child").contains("Total distrital")

        // Cada concepto debe de tener 1766 de la iglesia "Total distrital"
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(2)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(3)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(4)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(5)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(6)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(7)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(8)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(9)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(10)").contains('1766')
        cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(11)").contains('1766')

        // Clic, para que aparezca el menú
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").contains("Cerrar").click()
      })
    })
  })
})