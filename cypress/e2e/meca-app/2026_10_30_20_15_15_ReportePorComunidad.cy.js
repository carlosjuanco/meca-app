describe('Componente ReportePorComunidad', () => {
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
  const navegarAReportePorComunidad = () => {
    // Ingresar con las credenciales del rol "Administrativo"
    cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
    cy.get('form').get("input[type='password']").type('administrativo')
    cy.get('form').contains('Ingresar').click()

    // Verificar que ya exista el menú inicio
    cy.get('a').contains("Inicio")

    // Hacer clic para que se despliegue el menú
    cy.get(".js-burger").click()
    // Clic en el menú "Reporte por comunidad"
    cy.get("a").contains("Reporte por comunidad").click()
    // Desaparecer menú
    cy.get(".js-burger").click()
  }

  const cerrarSesion = () => {
    cy.get(".js-burger").click()
    cy.get(".button").contains("Cerrar").click()
  }

  // Función auxiliar para abrir el modal de detalles de una comunidad
  const abrirModalDetallesComunidad = (nombreComunidad) => {
    navegarAReportePorComunidad()
    cy.contains('.data-reporte-por-comunidad-table tbody tr', nombreComunidad).find('button.is-info').click()
    cy.get('.modal.is-active').should('exist')
  }

  // Función auxiliar para cerrar el modal activo con el botón "X"
  const cerrarModalActivo = () => {
    cy.get('.modal.is-active .data-community-details-delete').click()
    cy.get('.modal.is-active').should('not.exist')
  }

  // Función auxiliar para cerrar el modal activo haciendo clic en el fondo
  const cerrarModalActivoPorFondo = () => {
    // { force: true } va dentro del click porque no es un botón
    cy.get('.modal.is-active .data-community-details-modal-background').click({ force: true })
    cy.get('.modal.is-active').should('not.exist')
  }

  // ==================== PRUEBAS DE RENDERIZADO INICIAL ====================

  it('Verificar que el componente ReportePorComunidad se monta correctamente', () => {
    navegarAReportePorComunidad()
    cy.get(".title.has-text-centered").contains("Reporte por comunidad")
    cerrarSesion()
  })

  it('Validar que el título "Reporte por comunidad" esté visible', () => {
    navegarAReportePorComunidad()
    cy.get(".title.has-text-centered").contains("Reporte por comunidad").should('be.visible')
    cerrarSesion()
  })

  it('Asegurar que la tabla se renderiza', () => {
    navegarAReportePorComunidad()
    cy.get(".table").find("thead").should('exist')
    cerrarSesion()
  })

  it('Verificar que los encabezados "Comunidades", "Primaria 20DPB", "Directivos", "N/P", "Preescolar 20DCC", "Directivos", "N/P", "Educación inicial", "Directivos", "Albergues escolares", "Jefes" y "Detalles" estén presentes', () => {
    navegarAReportePorComunidad()
    const encabezados = [
      "Comunidades", "Primaria 20DPB", "Directivos", "N/P",
      "Preescolar 20DCC", "Directivos", "N/P",
      "Educación inicial", "Directivos",
      "Albergues escolares", "Jefes", "Detalles"
    ]
    encabezados.forEach(encabezado => {
      cy.get(".table thead").should('contain', encabezado)
    })
    cerrarSesion()
  })

  it('Validar que la tabla muestra verticalmente las 12 comunidades en el cuerpo', () => {
    navegarAReportePorComunidad()
    cy.get(".data-reporte-por-comunidad-table tbody tr").should('have.length', 12)
    cerrarSesion()
  })

  // ==================== MODAL "DETALLES DE LA COMUNIDAD" ====================

  it('debe abrir el modal al hacer clic en el botón de ojo de la comunidad "Rio Cacho"', () => {
    abrirModalDetallesComunidad('Rio Cacho')
    // Verificar que el modal contiene el nombre de la comunidad o algún dato representativo
    cy.get('.modal.is-active .modal-card-head').should('contain', 'Rio Cacho')
    cerrarModalActivo()
    cerrarSesion()
  })

  it('debe mostrar los datos correctos para la comunidad "Rio Cacho" en el modal', () => {
    abrirModalDetallesComunidad('Rio Cacho')
    // Usar within, aquí dentro, cy.get busca SOLO dentro de .modal.is-active
    cy.get('.modal.is-active').within(() => {
      // Fila 1, Columna 1 - Primaria
      cy.contains('Primaria')
      cy.contains('Nombre:')
      cy.contains('Union y Progreso')
      cy.contains('Clave:')
      cy.contains('20DPB2426A')
      // Fila 2, Columna 1 - Directivos
      cy.contains('Directivos')
      cy.contains('Nombre:')
      cy.contains('Lenin J. Mejia Santiago')
      cy.contains('Teléfono:')
      cy.contains('951 255 1042')
      // Fila 1, Columna 2 - Preescolar
      cy.contains('Preescolar')
      cy.contains('Nombre:')
      cy.contains('20 de Noviembre')
      cy.contains('Clave:')
      cy.contains('20DCC2499O')
      // Fila 2, Columna 2 - Directivos
      cy.contains('Directivos')
      cy.contains('Nombre:')
      cy.contains('Ana Ramirez Pacheco')
      cy.contains('Teléfono:')
      cy.contains('951 321 1179')
    })
    cerrarModalActivo()
    cerrarSesion()
  })

  it('debe mostrar los datos correctos para la comunidad "San Pedro Cholula" en el modal', () => {
    abrirModalDetallesComunidad('San Pedro Cholula')
    // Usar within, aquí dentro, cy.get busca SOLO dentro de .modal.is-active
    cy.get('.modal.is-active').within(() => {
      // Educación inicial en Fila 1, Columna 2
      cy.contains('Educación inicial')
      cy.contains('Nombre:')
      cy.contains('Educación Inicial')
      cy.contains('Clave:')
      cy.contains('20DIN0156F')
      // Directivos Fila 2, Columna 2
      cy.contains('Directivos')
      cy.contains('Nombre:')
      cy.contains('Janeth Martinez Luis')
      cy.contains('Teléfono:')
      cy.contains('951 693 5437')
    })
    cerrarModalActivo()
    cerrarSesion()
  })

  it('debe mostrar los datos correctos para la comunidad "San Juan Monte Flor" en el modal', () => {
    abrirModalDetallesComunidad('San Juan Monte Flor')
    // Usar within, aquí dentro, cy.get busca SOLO dentro de .modal.is-active
    cy.get('.modal.is-active').within(() => {
      // Albergues escolares Fila 1, Columna 3
      cy.contains('Albergues escolares')
      cy.contains('Nombre:')
      cy.contains('Redención')
      cy.contains('Clave:')
      cy.contains('20TA10124A')
      // Directivos Fila 2, Columna 3
      cy.contains('Directivos')
      cy.contains('Nombre:')
      cy.contains('Casto Ines Sanchez')
      cy.contains('Teléfono:')
      cy.contains('951 360 7369')
    })
    cerrarModalActivo()
    cerrarSesion()
  })

  it('debe cerrar el modal con el botón "X"', () => {
    abrirModalDetallesComunidad('Rio Cacho')
    cerrarModalActivo()
    cerrarSesion()
  })

  it('debe cerrar el modal haciendo clic en el fondo', () => {
    abrirModalDetallesComunidad('Rio Cacho')
    cerrarModalActivoPorFondo()
    cerrarSesion()
  })
})