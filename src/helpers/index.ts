import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const helpers = () => {
    const store = useStore()
    const router = useRouter()

    const handleErrors = (error: any) => {
        const errors:{ [key: string]: any } = {}
        if (error.response) {
            if (error.response.data.errors) {
                Object.entries(error.response.data.errors).forEach(([key, value]) => {
                    const valor = value as string[]
                    errors[key] = valor[0]
                })
            }
            else {
                errors['message'] = error.response.data.message
            }
        }
        else {
           errors['message'] = error.message
        }

        return errors
    }

    const logout = async () => {
        try {
            await store.dispatch('logout')

            router.replace({ name: 'login' })
        }
        catch (error) {
            // handleErrors(error)
        }
    }

    const getInformationUser = () => {
        return store.getters.user
    }

    interface Fields {
        [key: string]: any // o un tipo más específico si sabes qué tipo de datos esperar
    }

    interface Data {
        [key: string]: any // o un tipo más específico si sabes qué tipo de datos esperar
    }

    interface Form {
        errors: { [key: string]: string }
        data: { [key: string]: any }
    }

    const setForm = (fields: Fields, data: Data) => {
        const form: Form = {
            errors: {},
            data: {}
        }

        Object.keys(fields).map(k => {
            if (k != '_method') {
                form.data[k] = data[k] ? data[k] : ''
            }
        })

        return form
    }

    return {
        handleErrors,
        logout,
        getInformationUser,
        setForm
    }
}

export default helpers