<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { DataModelInternal } from './types/tiposGenericos'
// https://bulma.io/documentation/elements/icon/#
/**
 * @component InternalNotification
 * @description Componente de notificaciones modales con 4 tipos predefinidos:
 * - Éxito: Operaciones completadas correctamente
 * - Error: Fallos en operaciones, incluyendo errores de validación (422)
 * - Ayuda: Confirmaciones o preguntas al usuario (Sí/No)
 * - Advertencia: Acciones peligrosas o irreversibles
 * 
 * Fuente: https://josetxu.com/estilos-para-notificaciones/
 * 
 * @requires animate.css v4.1.1 - Para las animaciones de los iconos
 * @requires Bulma v1.0.1 - Para los estilos base del modal y botones
 * @requires Font Awesome - Para los iconos (fas fa-circle-check, fas fa-ban, etc.)
 * 
 * @emits close - Se emite cuando el modal se cierra (por X, fondo o botón cancelar)
 * @emits confirm - Se emite cuando el usuario confirma la acción (Sí, Aceptar, De acuerdo)
 * @emits reject - Se emite cuando el usuario rechaza la acción (No, Cancelar)
 * 
 * @example
 * // Uso básico - Notificación de éxito
 * <InternalNotification
 *   :show="showModal"
 *   :data="{ type: 'Exito', message: 'Guardado correctamente' }"
 *   @close="showModal = false"
 * />
 * 
 * @example
 * // Notificación de error con múltiples mensajes (Laravel 422)
 * <InternalNotification
 *   :show="showErrorModal"
 *   :data="{
 *     type: 'Error',
 *     errors: {
 *       email: 'El email ya está registrado',
 *       password: 'La contraseña debe tener mínimo 8 caracteres'
 *     }
 *   }"
 *   @close="showErrorModal = false"
 * />
 * 
 * @example
 * // Notificación de ayuda con callbacks
 * <InternalNotification
 *   :show="showHelpModal"
 *   :data="{
 *     type: 'Ayuda',
 *     message: '¿Deseas eliminar este registro?',
 *     onConfirm: () => eliminarRegistro(),
 *     onReject: () => console.log('Cancelado')
 *   }"
 *   @close="showHelpModal = false"
 * />
 */

export default defineComponent({
  name: 'InternalNotification',
  emits: ['close', 'confirm', 'reject'],
  props: {
    show: Boolean,
    data: {
      type: Object as () => DataModelInternal,
      default: () => ({ type: 'Exito', message: '' })
    }
  },
  setup(props, { emit }) {
    let loading = ref(false)
    let animationModalContent = ref(true)

    // Configuración de tipos de notificaciones
    const typeConfig = {
      Exito: {
        colorModalBackground: "background-success-internal-notificacion",
        colorModalBackgroundContent: "background-success-internal-notificacion-content",
        icon: "fas fa-circle-check",
        textColor: "has-text-white",
        title: "Éxito",
        buttonText: "De acuerdo",
        buttonColor: "",
        animation: "animate__heartBeat animate__infinite",
        showBody: true,
        showFooter: true,
        buttons: 1
      },
      Error: {
        colorModalBackground: "background-danger-internal-notificacion",
        colorModalBackgroundContent: "background-danger-internal-notificacion-content",
        icon: "fas fa-ban",
        textColor: "has-text-white",
        title: "Error",
        buttonText: "Claro",
        buttonColor: "",
        animation: "animate__flash animate__infinite",
        showBody: true,
        showFooter: true,
        buttons: 1
      },
      Ayuda: {
        colorModalBackground: "background-info-internal-notificacion",
        colorModalBackgroundContent: "background-info-internal-notificacion-content",
        icon: "fas fa-info-circle",
        textColor: "has-text-white",
        title: "Ayuda",
        buttonText: "Sí",
        buttonTextSecondary: "No",
        buttonColor: "",
        buttonColorSecondary: "",
        animation: "animate__pulse animate__infinite",
        showBody: true,
        showFooter: true,
        buttons: 2
      },
      Advertencia: {
        colorModalBackground: "background-warning-internal-notificacion",
        icon: "fas fa-triangle-exclamation",
        textColor: "has-text-warning",
        title: "Advertencia",
        buttonText: "Aceptar",
        buttonTextSecondary: "Cancelar",
        buttonColor: "is-warning",
        buttonColorSecondary: "is-light",
        animation: "animate__shakeX animate__infinite",
        showBody: true,
        showFooter: true,
        buttons: 2
      }
    }

    const currentType = computed(() => {
      return typeConfig[props.data?.type || 'Exito']
    })

    const displayMessage = computed(() => {
      if (props.data?.type === 'Error') {
        console.info('Regresa errores', props.data.errors)
        return props.data.errors
      }
      return props.data?.message ? [props.data.message] : []
    })

    const animationEndModalContent = async () => {
      if (!animationModalContent.value) {
        emit('close')
        animationModalContent.value = true
      }
    }

    const closeModal = () => {
      animationModalContent.value = false
      emit('close')
    }

    const handleConfirm = () => {
      if (props.data?.onConfirm) {
        props.data.onConfirm()
      }
      emit('confirm')
      if (props.data?.type !== 'Ayuda') {
        closeModal()
      }
    }

    const handleReject = () => {
      if (props.data?.onReject) {
        props.data.onReject()
      }
      emit('reject')
      closeModal()
    }

    return { 
      loading, 
      animationModalContent, 
      animationEndModalContent,
      currentType,
      displayMessage,
      closeModal,
      handleConfirm,
      handleReject
    }
  }
})
</script>

