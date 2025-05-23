import InformeMensualActual from './InformeMensualActual.vue'

describe('Componente InformeMensualActual', () => {
  beforeEach(() => {
    // Para realizar bien esta prueba unitaria eliminar toda la informacion de la tabla "churche_concept_month_human"
    cy.visit('http://localhost:8083/')
  })

  it('De la iglesia "Las flores", por cada concepto debe estar la cantidad 140', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "Las flores".
    cy.get(".table tbody tr:nth-child(3) td:first-child").contains("Las Flores")

    //Cada concepto debe de tener 140 de la iglesia "Las Flores"
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").contains('140')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").contains('140')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('De la fila "Total distrital", debe tener por cada concepto la cantidad de 140', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de "Total distrital".
    cy.get(".table tbody tr:nth-child(14) td:first-child").contains("Total distrital")

    //Cada concepto debe de tener 140 de la iglesia "Las Flores"
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(2)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(3)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(4)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(5)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(6)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(7)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(8)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(9)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(10)").contains('140')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(11)").contains('140')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })
})