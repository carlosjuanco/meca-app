import InformeMensualActual from './InformeMensualActual.vue'

describe('Componente InformeMensualActual', () => {
  beforeEach(() => {
    // Para realizar bien esta prueba unitaria eliminar toda la informacion de la tabla "churche_concept_month_human"
    cy.visit('http://localhost:8084/')
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

    // Buscar la fila de la iglesia "Centenario".
    cy.get(".table tbody tr:nth-child(1) td:first-child").contains("Centenario")

    //Cada concepto debe de tener 140 de la iglesia "Centenario"
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

    // Buscar la fila de la iglesia "Familias en Crecimiento".
    cy.get(".table tbody tr:nth-child(2) td:first-child").contains("Familias en Crecimiento")

    //Cada concepto debe de tener 30 de la iglesia "Familias en Crecimiento"
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

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "Volcanes" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 20, de la segunda fila el valor 21, para la tercera fila el valor 22 y para la cuarta fila el valor 23', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia4@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia4')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 20
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}20')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}20')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 21
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}21')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}21')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 22
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}22')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 23
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}23')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}23')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "Volcanes", por cada concepto debe estar la cantidad 86', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "Volcanes".
    cy.get(".table tbody tr:nth-child(4) td:first-child").contains("Volcanes")

    //Cada concepto debe de tener 86 de la iglesia "Volcanes"
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").contains('86')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").contains('86')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "Donaji" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 30, de la segunda fila el valor 31, para la tercera fila el valor 32 y para la cuarta fila el valor 33', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia5@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia5')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 30
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}30')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}30')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 31
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}31')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}31')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 32
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}32')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}32')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 33
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}33')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "Donaji", por cada concepto debe estar la cantidad 126', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "Donaji".
    cy.get(".table tbody tr:nth-child(5) td:first-child").contains("Donaji")

    //Cada concepto debe de tener 126 de la iglesia "Donaji"
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(2)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(3)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(4)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(5)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(6)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(7)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(8)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(9)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(10)").contains('126')
    cy.get(".table tbody tr:nth-child(5)").find("td:nth-child(11)").contains('126')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "Jardín" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 15, de la segunda fila el valor 3, para la tercera fila el valor 2 y para la cuarta fila el valor 3', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia6@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia6')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 15
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}15')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}15')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 3
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}3')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 2
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}2')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}2')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 3
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}3')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}3')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "Jardín", por cada concepto debe estar la cantidad 23', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "Jardín".
    cy.get(".table tbody tr:nth-child(6) td:first-child").contains("Jardín")

    //Cada concepto debe de tener 23 de la iglesia "Jardín"
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(2)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(3)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(4)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(5)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(6)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(7)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(8)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(9)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(10)").contains('23')
    cy.get(".table tbody tr:nth-child(6)").find("td:nth-child(11)").contains('23')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "7 Regiones" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 9, de la segunda fila el valor 8, para la tercera fila el valor 4 y para la cuarta fila el valor 39', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia7@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia7')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 9
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}9')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}9')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 8
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}8')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}8')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 4
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}4')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}4')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 39
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}39')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}39')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "7 Regiones", por cada concepto debe estar la cantidad 60', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "7 Regiones".
    cy.get(".table tbody tr:nth-child(7) td:first-child").contains("7 Regiones")

    //Cada concepto debe de tener 60 de la iglesia "7 Regiones"
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(2)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(3)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(4)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(5)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(6)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(7)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(8)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(9)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(10)").contains('60')
    cy.get(".table tbody tr:nth-child(7)").find("td:nth-child(11)").contains('60')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "San Luis Beltran" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 50, de la segunda fila el valor 98, para la tercera fila el valor 33 y para la cuarta fila el valor 78', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia8@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia8')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 50
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}50')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}50')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 98
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}98')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}98')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 33
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}33')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 78
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}78')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}78')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "San Luis Beltran", por cada concepto debe estar la cantidad 259', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "San Luis Beltran".
    cy.get(".table tbody tr:nth-child(8) td:first-child").contains("San Luis Beltran")

    //Cada concepto debe de tener 259 de la iglesia "San Luis Beltran"
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(2)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(3)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(4)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(5)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(6)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(7)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(8)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(9)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(10)").contains('259')
    cy.get(".table tbody tr:nth-child(8)").find("td:nth-child(11)").contains('259')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "Zogocho" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 66, de la segunda fila el valor 99, para la tercera fila el valor 55 y para la cuarta fila el valor 7', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia9@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia9')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 66
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}66')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}66')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 99
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}99')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}99')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 55
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}55')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}55')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 7
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}7')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}7')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "Zogocho", por cada concepto debe estar la cantidad 227', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "Zogocho".
    cy.get(".table tbody tr:nth-child(9) td:first-child").contains("Zogocho")

    //Cada concepto debe de tener 227 de la iglesia "Zogocho"
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(2)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(3)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(4)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(5)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(6)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(7)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(8)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(9)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(10)").contains('227')
    cy.get(".table tbody tr:nth-child(9)").find("td:nth-child(11)").contains('227')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "Huayapam" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 33, de la segunda fila el valor 88, para la tercera fila el valor 77 y para la cuarta fila el valor 33', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia10@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia10')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 33
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}33')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 88
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}88')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 77
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}77')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 33
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}33')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "Huayapam", por cada concepto debe estar la cantidad 231', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "Huayapam".
    cy.get(".table tbody tr:nth-child(10) td:first-child").contains("Huayapam")

    //Cada concepto debe de tener 231 de la iglesia "Huayapam"
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(2)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(3)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(4)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(5)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(6)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(7)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(8)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(9)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(10)").contains('231')
    cy.get(".table tbody tr:nth-child(10)").find("td:nth-child(11)").contains('231')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "Yatareni" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 33, de la segunda fila el valor 88, para la tercera fila el valor 77 y para la cuarta fila el valor 33', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia11@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia11')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 33
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}33')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 88
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}88')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}88')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 77
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}77')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}77')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 33
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}33')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}33')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "Yatareni", por cada concepto debe estar la cantidad 231', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "Yatareni".
    cy.get(".table tbody tr:nth-child(11) td:first-child").contains("Yatareni")

    //Cada concepto debe de tener 231 de la iglesia "Yatareni"
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(2)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(3)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(4)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(5)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(6)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(7)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(8)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(9)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(10)").contains('231')
    cy.get(".table tbody tr:nth-child(11)").find("td:nth-child(11)").contains('231')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('Ingresar con la "Secretaria de iglesia" que pertenece a la iglesia "Tres Cruces" e ingresar datos, para todos los conceptos con el mismo valor, la primera fila el valor 71, de la segunda fila el valor 22, para la tercera fila el valor 25 y para la cuarta fila el valor 29', () => {
    cy.get('form').get("input[type='email']") .type('secretariadeiglesia12@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariaiglesia12')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Capturar informe actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Ingresar por cada concepto el valor 71
    cy.get(".table tbody tr:first-child").find("td:nth-child(2)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(3)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(4)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(5)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(6)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(7)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(8)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(9)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(10)").find("input[type='number']").type('{backspace}71')
    cy.get(".table tbody tr:first-child").find("td:nth-child(11)").find("input[type='number']").type('{backspace}71')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(2)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 22
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}22')
    cy.get(".table tbody tr:nth-child(2)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}22')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(3)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 25
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}25')
    cy.get(".table tbody tr:nth-child(3)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}25')

    // Buscar botón "Nueva semana" y hacer clic
    // Este boton no tiene un identificador único por ese motivo, lo busco entre varios
    cy.get(".table tbody tr:nth-child(4)").contains("Nueva semana").click()

    // Ingresar por cada concepto el valor 29
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(2)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(3)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(4)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(5)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(6)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(7)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(8)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(9)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(10)").find("input[type='number']").type('{backspace}29')
    cy.get(".table tbody tr:nth-child(4)").find("td:nth-child(11)").find("input[type='number']").type('{backspace}29')

    // Clic en guardar
    cy.get(".button.is-success").click()
    // Clic en el modal interno
    cy.get(".fas.fa-circle-check.fas.fa-10x").click()

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").contains("Cerrar").click()
  })

  it('De la iglesia "Tres Cruces", por cada concepto debe estar la cantidad 147', () => {
    cy.get('form').get("input[type='email']").type('secretariadedistrito@gmail.com')
    cy.get('form').get("input[type='password']").type('secretariadistrito')

    cy.get('form').contains('Ingresar').click()

    cy.contains("a", "Inicio")
    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    cy.get("a").contains("Informe mensual actual").click()
    // Desaparecer menú
    cy.get(".js-burger").click()

    // Buscar la fila de la iglesia "Tres Cruces".
    cy.get(".table tbody tr:nth-child(12) td:first-child").contains("Tres Cruces")

    //Cada concepto debe de tener 147 de la iglesia "Tres Cruces"
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(2)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(3)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(4)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(5)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(6)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(7)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(8)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(9)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(10)").contains('147')
    cy.get(".table tbody tr:nth-child(12)").find("td:nth-child(11)").contains('147')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })

  it('De la fila "Total distrital", debe tener por cada concepto la cantidad de 1766', () => {
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

    //Cada concepto debe de tener 1766 de la iglesia "Total distrital"
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(2)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(3)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(4)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(5)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(6)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(7)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(8)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(9)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(10)").contains('1766')
    cy.get(".table tbody tr:nth-child(14)").find("td:nth-child(11)").contains('1766')

    // Clic, para que aparezca el menú
    cy.get(".js-burger").click()
    // Cerrar sesión
    cy.get(".button").click()
  })
})