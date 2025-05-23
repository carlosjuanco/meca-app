import InformeMensualActual from './InformeMensualActual.vue'

describe('Componente InformeMensualActual', () => {
  beforeEach(() => {
    // Para realizar bien esta prueba unitaria eliminar toda la informacion de la tabla "churche_concept_month_human"
    cy.visit('http://localhost:8083/')
  })

  it('De la iglesia "Las Flores", por cada concepto debe estar la cantidad 206', () => {
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

    //Cada concepto debe de tener 206 de la iglesia "Las Flores"
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").contains('206')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").contains('206')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })
  it('De la iglesia "Centenario", por cada concepto debe estar la cantidad 140', () => {
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
    cy.get(".table tbody tr:nth-child(1) td:first-child").contains("Centenario")

    //Cada concepto debe de tener 140 de la iglesia "Las Flores"
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(2)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(3)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(4)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(5)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(6)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(7)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(8)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(9)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(10)").contains('140')
    cy.get(".table tbody tr:nth-child(1)").find("td:nth-child(11)").contains('140')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "Familias en Crecimiento" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 6, de la segunda fila el valor 7, para la tercera fila el valor 8 y para la cuarta fila el valor 9', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia3@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia3')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 6
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}6')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}6')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 7
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}7')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 8
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}8')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 9
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}9')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    // cy.get(".js-burger").click()
    // // Cerrar sesión
    // cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "Familias en Crecimiento", por cada concepto debe estar la cantidad 30', () => {
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
    cy.get(".table tbody tr:nth-child(2) td:first-child").contains("Familias en Crecimiento")

    //Cada concepto debe de tener 30 de la iglesia "Las Flores"
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").contains('30')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").contains('30')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('De la fila "Total distrital", debe tener por cada concepto la cantidad de 170', () => {
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

    //Cada concepto debe de tener 170 de la iglesia "Las Flores"
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(2)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(3)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(4)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(5)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(6)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(7)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(8)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(9)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(10)").contains('170')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(11)").contains('170')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })
})