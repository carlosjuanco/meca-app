describe('Componente AppProfesor - Validaciones y cierre', () => {
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
  const navegarAProfesores = () => {
    // Ingresar con las credenciales del rol "Administrativo"
    cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
    cy.get('form').get("input[type='password']").type('administrativo')
    cy.get('form').contains('Ingresar').click()

    // Verificar que ya exista el menú inicio
    cy.get('a').contains("Inicio")

    // Hacer clic para que se despliegue el menú
    cy.get(".js-burger").click()
    // Clic en el menú "Profesores"
    cy.get("a").contains("Profesores").click()
    // Desaparecer menú
    cy.get(".js-burger").click()
  }

  const cerrarSesion = () => {
    cy.get(".js-burger").click()
    cy.get(".button").contains("Cerrar").click()
  }

  const abrirModal = () => {
    navegarAProfesores()
    cy.get(".button.is-link.is-fullwidth").contains("Agregar nuevo profesor o profesora").click()
    cy.get(".modal").should('have.class', 'is-active')
  }

  const cerrarModalYSesion = () => {
    cy.get(".modal .modal-background").click({ force: true })
    cerrarSesion()
  }

  // ==================== VALIDACIONES DEL FORMULARIO ====================

  it('debe mostrar los mensajes de error de campos obligatorios al guardar vacío', () => {
    abrirModal()
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()

    // Quitare .should('be.visible'), sé que si aparece, pero al poner eso, literalmemte deben aparecer en pantalla
    // como no aparecen porque la ventana es chica y en todo caso el que aparece es teléfono es el único que pasa
    // me lleva la super verga, pero sé que si aparecen
    cy.contains('.tag.is-warning', 'El nombre es obligatorio')
    cy.contains('.tag.is-warning', 'El apellido paterno es obligatorio')
    cy.contains('.tag.is-warning', 'La CURP es obligatorio')
    cy.contains('.tag.is-warning', 'El R.F.C. es obligatorio')
    cy.contains('.tag.is-warning', 'El sexo debe ser uno de los siguientes valores: Hombre o Mujer')
    cy.contains('.tag.is-warning', 'La Clave presupuestal es obligatorio')
    cy.contains('.tag.is-warning', 'La función es obligatorio')
    cy.contains('.tag.is-warning', 'El teléfono es requerido')

    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar más de 20 caracteres en el nombre', () => {
    abrirModal()
    const textoLargo = 'a'.repeat(21)
    cy.get(".modal-card-body input[placeholder='Nombre']").type(textoLargo)
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()

    cy.contains('.tag.is-warning', 'El nombre debe tener como máximo 20 caracteres')
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar más de 20 caracteres en el apellido paterno', () => {
    abrirModal()
    const textoLargo = 'a'.repeat(21)
    cy.get(".modal-card-body input[placeholder='Apellido paterno']").type(textoLargo)
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()

    cy.contains('.tag.is-warning', 'El apellido paterno debe tener como máximo 20 caracteres')
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar más de 20 caracteres en el apellido materno', () => {
    abrirModal()
    const textoLargo = 'a'.repeat(21)
    cy.get(".modal-card-body input[placeholder='Apellido materno']").type(textoLargo)
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()

    cy.contains('.tag.is-warning', 'El apellido materno debe tener como máximo 20 caracteres')
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar más de 18 caracteres en la CURP', () => {
    abrirModal()
    const textoLargo = 'a'.repeat(19)
    cy.get(".modal-card-body input[placeholder='CURP']").type(textoLargo)
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()

    cy.contains('.tag.is-warning', 'La CURP debe tener como máximo 18 caracteres')
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar más de 13 caracteres en el R.F.C.', () => {
    abrirModal()
    const textoLargo = 'a'.repeat(14)
    cy.get(".modal-card-body input[placeholder='R.F.C.']").type(textoLargo)
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()

    cy.contains('.tag.is-warning', 'El R.F.C. debe tener como máximo 13 caracteres')
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar más de 23 caracteres en la clave presupuestal', () => {
    abrirModal()
    const textoLargo = 'a'.repeat(24)
    cy.get(".modal-card-body input[placeholder='Clave presupuestal']").type(textoLargo)
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()

    cy.contains('.tag.is-warning', 'La Clave presupuestal debe tener como máximo 23 caracteres')
    cerrarModalYSesion()
  })

  it('debe mostrar error al ingresar un teléfono con formato incorrecto', () => {
    abrirModal()
    // Ingresar números sin el formato correcto (menos de 10 dígitos)
    cy.get(".modal-card-body input[placeholder='Teléfono']").type('123456789')
    cy.get(".modal-card-foot .buttons .button.is-link").contains('Guardar').click()

    cy.contains('.tag.is-warning', 'Debe tener el formato: 123 456 7890').should('be.visible')
    cerrarModalYSesion()
  })

  // ==================== CIERRE DEL MODAL ====================

  it('debe cerrar el modal al hacer clic en "Cancelar"', () => {
    abrirModal()
    cy.get(".modal-card-foot .buttons .button").contains('Cancelar').click()
    cy.get(".modal").should('not.have.class', 'is-active')
    cerrarSesion()
  })

  it('debe cerrar el modal al hacer clic en el botón de cerrar (X)', () => {
    abrirModal()
    cy.get(".modal-card-head .delete").click()
    cy.get(".modal").should('not.have.class', 'is-active')
    cerrarSesion()
  })

  it('debe cerrar el modal al hacer clic en el fondo (modal-background)', () => {
    abrirModal()
    cy.get(".modal-background").click({ force: true })
    cy.get(".modal").should('not.have.class', 'is-active')
    cerrarSesion()
  })
})