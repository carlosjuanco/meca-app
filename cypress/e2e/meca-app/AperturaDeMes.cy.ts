import AperturaDeMes from './AperturaDeMes.vue'

describe('Componente AperturaDeMes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8083/')

    // Login y guardar el token en un alias
    // Enlace: https://docs.cypress.io/app/core-concepts/variables-and-aliases#Aliases-are-reset-before-each-test
    cy.request('POST', 'http://localhost:8082/api/login', {
      email: 'secretariadedistrito@gmail.com',
      password: 'secretariadistrito'
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
        url: 'http://localhost:8082/api/getMonths',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property('headers')
        cy.wrap(response.body.months).as('months');
      });
    });

    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/api/getYears',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property('headers')
        cy.wrap(response.body.years).as('years');
      });
    });
  })

  it('¿Esta corriendo el sistema?', () => {
    cy.contains("p", "Acceso al sistema")
  })

  it('Ir al menú "Apertura de mes" y comprobar que este abierto el mes actual', () => {
    // Ocupar el alias almacenado 'months'
    cy.get('@months').then((months) => {
      let monthOpen = months.find((month) => month.status == 'Abierto')

      cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
      cy.get('form').get("input[type='password']").type('secretariadistrito')

      cy.get('form').contains('Ingresar').click()

      // Verificar que ya exista el menú inicio
      // Es importante este paso hacerlo, debido a que si nos vamos directo a figure, marca error.
      // Al parecer al esperar que confirme que aparezca el menú inicio, ahora si, esta seguro que 
      // aparecera "figure" del componente "ModalNotification"
      cy.get('a').contains("Inicio")
      // Hacer clic para que aparezca el botón cerrar sesión
      cy.get(".js-burger").click()
      cy.get(".navbar-start a:nth-child(4)").click()
      cy.get(".is-link").contains(monthOpen.month)
      cy.get(".js-burger").click()
    })
  })

  it('Corroborar que existe la lista desplegable con al menos el año actual 2025', () => {
    cy.get('@years').then((years) => {
      cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
      cy.get('form').get("input[type='password']").type('secretariadistrito')

      cy.get('form').contains('Ingresar').click()

      // Verificar que ya exista el menú inicio
      // Es importante este paso hacerlo, debido a que si nos vamos directo a figure, marca error.
      // Al parecer al esperar que confirme que aparezca el menú inicio, ahora si, esta seguro que 
      // aparecera "figure" del componente "ModalNotification"
      cy.get('a').contains("Inicio")
      // Hacer clic para que aparezca el botón cerrar sesión
      cy.get(".js-burger").click()
      cy.get(".navbar-start a:nth-child(4)").click()

      cy.get("select").get(years[0])
    })
  })

  it('Cerrar el mes actual, verificar que todos los cuadros que tiene la etiqueta de los meses del año, esten disponibles para hacer clic', () => {
    cy.get('@months').then((months) => {
      let monthOpen = months.find((month) => month.status == 'Abierto')
      console.info("Que mes esta bierto:::", monthOpen.month)

      cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
      cy.get('form').get("input[type='password']").type('secretariadistrito')

      cy.get('form').contains('Ingresar').click()

      // Verificar que ya exista el menú inicio
      // Es importante este paso hacerlo, debido a que si nos vamos directo a figure, marca error.
      // Al parecer al esperar que confirme que aparezca el menú inicio, ahora si, esta seguro que 
      // aparecera "figure" del componente "ModalNotification"
      cy.get('a').contains("Inicio")
      // Hacer clic para que aparezca el menú
      cy.get(".js-burger").click()
      cy.get(".navbar-start a:nth-child(4)").click()
      // Clic nuevamente para que desaparezca el menú
      cy.get(".js-burger").click()

      // Cerrar el mes actual
      cy.get(`input[name='open_or_close_${monthOpen.month}`).last().click()

      // Verificar que todos los cuadro que tiene la etiqueta de los meses del año, esten disponibles para hacer clic
      cy.get('.bd-notification.is-fullwidth').should('not.be.disabled');
    })
  })

  it('Abrir un mes aleatorio, que sea menor al mes actual, verificar que el resto de cuadros con los demas meses del año, se vuelvan opacos y que no este disponible las etiquetas de "Abierto" y "Cerrado", para seleccionar', () => {
    cy.get('@months').then((months) => {
      let monthOpen = months.find((month) => month.status == 'Abierto')

      cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
      cy.get('form').get("input[type='password']").type('secretariadistrito')

      cy.get('form').contains('Ingresar').click()

      // Verificar que ya exista el menú inicio
      // Es importante este paso hacerlo, debido a que si nos vamos directo a figure, marca error.
      // Al parecer al esperar que confirme que aparezca el menú inicio, ahora si, esta seguro que 
      // aparecera "figure" del componente "ModalNotification"
      cy.get('a').contains("Inicio")
      // Clic en la imagen de advertencia
      cy.get('figure').click()
      // Hacer clic para que aparezca el menú
      cy.get(".js-burger").click()
      // Clic en "Apertura de mes"
      cy.get(".navbar-start a:nth-child(4)").click()
      // Clic en la imagen de advertencia
      cy.get('figure').click()
      // Clic nuevamente para que desaparezca el menú
      cy.get(".js-burger").click()

      // Abrir un mes aleatorio, que sea menor al mes actual
      const fechaActual = new Date(); // Obtiene la fecha actual
      const mes = fechaActual.getMonth(); // Obtiene el mes en formato numérico (0-11)
      let numero = Math.floor(Math.random() * mes);
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const nombreMes = meses[numero]; // Obtiene el nombre del mes

      // Abrir el mes aleatorio
      cy.get(`input[name='open_or_close_${nombreMes}'`).first().click()

      // verificar que el resto de cuadros con los demas meses del año, se vuelvan opacos y que no este disponible las etiquetas de "Abierto" y "Cerrado", para seleccionar
      cy.get('button[disabled]').should('have.length', 11);
    })
  })

  it('Abrir el mes actual, verificar que el resto de cuadros con los demas meses del año, se vuelvan opacos y que no este disponible las etiquetas de "Abierto" y "Cerrado", para seleccionar', () => {
    cy.get('@months').then((months) => {
      // Cerramos el mes abierto aleatorio
      let monthOpen = months.find((month) => month.status == 'Abierto')

      cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
      cy.get('form').get("input[type='password']").type('secretariadistrito')

      cy.get('form').contains('Ingresar').click()

      // Verificar que ya exista el menú inicio
      // Es importante este paso hacerlo, debido a que si nos vamos directo a figure, marca error.
      // Al parecer al esperar que confirme que aparezca el menú inicio, ahora si, esta seguro que 
      // aparecera "figure" del componente "ModalNotification"
      cy.get('a').contains("Inicio")
      // Hacer clic para que aparezca el menú
      cy.get(".js-burger").click()
      // Clic en "Apertura de mes"
      cy.get(".navbar-start a:nth-child(4)").click()
      // Clic nuevamente para que desaparezca el menú
      cy.get(".js-burger").click()

      // Cerrar el mes aleatorio abierto
      cy.get(`input[name='open_or_close_${monthOpen.month}'`).last().click()

      // Abrir el mes actual
      const fechaActual = new Date(); // Obtiene la fecha actual
      const mes = fechaActual.getMonth(); // Obtiene el mes en formato numérico (0-11)
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const nombreMes = meses[mes]; // Obtiene el nombre del mes

      monthOpen = months.find((month) => month.month == nombreMes)

      // Abrir el mes actual
      cy.get(`input[name='open_or_close_${monthOpen.month}'`).first().click()

      // verificar que el resto de cuadros con los demas meses del año, se vuelvan opacos y que no este disponible las etiquetas de "Abierto" y "Cerrado", para seleccionar
      cy.get('button[disabled]').should('have.length', 11);
    })
  })
})