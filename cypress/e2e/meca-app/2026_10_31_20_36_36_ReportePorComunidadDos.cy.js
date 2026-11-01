describe('Componente ReportePorComunidad - Modal Información del Profesor', () => {
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
    cy.get('form').get("input[type='email']").type('administrativo@gmail.com')
    cy.get('form').get("input[type='password']").type('administrativo')
    cy.get('form').contains('Ingresar').click()
    cy.get('a').contains("Inicio")
    cy.get(".js-burger").click()
    cy.get("a").contains("Reporte por comunidad").click()
    cy.get(".js-burger").click()
  }

  const cerrarSesion = () => {
    cy.get(".js-burger").click()
    cy.get(".button").contains("Cerrar").click()
  }

  // Abrir el modal de detalles de una comunidad
  const abrirModalDetallesComunidad = (nombreComunidad) => {
    navegarAReportePorComunidad()
    cy.contains('.data-reporte-por-comunidad-table tbody tr', nombreComunidad).find('button.is-info').click()
    cy.get('.modal.is-active').should('exist')
  }

  // Abrir el modal de información del profesor desde el modal de detalles
  const abrirModalInformacionProfesor = (nombreComunidad) => {
    abrirModalDetallesComunidad(nombreComunidad)
    // Hacer clic en el primer botón de ojo dentro del modal (Directivos Primaria)
    cy.get('.modal.is-active .button.is-info').first().click()
    // Verificar que el modal de información del profesor está activo
    cy.get('.ver-informacion-profesor').parents('.modal').should('have.class', 'is-active')
  }

  // Cerrar el modal de información del profesor con el botón "X"
  const cerrarModalInformacionProfesor = () => {
    cy.get('.ver-informacion-profesor .data-profesor-informacion-delete').click()
    cy.get('.ver-informacion-profesor').parents('.data-profesor-informacion-modal').should('not.have.class', 'is-active')
  }

  // Cerrar el modal de información del profesor haciendo clic en el fondo
  const cerrarModalInformacionProfesorPorFondo = () => {
    // { force: true } va dentro del click porque no es un botón
    cy.get('.data-profesor-informacion-modal .data-profesor-informacion-modal-background').click({ force: true })
    cy.get('.data-profesor-informacion-modal').should('not.have.class', 'is-active')
  }

  // Cerrar el modal de detalles de la comunidad (el que queda activo)
  const cerrarModalDetallesComunidad = () => {
    cy.get('.modal.is-active .data-community-details-delete').click()
    cy.get('.modal.is-active').should('not.exist')
  }

  // ==================== PRUEBAS DEL MODAL "INFORMACIÓN DEL PROFESOR" ====================

  it('debe abrir el modal de información del profesor desde la comunidad "San Pedro Cholula"', () => {
    abrirModalInformacionProfesor('San Pedro Cholula')
    cy.get('.ver-informacion-profesor .modal-card-title').should('contain', 'Información del profesor')
    cerrarModalInformacionProfesor()
    cerrarModalDetallesComunidad()
    cerrarSesion()
  })

  it('debe mostrar la información correcta del profesor en el modal', () => {
    abrirModalInformacionProfesor('San Pedro Cholula')
    // Usar within, aquí dentro, cy.get busca SOLO dentro de ver-informacion-profesor
    cy.get('.ver-informacion-profesor').within(() => {
      // Nombre completo
      cy.contains('.label', 'Nombre completo').siblings('.input').should('contain', 'Heriberto Salinas Lopez')
      // CURP
      cy.contains('.label', 'CURP').siblings('.input').should('contain', 'SARA900303HMCRNN03')
      // R.F.C.
      cy.contains('.label', 'R.F.C.').siblings('.input').should('contain', 'SARA900303HCR')
      // Sexo
      cy.contains('.label', 'Sexo').siblings('.input').should('contain', 'Hombre')
      // Clave presupuestal
      cy.contains('.label', 'Clave presupuestal').siblings('.input').should('contain', 'BUD-2024-001-001-003-01')
      // Función
      cy.contains('.label', 'Función').siblings('.input').should('contain', 'Director')
      // Escuela
      cy.contains('.label', 'Escuela').siblings('.input').should('contain', 'Francisco I. Madero')
      // Teléfono
      cy.contains('.label', 'Teléfono').siblings('.input').should('contain', '951 345 6789')
      // Motivo
      cy.contains('.label', 'Motivo').siblings('.input').should('contain', '2')
      // Fecha de ingreso a la SEP
      cy.contains('.label', 'Fecha de ingreso a la SEP').siblings('.input').should('contain', '05/04/1970')
      // Perfil de estudios (solo presencia)
      cy.contains('.label', 'Perfil de estudios')
      // Lengua
      cy.contains('.label', 'Lengua').siblings('.input').should('contain', 'Costa')
      // Variante de lengua (solo presencia)
      cy.contains('.label', 'Variante de lengua')
    })
    cerrarModalInformacionProfesor()
    cerrarModalDetallesComunidad()
    cerrarSesion()
  })

  it('debe cerrar el modal de información del profesor con el botón "X"', () => {
    abrirModalInformacionProfesor('San Pedro Cholula')
    cerrarModalInformacionProfesor()
    cerrarModalDetallesComunidad()
    cerrarSesion()
  })

  it('debe cerrar el modal de información del profesor haciendo clic en el fondo', () => {
    abrirModalInformacionProfesor('San Pedro Cholula')
    cerrarModalInformacionProfesorPorFondo()
    cerrarModalDetallesComunidad()
    cerrarSesion()
  })
})