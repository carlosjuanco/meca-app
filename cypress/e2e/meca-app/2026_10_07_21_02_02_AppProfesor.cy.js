describe('Componente AppProfesor', () => {
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

  // ==================== PRUEBAS DE RENDERIZADO INICIAL ====================

  it('Verificar que el componente AppProfesor se monta correctamente', () => {
    navegarAProfesores()
    cy.get(".title.has-text-centered").contains("Lista de profesores")
    cerrarSesion()
  })

  it('Validar que el título "Lista de profesores" esté visible', () => {
    navegarAProfesores()
    cy.get(".title.has-text-centered").contains("Lista de profesores")
    cerrarSesion()
  })

  it('Comprobar la existencia del botón "Agregar nuevo profesor o profesora"', () => {
    navegarAProfesores()
    cy.get(".button.is-link.is-fullwidth").contains("Agregar nuevo profesor o profesora")
    cerrarSesion()
  })

  it('Asegurar que la tabla de profesores se renderiza', () => {
    navegarAProfesores()
    cy.get(".table").find("thead").should('exist')
    cerrarSesion()
  })

  it('Verificar que los encabezados "Nombre completo", "R.F.C" y "Operaciones" estén presentes', () => {
    navegarAProfesores()
    cy.get(".table").find("thead").should('contain', "Nombre completo")
    cy.get(".table").find("thead").should('contain', "R.F.C")
    cy.get(".table").find("thead").should('contain', "Operaciones")
    cerrarSesion()
  })

  it('Validar que la tabla muestre exactamente 10 registros en el cuerpo', () => {
    navegarAProfesores()
    cy.get(".table tbody tr").should('have.length', 10)
    cerrarSesion()
  })

  it('Comprobar que el componente de paginación esté visible al pie de la tabla', () => {
    navegarAProfesores()
    cy.get(".table tfoot tr").find('nav').find('ul').should('exist')
    cerrarSesion()
  })

  // ==================== PRUEBAS DEL MODAL "Nuevo profesor" ====================

  const abrirModal = () => {
    navegarAProfesores()
    cy.get(".button.is-link.is-fullwidth").contains("Agregar nuevo profesor o profesora").click()
    cy.get(".modal").should('have.class', 'is-active')
  }

  const cerrarModalYSesion = () => {
    cy.get(".modal .modal-background").click({ force: true })
    cerrarSesion()
  }

  // --- Apertura del modal ---
  it('debe abrir el modal al hacer clic en "Agregar nuevo profesor o profesora"', () => {
    abrirModal()
    cy.get(".modal-card-title").should('contain', 'Nuevo profesor')
    cerrarModalYSesion()
  })

  // --- Renderizado del formulario dentro del modal ---
  it('debe mostrar la etiqueta "Nombre" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Nombre')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar el nombre del profesor', () => {
    abrirModal()
    cy.get(".modal-card-body input[placeholder='Nombre']").should('exist')
    cy.get(".modal-card-body input[placeholder='Nombre']").should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Apellido paterno" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Apellido paterno')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar el apellido paterno', () => {
    abrirModal()
    cy.get(".modal-card-body input[placeholder='Apellido paterno']").should('exist')
    cy.get(".modal-card-body input[placeholder='Apellido paterno']").should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Apellido materno" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Apellido materno')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar el apellido materno', () => {
    abrirModal()
    cy.get(".modal-card-body input[placeholder='Apellido materno']").should('exist')
    cy.get(".modal-card-body input[placeholder='Apellido materno']").should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "CURP" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'CURP')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar la CURP', () => {
    abrirModal()
    cy.get(".modal-card-body input[placeholder='CURP']").should('exist')
    cy.get(".modal-card-body input[placeholder='CURP']").should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "R.F.C." dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'R.F.C.')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar el R.F.C.', () => {
    abrirModal()
    cy.get(".modal-card-body input[placeholder='R.F.C.']").should('exist')
    cy.get(".modal-card-body input[placeholder='R.F.C.']").should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Sexo" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Sexo')
    cerrarModalYSesion()
  })

  it('debe mostrar la lista desplegable (select) para seleccionar el sexo', () => {
    abrirModal()
    // El primer select es el de Sexo
    cy.get(".modal-card-body select").first().should('exist')
    // Verificar que tiene las opciones correctas
    cy.get(".modal-card-body select").first().find('option').should('have.length', 3)
    cy.get(".modal-card-body select").first().find('option').first().should('contain', 'Seleccione un sexo')
    cy.get(".modal-card-body select").first().find('option').eq(1).should('have.value', 'Hombre')
    cy.get(".modal-card-body select").first().find('option').eq(2).should('have.value', 'Mujer')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Clave presupuestal" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Clave presupuestal')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar la clave presupuestal', () => {
    abrirModal()
    cy.get(".modal-card-body input[placeholder='Clave presupuestal']").should('exist')
    cy.get(".modal-card-body input[placeholder='Clave presupuestal']").should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Función" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Función')
    cerrarModalYSesion()
  })

  it('debe mostrar la lista desplegable (select) para seleccionar una función', () => {
    abrirModal()
    // El segundo select es el de Función
    cy.get(".modal-card-body select").eq(1).should('exist')
    // Verificar que tiene las opciones correctas
    cy.get(".modal-card-body select").eq(1).find('option').should('have.length', 5)
    cy.get(".modal-card-body select").eq(1).find('option').first().should('contain', 'Selecciona una función')
    cy.get(".modal-card-body select").eq(1).find('option').eq(1).should('have.value', 'Docente')
    cy.get(".modal-card-body select").eq(1).find('option').eq(2).should('have.value', 'Administrativo')
    cy.get(".modal-card-body select").eq(1).find('option').eq(3).should('have.value', 'Docente con grupo')
    cy.get(".modal-card-body select").eq(1).find('option').eq(4).should('have.value', 'Director')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Escuela" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Escuela')
    cerrarModalYSesion()
  })

  it('debe mostrar la lista desplegable (select) para seleccionar una escuela', () => {
    abrirModal()
    // El tercer select es el de Escuela
    cy.get(".modal-card-body select").eq(2).should('exist')
    // Verificar que tiene la opción por defecto
    cy.get(".modal-card-body select").eq(2).find('option').first().should('contain', 'Selecciona una escuela')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Teléfono" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Teléfono')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar el teléfono', () => {
    abrirModal()
    cy.get(".modal-card-body input[placeholder='Teléfono']").should('exist')
    cy.get(".modal-card-body input[placeholder='Teléfono']").should('have.value', '')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Motivo" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Motivo')
    cerrarModalYSesion()
  })

  it('debe mostrar el input para capturar el motivo', () => {
    abrirModal()
    cy.get(".modal-card-body input[type='number']").should('exist')
    cy.get(".modal-card-body input[type='number']").should('have.attr', 'placeholder', 'Motivo')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Fecha de ingreso a la SEP" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Fecha de ingreso a la SEP')
    cerrarModalYSesion()
  })

  it('debe mostrar el input de tipo date para la fecha de ingreso a la SEP', () => {
    abrirModal()
    cy.get(".modal-card-body input[type='date']").should('exist')
    cy.get(".modal-card-body input[type='date']").should('have.attr', 'placeholder', 'Fecha de ingreso a la SEP')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Perfil de estudios" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Perfil de estudios')
    cerrarModalYSesion()
  })

  it('debe mostrar la lista desplegable (select) para seleccionar un perfil de estudios', () => {
    abrirModal()
    // El cuarto select es el de Perfil de estudios
    cy.get(".modal-card-body select").eq(3).should('exist')
    // Verificar que tiene la opción por defecto
    cy.get(".modal-card-body select").eq(3).find('option').first().should('contain', 'Seleccione un perfil de estudios')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Lengua" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Lengua')
    cerrarModalYSesion()
  })

  it('debe mostrar la lista desplegable (select) para seleccionar una lengua', () => {
    abrirModal()
    // El quinto select es el de Lengua
    cy.get(".modal-card-body select").eq(4).should('exist')
    // Verificar que tiene la opción por defecto
    cy.get(".modal-card-body select").eq(4).find('option').first().should('contain', 'Selecciona una lengua')
    cerrarModalYSesion()
  })

  it('debe mostrar la etiqueta "Variante de lengua" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-body .field .label").should('contain', 'Variante de lengua')
    cerrarModalYSesion()
  })

  it('debe mostrar la lista desplegable (select) para seleccionar una variante de lengua', () => {
    abrirModal()
    // El sexto select es el de Variante de lengua
    cy.get(".modal-card-body select").eq(5).should('exist')
    // Verificar que tiene la opción por defecto
    cy.get(".modal-card-body select").eq(5).find('option').first().should('contain', 'Selecciona una variante')
    cerrarModalYSesion()
  })

  // --- Acciones del modal ---
  it('debe mostrar el botón "Guardar" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-foot .buttons .button.is-link").should('contain', 'Guardar')
    cy.get(".modal-card-foot .buttons .button.is-link").should('not.be.disabled')
    cerrarModalYSesion()
  })

  it('debe mostrar el botón "Cancelar" dentro del modal', () => {
    abrirModal()
    cy.get(".modal-card-foot .buttons .button").contains('Cancelar').should('exist')
    cerrarModalYSesion()
  })
})