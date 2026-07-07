describe('Componente AppComunidad', () => {
    // Documentación de cypress
    // https://example.cypress.io
    /*
      * viewportHeight: 660,
      * viewportWidth: 1000,
      * 81%
      * Dispositivo: Computadora
      * browsers: [ {
      *   name: 'chrome',
      *   family: 'chromium',
      *   channel: 'stable',
      *   displayName: 'Chrome',
      *   version: '149.0.7827.201',
      *   path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      *   minSupportedVersion: 64,
      *   majorVersion: '149',
      * }]
    */
    beforeEach(() => {
      cy.visit('http://localhost:8091/')
    })

    it('Afirmar que el componente comunidades, se puede abrir', () => {
      // Ingresar con las credenciales del rol "Administrativo"
      cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
      cy.get('form').get("input[type='password']").type('administrativo')

      cy.get('form').contains('Ingresar').click()

      /*
        * Verificar que ya exista el menú inicio.
        *
        * Es importante que se realice este paso, debido a que si nos vamos directo a realizar otra acciones nos marca error.
        * Al parecer es importante esperar, de esta manera todos los elementos ya estan en su ubicación.
      */
      cy.get('a').contains("Inicio")  

      // Hacer clic para que se despliegue el menú
      cy.get(".js-burger").click()
      // Clic en el menú "Comunidades"
      cy.get("a").contains("Comunidades").click()
      // Desaparecer menú
      cy.get(".js-burger").click()

      // Existe el título "Lista de comunidades"
      cy.get(".title.has-text-centered").contains("Lista de comunidades")
      
      // Cerrar sesión
      cy.get(".js-burger").click()
      // Cerrar sesión
      cy.get(".button").contains("Cerrar").click()
    })

    it('Afirmar que el título Lista de comunidades existe', () => {
      // Ingresar con las credenciales del rol "Administrativo"
      cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
      cy.get('form').get("input[type='password']").type('administrativo')

      cy.get('form').contains('Ingresar').click()

      /*
        * Verificar que ya exista el menú inicio.
        *
        * Es importante que se realice este paso, debido a que si nos vamos directo a realizar otra acciones nos marca error.
        * Al parecer es importante esperar, de esta manera todos los elementos ya estan en su ubicación.
      */
      cy.get('a').contains("Inicio")  

      // Hacer clic para que se despliegue el menú
      cy.get(".js-burger").click()
      // Clic en el menú "Comunidades"
      cy.get("a").contains("Comunidades").click()
      // Desaparecer menú
      cy.get(".js-burger").click()

      // Existe el título "Lista de comunidades"
      cy.get(".title.has-text-centered").contains("Lista de comunidades")
      
      // Cerrar sesión
      cy.get(".js-burger").click()
      // Cerrar sesión
      cy.get(".button").contains("Cerrar").click()
    })

    it('Afirmar que el botón Agregar nueva comunidad existe', () => {
      // Ingresar con las credenciales del rol "Administrativo"
      cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
      cy.get('form').get("input[type='password']").type('administrativo')

      cy.get('form').contains('Ingresar').click()

      /*
        * Verificar que ya exista el menú inicio.
        *
        * Es importante que se realice este paso, debido a que si nos vamos directo a realizar otra acciones nos marca error.
        * Al parecer es importante esperar, de esta manera todos los elementos ya estan en su ubicación.
      */
      cy.get('a').contains("Inicio")  

      // Hacer clic para que se despliegue el menú
      cy.get(".js-burger").click()
      // Clic en el menú "Comunidades"
      cy.get("a").contains("Comunidades").click()
      // Desaparecer menú
      cy.get(".js-burger").click()

      // Afirmar que el botón "Agregar nueva comunidad" existe.
      cy.get(".button.is-link.is-fullwidth").contains("Agregar nueva comunidad")
      
      // Cerrar sesión
      cy.get(".js-burger").click()
      // Cerrar sesión
      cy.get(".button").contains("Cerrar").click()
    })

    it('Afirmar que la tabla exite', () => {
      // Ingresar con las credenciales del rol "Administrativo"
      cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
      cy.get('form').get("input[type='password']").type('administrativo')

      cy.get('form').contains('Ingresar').click()

      /*
        * Verificar que ya exista el menú inicio.
        *
        * Es importante que se realice este paso, debido a que si nos vamos directo a realizar otra acciones nos marca error.
        * Al parecer es importante esperar, de esta manera todos los elementos ya estan en su ubicación.
      */
      cy.get('a').contains("Inicio")  

      // Hacer clic para que se despliegue el menú
      cy.get(".js-burger").click()
      // Clic en el menú "Comunidades"
      cy.get("a").contains("Comunidades").click()
      // Desaparecer menú
      cy.get(".js-burger").click()

      // Afirmar que la tabla exite.
      cy.get(".table").find("thead").should('contain', "Nombre de la comunidad")
      
      // Cerrar sesión
      cy.get(".js-burger").click()
      // Cerrar sesión
      cy.get(".button").contains("Cerrar").click()
    })

    it('Afirmar que la cabecera con los títulos Nombre de la comunidad y Operaciones, existen.', () => {
      // Ingresar con las credenciales del rol "Administrativo"
      cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
      cy.get('form').get("input[type='password']").type('administrativo')

      cy.get('form').contains('Ingresar').click()

      /*
        * Verificar que ya exista el menú inicio.
        *
        * Es importante que se realice este paso, debido a que si nos vamos directo a realizar otra acciones nos marca error.
        * Al parecer es importante esperar, de esta manera todos los elementos ya estan en su ubicación.
      */
      cy.get('a').contains("Inicio")  

      // Hacer clic para que se despliegue el menú
      cy.get(".js-burger").click()
      // Clic en el menú "Comunidades"
      cy.get("a").contains("Comunidades").click()
      // Desaparecer menú
      cy.get(".js-burger").click()

      // Afirmar que la cabecera con los títulos "Nombre de la comunidad" y "Operaciones", existen.
      cy.get(".table").find("thead").should('contain', "Nombre de la comunidad")
      cy.get(".table").find("thead").should('contain', "Operaciones")
      
      // Cerrar sesión
      cy.get(".js-burger").click()
      // Cerrar sesión
      cy.get(".button").contains("Cerrar").click()
    })

    it('Afirmar que existen 10 registros en el cuerpo de la tabla', () => {
      // Ingresar con las credenciales del rol "Administrativo"
      cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
      cy.get('form').get("input[type='password']").type('administrativo')

      cy.get('form').contains('Ingresar').click()

      /*
        * Verificar que ya exista el menú inicio.
        *
        * Es importante que se realice este paso, debido a que si nos vamos directo a realizar otra acciones nos marca error.
        * Al parecer es importante esperar, de esta manera todos los elementos ya estan en su ubicación.
      */
      cy.get('a').contains("Inicio")  

      // Hacer clic para que se despliegue el menú
      cy.get(".js-burger").click()
      // Clic en el menú "Comunidades"
      cy.get("a").contains("Comunidades").click()
      // Desaparecer menú
      cy.get(".js-burger").click()

      // Afirmar que la cabecera con los títulos "Nombre de la comunidad" y "Operaciones", existen.
       cy.get(".table tbody tr").should('have.length', 10)
      
      // Cerrar sesión
      cy.get(".js-burger").click()
      // Cerrar sesión
      cy.get(".button").contains("Cerrar").click()
    })
})