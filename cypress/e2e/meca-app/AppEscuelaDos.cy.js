describe('Componente AppEscuela', () => {
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

  // --- Funciones auxiliares para navegación ---
  const navegarAEscuelas = () => {
    // Ingresar con las credenciales del rol "Administrativo"
    cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
    cy.get('form').get("input[type='password']").type('administrativo')
    cy.get('form').contains('Ingresar').click()

    // Verificar que ya exista el menú inicio
    cy.get('a').contains("Inicio")  

    // Hacer clic para que se despliegue el menú
    cy.get(".js-burger").click()
    // Clic en el menú "Escuelas"
    cy.get("a").contains("Escuelas").click()
    // Desaparecer menú
    cy.get(".js-burger").click()
  }

  const cerrarSesion = () => {
    cy.get(".js-burger").click()
    cy.get(".button").contains("Cerrar").click()
  }

  // Función auxiliar para abrir el modal
  const abrirModal = () => {
    navegarAEscuelas()
    cy.get(".button.is-link.is-fullwidth").contains("Agregar nueva escuela").click()
    // Verificar que el modal se abrió
    cy.get(".modal").should('have.class', 'is-active')
  }

  // Función auxiliar para cerrar el modal y sesión
  const cerrarModalYSesion = () => {
    // Cerrar modal si está abierto
    cy.get(".modal .modal-background").click({ force: true })
    cerrarSesion()
  }

  // --- Validaciones del formulario ---
  it('debe mostrar error al guardar sin seleccionar tipo de escuela', () => {
    abrirModal()
    
    // Hacer clic en Guardar sin seleccionar tipo de escuela
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()
    
    // Verificar que aparece el mensaje de error para tipo de escuela
    cy.get(".modal-card-body .field .tag.is-warning")
      .eq(0)
      .should('be.visible')
      .and('contain', 'El tipo de escuela debe ser uno de los siguientes valores: Primaria, Preescolar, Inicial, Albergues escolares')
    
    cerrarModalYSesion()
  })

  it('debe mostrar error al guardar sin seleccionar comunidad', () => {
    abrirModal()
    
    // Seleccionar tipo de escuela para evitar ese error
    cy.get(".modal-card-body select").first().select('Primaria')
    
    // Hacer clic en Guardar sin seleccionar comunidad
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()
    
    // Verificar que aparece el mensaje de error para comunidad
    // Deberia ser el indice 1 en eq(1), pero parece que en las pruebas se selecciona "Primaria"
    // como "Tipo de escuela", por este motivo aquí se vuelve el indice 0 nuevamente.
    cy.get(".modal-card-body .field .tag.is-warning")
      .eq(0)
      .should('be.visible')
      .and('contain', 'Selecciona una comunidad')
    
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar más de 26 caracteres en el nombre de la escuela', () => {
    abrirModal()
    
    // Generar texto de 27 caracteres
    const textoLargo = 'a'.repeat(27)
    
    // Escribir en el input del nombre
    cy.get(".modal-card-body input[type='text']").first().type(textoLargo)
    
    // Hacer clic en Guardar
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()
    
    // Verificar que aparece el mensaje de error
    cy.get(".modal-card-body .field .tag.is-warning")
      .should('be.visible')
      .and('contain', 'La escuela debe tener como máximo 26 caracteres')
    
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar más de 10 caracteres en la clave', () => {
    abrirModal()
    
    // Generar texto de 11 caracteres
    const textoLargo = 'a'.repeat(11)
    
    // Escribir en el input de la clave (segundo input)
    cy.get(".modal-card-body input[type='text']").eq(1).type(textoLargo)
    
    // Hacer clic en Guardar
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()
    
    // Verificar que aparece el mensaje de error
    cy.get(".modal-card-body .field .tag.is-warning")
      .should('be.visible')
      .and('contain', 'La clave debe tener como máximo 10 caracteres')
    
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar un número mayor a 10 en el número progresivo', () => {
    abrirModal()
    
    // Escribir un número mayor a 10
    cy.get(".modal-card-body input[type='number']").type('11')
    
    // Hacer clic en Guardar
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()
    
    // Verificar que aparece el mensaje de error
    cy.get(".modal-card-body .field .tag.is-warning")
      .should('be.visible')
      .and('contain', 'El número progresivo no puede ser mayor a 10')
    
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar un número negativo en el número progresivo', () => {
    abrirModal()
    
    // Escribir un número negativo
    cy.get(".modal-card-body input[type='number']").type('-5')
    
    // Hacer clic en Guardar
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()
    
    // Verificar que aparece el mensaje de error
    cy.get(".modal-card-body .field .tag.is-warning")
      .should('be.visible')
      .and('contain', 'El número progresivo debe ser un número positivo')
    
    cerrarModalYSesion()
  })

  // --- Cierre del modal ---
  it('debe cerrar el modal al hacer clic en "Cancelar"', () => {
    abrirModal()
    
    // Hacer clic en Cancelar
    cy.get(".modal-card-foot .buttons .button").contains('Cancelar').click()
    
    // Verificar que el modal se cerró (no tiene la clase 'is-active')
    cy.get(".modal").should('not.have.class', 'is-active')
    
    cerrarModalYSesion()
  })

  it('debe cerrar el modal al hacer clic en el botón de cerrar (X)', () => {
    abrirModal()
    
    // Hacer clic en el botón de cerrar (X)
    cy.get(".modal-card-head .delete").click()
    
    // Verificar que el modal se cerró
    cy.get(".modal").should('not.have.class', 'is-active')
    
    cerrarModalYSesion()
  })

  it('debe cerrar el modal al hacer clic en el fondo (modal-background)', () => {
    abrirModal()
    
    // Hacer clic en el fondo del modal
    cy.get(".modal-background").click({ force: true })
    
    // Verificar que el modal se cerró
    cy.get(".modal").should('not.have.class', 'is-active')
    
    cerrarModalYSesion()
  })
})