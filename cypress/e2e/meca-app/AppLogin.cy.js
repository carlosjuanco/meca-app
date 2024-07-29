describe('Componente AppLogin', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/')
    })

    it('¿Esta corriendo el sistema?', () => {
        cy.contains("p", "Acceso al sistema")
    })

    it('Correo y contraseña son obligatorios', () => {
        cy.get('form').contains('Ingresar').click()

        cy.get('.is-warning:first').contains("El campo correo es obligatorio.")
        cy.get('.is-warning:last').contains("El campo contraseña es obligatorio.")
    })

    it('El correo electrónico debe ser un correo electrónico válido', () => {
        cy.get('form').get("input[type='email']").type('juancho')
            .blur()

        cy.get('.is-warning').contains("El correo electrónico debe ser un correo electrónico válido")
    })

    it('El correo electrónico es válido', () => {
        cy.get('form').get("input[type='email']").type('carlosjuancho328@gmail.com')
            .blur().not(".is-warning")
    })

    it('La contraseña debe tener al menos 6 caracteres', () => {
        cy.get('form').get("input[type='password']").type('contr')
            .blur()

        cy.get('.is-warning').contains("La contraseña debe tener al menos 6 caracteres")
    })

    it('La contraseña tiene al menos 6 caracteres', () => {
        cy.get('form').get("input[type='password']").type('password')
            .blur().not(".is-warning")
    })

    // it('Error de red', () => {
    //     cy.get('form').get("input[type='email']").type('carlosjuancho328@gmail.com')
    //     cy.get('form').get("input[type='password']").type('password')

    //     cy.get('form').contains('Ingresar').click()

    //     cy.contains("h4", "Network Error")
    // })

    it('Mostrar vista de los creadores del sistema', () => {
        cy.get('form').get("input[type='email']").type('carlosjuancho328@gmail.com')
        cy.get('form').get("input[type='password']").type('password')

        cy.get('form').contains('Ingresar').click()

        cy.contains("a", "Inicio")
        // Hacer clic para que aparezca el botón cerrar sesión
        cy.get(".js-burger").click()
        // Cerrar sesión
        cy.get(".button").click()
    })
})