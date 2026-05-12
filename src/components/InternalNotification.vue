<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ref } from 'vue'
// https://bulma.io/documentation/elements/icon/#

export default defineComponent({
  name: 'InternalNotification',
  emits: ['close', 'getData'],
  props: {
    show: Boolean,
    data: Object
  },
  setup (props, { emit }) {
    interface MessageType {
      icon: string,
      textColor: string,
    }

    interface Type {
      Informacion: MessageType,
      Advertencia: MessageType,
    }

    let loading = ref(false)
    let animationModalContent = ref(true)
    const icon = reactive<Type>({
      Informacion: {
        icon: "fas fa-circle-check fas",
        textColor: "success"
      },
      Advertencia: {
        icon: "fas fa-exclamation-triangle",
        textColor: "warning"
      }
    });

    const animationEndModalContent = async () => {
      if(animationModalContent.value == false) {
        emit('close')
        animationModalContent.value = true
      }
    }

    return { loading, animationModalContent, animationEndModalContent, icon }
  }
})
</script>
<template>
  <div :class="{'modal modal-fx-fadeInScale': true, 'is-active': show }">
    <div @click="animationModalContent = false" v-if="loading == false"></div>
    <div :class="{'animate__animated': true,
      'animate__bounceOut': animationModalContent == false }"
      @animationend="animationEndModalContent"
    >
      <div>
        <section @click="animationModalContent = false"
          class="animate__animated animate__bounceIn"
        >
          <div class="columns is-mobile">
            <div class="column is-half is-offset-one-quarter">
              <span :class="`icon is-large has-text-${icon[data.type]?.textColor} is-justify-content-space-between`">
                  <i :class="`${icon[data.type]?.icon} fa-10x`"></i>
              </span>
            </div>
          </div>
          <!--
            Casos
            message: "Network Error"
              Descripcion: 
                - Existe un error con la API.
                - No hay conexion con la API.
                - No hay internet en el lugar que se esta conectando al wifi.
            message: "Request failed with status code 422"
              Descripcion: Las validaciones estan regresando un mensaje, 
                tengo que entrar en
              errors: Este es un arreglo la llave es el nombre del campo
                El valor es el error que esta devolviendo.
            message: "¡Listo! Tus datos se guardaron bien."
              Descripcion: Se guarda, modifica y se elimina correctamente.
                Pero de acuerdo al proyecto o en el futuro puedo cambiar ese mensaje
                así que por el momento no lo pondre en la lista de casos dentro del if.

          -->
          <template v-if="data.message == 'Network Error' ">
            <div class="columns is-mobile">
              <div class="column is-three-fifths is-offset-one-fifth">
                <h4 :class="`subtitle is-4 has-text-centered mb-3 tag is-${icon[data.type]?.textColor} is-medium`"
                  v-text="data.message"
                >
                </h4>
              </div>
            </div>
          </template>
          <template v-else-if="data.message == 'Request failed with status code 422' ">
            <h4 v-for="item in data.errors" :key="item" 
              :class="`subtitle is-4 has-text-centered mb-3 tag is-${icon[data.type]?.textColor} is-medium`" 
              v-text="item[0]"
            >
            </h4>
          </template>
          <template v-else>
            <h4 :class="`subtitle is-4 has-text-centered mb-3 tag is-${icon[data.type]?.textColor} is-medium`"
              v-text="data.message"
            >
            </h4>
          </template>
        </section>
      </div>
    </div>
  </div>
</template>