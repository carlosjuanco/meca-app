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

  // ==================== PRUEBAS DE RENDERIZADO INICIAL ====================

  it('Verificar que el componente AppEscuela se monta correctamente', () => {
    navegarAEscuelas()
    // Existe el título "Lista de escuelas"
    cy.get(".title.has-text-centered").contains("Lista de escuelas")
    cerrarSesion()
  })

  it('Validar que el título "Lista de escuelas" esté visible', () => {
    navegarAEscuelas()
    cy.get(".title.has-text-centered").contains("Lista de escuelas")
    cerrarSesion()
  })

  it('Comprobar la existencia del botón "Agregar nueva escuela"', () => {
    navegarAEscuelas()
    cy.get(".button.is-link.is-fullwidth").contains("Agregar nueva escuela")
    cerrarSesion()
  })

  it('Asegurar que la tabla de escuelas se renderiza', () => {
    navegarAEscuelas()
    cy.get(".table").find("thead").should('exist')
    cerrarSesion()
  })

  it('Verificar que los encabezados de la tabla estén presentes', () => {
    navegarAEscuelas()
    cy.get(".table").find("thead").should('contain', "Nombre de la escuela")
    cy.get(".table").find("thead").should('contain', "Clave")
    cy.get(".table").find("thead").should('contain', "Tipo escuela")
    cy.get(".table").find("thead").should('contain', "Localidad")
    cy.get(".table").find("thead").should('contain', "N/P")
    cy.get(".table").find("thead").should('contain', "Operaciones")
    cerrarSesion()
  })

  it('Validar que la tabla muestre exactamente 10 registros en el cuerpo', () => {
    navegarAEscuelas()
    cy.get(".table tbody tr").should('have.length', 10)
    cerrarSesion()
  })

  it('Comprobar que el componente de paginación esté visible al pie de la tabla', () => {
    navegarAEscuelas()
    cy.get(".table tfoot tr").find('nav').find('ul').should('exist')
    cerrarSesion()
  })

  // ==================== PRUEBAS DEL MODAL "Nueva escuela" ====================
  
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

  // --- Apertura del modal ---
  it('debe abrir el modal al hacer clic en "Agregar nueva escuela"', () => {        
    abrirModal()
    // Verificar que el título del modal sea "Nueva escuela"
    cy.get(".modal-card-title").should('contain', 'Nueva escuela')
    cerrarModalYSesion()
  })

  // --- Renderizado del formulario dentro del modal ---
  it('debe mostrar la etiqueta "Escuela" dentro del modal', () => {        
    abrirModal()
    // Verificar que la etiqueta "Escuela" existe
    cy.get(".modal-card-body .field .label").should('contain', 'Escuela')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar el nombre de la escuela', () => {
    abrirModal()
    // Verificar que el input existe
    cy.get(".modal-card-body input[type='text']").first().should('exist')
    // Verificar que el placeholder es "Nombre escuela"
    cy.get(".modal-card-body input[type='text']").first().should('have.attr', 'placeholder', 'Nombre escuela')
    // Verificar que está vacío inicialmente
    cy.get(".modal-card-body input[type='text']").first().should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Clave" dentro del modal', () => {        
    abrirModal()
    // Verificar que la etiqueta "Clave" existe
    cy.get(".modal-card-body .field .label").should('contain', 'Clave')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar la clave', () => {
    abrirModal()
    // Seleccionamos el segundo input de tipo texto (clave)
    cy.get(".modal-card-body input[type='text']").eq(1).should('exist')
    // Verificar que el placeholder es "Clave"
    cy.get(".modal-card-body input[type='text']").eq(1).should('have.attr', 'placeholder', 'Clave')
    // Verificar que está vacío inicialmente
    cy.get(".modal-card-body input[type='text']").eq(1).should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Tipo de escuela" dentro del modal', () => {        
    abrirModal()
    // Verificar que la etiqueta "Tipo de escuela" existe
    cy.get(".modal-card-body .field .label").should('contain', 'Tipo de escuela')
    cerrarModalYSesion()
  })

  it('debe mostrar el select para seleccionar un tipo de escuela', () => {
    abrirModal()
    // Verificar que el select existe (primer select)
    cy.get(".modal-card-body select").first().should('exist')
    // Verificar que tiene las opciones correctas
    cy.get(".modal-card-body select").first().find('option').should('have.length', 4)
    cy.get(".modal-card-body select").first().find('option').eq(0).should('have.value', 'Primaria')
    cy.get(".modal-card-body select").first().find('option').eq(1).should('have.value', 'Preescolar')
    cy.get(".modal-card-body select").first().find('option').eq(2).should('have.value', 'Inicial')
    cy.get(".modal-card-body select").first().find('option').eq(3).should('have.value', 'Albergues escolares')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Comunidad" dentro del modal', () => {        
    abrirModal()
    // Verificar que la etiqueta "Comunidad" existe
    cy.get(".modal-card-body .field .label").should('contain', 'Comunidad')
    cerrarModalYSesion()
  })

  it('debe mostrar el select para seleccionar una comunidad', () => {
    abrirModal()
    // Verificar que el select existe (segundo select)
    cy.get(".modal-card-body select").eq(1).should('exist')
    // Verificar que tiene la opción por defecto
    cy.get(".modal-card-body select").eq(1).find('option').first().should('contain', 'Selecciona una comunidad')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Número progresivo" dentro del modal', () => {        
    abrirModal()
    // Verificar que la etiqueta "Número progresivo" existe
    cy.get(".modal-card-body .field .label").should('contain', 'Número progresivo')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar el número progresivo', () => {
    abrirModal()
    // Verificar que el input de tipo number existe
    cy.get(".modal-card-body input[type='number']").should('exist')
    // Verificar que el placeholder es "Número progresivo"
    cy.get(".modal-card-body input[type='number']").should('have.attr', 'placeholder', 'Número progresivo')
    cerrarModalYSesion()
  })

  // --- Acciones del modal ---
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
})