<template>
  <transition 
    @after-leave="animationEndModalContent"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div v-if="show" :class="{'modal': true, 'is-active': animationModalContent }">
      <div :class="`modal-background ${currentType.colorModalBackground}`"
        @click="closeModal()">
      </div>
      
      <div class="modal-content">
        <div :class="`box ${currentType.colorModalBackgroundContent}`">
          <article class="media">
            <!-- Icono con animación -->
            <div class="media-left">
              <figure 
                class="image is-64x64"
                :class="{'animate__animated': show, [currentType.animation]: show }"
              >
                <i :class="`${currentType.icon} fa-3x ${currentType.textColor}`"></i>
              </figure>
            </div>
            
            <div class="media-content">
              <!-- Título -->
              <p :class="`title is-2 ${currentType.textColor} has-text-weight-bold`">
                {{ currentType.title }}
              </p>
              
              <!-- Cuerpo del mensaje -->
              <template v-if="currentType.showBody">
                <p v-for="(msg, index) in displayMessage" :key="index"
                  :class="`subtitle is-4 ${currentType.textColor}`"
                >
                  {{ msg }}
                </p>
              </template>

            </div>

            <!-- Icono con cerrar el modal -->
            <button class="delete" @click="closeModal()"></button>

          </article>
          <!-- Botones del pie -->
          <template v-if="currentType.showFooter">
            <div v-if="currentType.buttons === 1" class="buttons">
              <button 
                :class="['button is-fullwidth', currentType.buttonColor, { 'is-loading': loading }]"
                @click="handleConfirm"
                :disabled="loading"
              >
                {{ currentType.buttonText }}
              </button>
            </div>
            <div v-else-if="currentType.buttons === 2" class="columns is-mobile is-centered">
              <div class="column is-half">
                <div class="buttons is-centered">
                  <button 
                    :class="['button', currentType.buttonColor, { 'is-loading': loading }]"
                    @click="handleConfirm"
                    :disabled="loading"
                  >
                    {{ currentType.buttonText }}
                  </button>
                  <button 
                    :class="['button', currentType.buttonColorSecondary]"
                    @click="handleReject"
                  >
                    {{ currentType.buttonTextSecondary }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.background-danger-internal-notificacion {
  background-color: hsl(10.56deg 73.04% 55.93% / 86%);
}
.background-danger-internal-notificacion-content {
  background-color: hsl(10.56deg 73.04% 55.93% / 0%);
}
.background-success-internal-notificacion {
  background-color: hsl(152.64deg 52.3% 53.14% / 86%);
}
.background-success-internal-notificacion-content {
  background-color: hsl(152.64deg 52.3% 53.14% / 0%);
}
.background-info-internal-notificacion {
  background-color: hsl(198.04deg 100% 70% / 86%);
}
.background-info-internal-notificacion-content {
  background-color: hsl(198.04deg 100% 70% / 0%);
}
</style>