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

    // Función auxiliar para navegar a Comunidades
    const navegarAComunidades = () => {
      // Ingresar con las credenciales del rol "Administrativo"
      cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
      cy.get('form').get("input[type='password']").type('administrativo')
      cy.get('form').contains('Ingresar').click()

      // Verificar que ya exista el menú inicio
      cy.get('a').contains("Inicio")  

      // Hacer clic para que se despliegue el menú
      cy.get(".js-burger").click()
      // Clic en el menú "Comunidades"
      cy.get("a").contains("Comunidades").click()
      // Desaparecer menú
      cy.get(".js-burger").click()
    }

    // Función auxiliar para cerrar sesión
    const cerrarSesion = () => {
      cy.get(".js-burger").click()
      cy.get(".button").contains("Cerrar").click()
    }

    it('Verificar que el componente AppComunidad se monta correctamente', () => {
      navegarAComunidades()

      // Existe el título "Lista de comunidades"
      cy.get(".title.has-text-centered").contains("Lista de comunidades")
      
      cerrarSesion()
    })

    it('Validar que el título Lista de comunidades esté visible', () => {
      navegarAComunidades()

      // Existe el título "Lista de comunidades"
      cy.get(".title.has-text-centered").contains("Lista de comunidades")
      
      cerrarSesion()
    })

    it('Comprobar la existencia del botón Agregar nueva comunidad', () => {
      navegarAComunidades()

      // Afirmar que el botón "Agregar nueva comunidad" existe.
      cy.get(".button.is-link.is-fullwidth").contains("Agregar nueva comunidad")
      
      cerrarSesion()
    })

    it('Asegurar que la tabla de comunidades se renderiza', () => {
      navegarAComunidades()

      // Afirmar que la tabla exite.
      cy.get(".table").find("thead").should('contain', "Nombre de la comunidad")
      
      cerrarSesion()
    })

    it('Verificar que los encabezados Nombre de la comunidad y Operaciones estén presentes', () => {
      navegarAComunidades()

      // Afirmar que la cabecera con los títulos "Nombre de la comunidad" y "Operaciones", existen.
      cy.get(".table").find("thead").should('contain', "Nombre de la comunidad")
      cy.get(".table").find("thead").should('contain', "Operaciones")
      
      cerrarSesion()
    })

    it('Validar que la tabla muestre exactamente 10 registros en el cuerpo', () => {
      navegarAComunidades()

      // Afirmar que existen 10 registros en el cuerpo de la tabla
      cy.get(".table tbody tr").should('have.length', 10)
      
      cerrarSesion()
    })

    it('Comprobar que el componente de paginación esté visible al pie de la tabla.', () => {
      navegarAComunidades()

      // Afirmar que el páginador existe en el pie de la tabla
      cy.get(".table tfoot tr").find('nav').find('ul').should('contain', 1)
      
      cerrarSesion()
    })

    // ==================== PRUEBAS DEL MODAL ====================
    // Función auxiliar para abrir el modal
    const abrirModal = () => {
      navegarAComunidades()
      cy.get(".button.is-link.is-fullwidth").contains("Agregar nueva comunidad").click()
      // Verificar que el modal se abrió
      cy.get(".modal").should('have.class', 'is-active')
    }

    // Función auxiliar para cerrar el modal y sesión
    const cerrarModalYSesion = () => {
      // Cerrar modal si está abierto
      cy.get(".modal .modal-background").click({ force: true })
      cerrarSesion()
    }

    // Apertura del modal
    it('debe abrir el modal al hacer clic en "Agregar nueva comunidad"', () => {        
      abrirModal()

      // Verificar que el título del modal sea "Nueva comunidad"
      cy.get(".modal-card-title").should('contain', 'Nueva comunidad')

      cerrarModalYSesion()
    })

    // Renderizado del formulario dentro del modal
    it('debe mostrar la etiqueta "Comunidad" dentro del modal', () => {        
      abrirModal()
      
      // Verificar que la etiqueta "Comunidad" existe
      cy.get(".modal-card-body .field .label").should('contain', 'Comunidad')
      
      cerrarModalYSesion()
    })

    it('debe mostrar el input para capturar "Comunidad"', () => {
      abrirModal()
      
      // Verificar que el input existe
      cy.get(".modal-card-body input[type='text']").should('exist')
      // Verificar que el placeholder es "Comunidad"
      cy.get(".modal-card-body input[type='text']").should('have.attr', 'placeholder', 'Comunidad')
      // Verificar que está vacío inicialmente
      cy.get(".modal-card-body input[type='text']").should('have.value', '')

      cerrarModalYSesion()
    })

    // Acciones del modal
    it('debe mostrar el botón "Guardar" dentro del modal', () => {
      abrirModal()
              
      // Verificar que el botón "Guardar" existe
      cy.get(".modal-card-foot .buttons .button.is-link").should('contain', 'Guardar')
      // Verificar que no está deshabilitado
      cy.get(".modal-card-foot .buttons .button.is-link").should('not.be.disabled')
      
      cerrarModalYSesion()
    })

    it('debe mostrar el botón "Cancelar" dentro del modal', () => {
      abrirModal()
              
      // Verificar que el botón "Cancelar" existe
      cy.get(".modal-card-foot .buttons .button").contains('Cancelar').should('exist')
      
      cerrarModalYSesion()
    })

    // Validaciones del formulario
    it('debe mostrar error al guardar sin rellenar el campo "Comunidad"', () => {
      abrirModal()
      
      // Hacer clic en Guardar sin llenar el campo
      cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()
      
      // Verificar que aparece el mensaje de error
      cy.get(".modal-card-body .field .tag.is-warning")
        .should('be.visible')
        .and('contain', 'El nombre debe tener al menos 1 carácter')
      
      cerrarModalYSesion()
    })

    it('debe mostrar error al ingresar más de 25 caracteres', () => {
      abrirModal()
      
      // Generar texto de 26 caracteres
      const textoLargo = 'a'.repeat(26)
      
      // Escribir en el input
      cy.get(".modal-card-body input[type='text']").type(textoLargo)
      
      // Hacer clic en Guardar
      cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()
      
      // Verificar que aparece el mensaje de error
      cy.get(".modal-card-body .field .tag.is-warning")
        .should('be.visible')
        .and('contain', 'El nombre debe tener como máximo 25 caracteres')
      
      cerrarModalYSesion()
    })

    // Cierre del modal
    it('debe cerrar el modal al hacer clic en "Cancelar"', () => {
      abrirModal()
      
      // Hacer clic en Cancelar
      cy.get(".modal-card-foot .buttons .button").contains('Cancelar').click()
      
      // Verificar que el modal se cerró (no tiene la clase 'is-active')
      cy.get(".modal").should('not.have.class', 'is-active')
      
      cerrarModalYSesion()
    })

    // Cierre del modal con el botón "X"
    it('debe cerrar el modal al hacer clic en el botón de cerrar (X)', () => {
      abrirModal()
      
      // Hacer clic en el botón de cerrar (X)
      cy.get(".modal-card-head .delete").click()
      
      // Verificar que el modal se cerró
      cy.get(".modal").should('not.have.class', 'is-active')
      
      cerrarModalYSesion()
    })

    // Cierre del modal haciendo clic en el fondo
    it('debe cerrar el modal al hacer clic en el fondo (modal-background)', () => {
      abrirModal()
      
      // Hacer clic en el fondo del modal
      cy.get(".modal-background").click({ force: true })
      
      // Verificar que el modal se cerró
      cy.get(".modal").should('not.have.class', 'is-active')
      
      cerrarModalYSesion()
    })
})