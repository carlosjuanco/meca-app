<script lang="ts">
import {defineComponent} from 'vue'
import { ref } from 'vue'

export default defineComponent({
    name: 'ModalNotification',
    emits: ['close', 'getData'],
    props: {
        show: Boolean,
        data: Object
    },
    setup (props, { emit }) {
        let loading = ref(false)
        let animation_modal_content = ref(true)

        const animationEndModalContent = async () => {
            if(animation_modal_content.value == false) {
               emit('close')
               animation_modal_content.value = true
            }
        }

        return { loading, animation_modal_content, animationEndModalContent }
    }
})
</script>
<template>
    <div :class="{'modal modal-fx-fadeInScale': true, 'is-active': show}">
        <div class="" @click="animation_modal_content = false" v-if="loading == false"></div>

        <div :class="{'animate__animated': true, 'animate__bounceOut': animation_modal_content == false }"
        @animationend="animationEndModalContent">
            <div class="">
                <section class="" @click="animation_modal_content = false">
                    <div class="columns mb-0">
                      <div class="column is-half is-offset-one-quarter">
                            <figure class="image">
                                <img class="ml-4 animate__animated animate__flash animate__infinite" 
                                    src="../assets/advertencia.png" />
                                </figure>
                      </div>
                    </div>
                    <h4 v-for="item in data.message" :key="item" class="subtitle is-4 has-text-centered mb-3" v-text="item"></h4>
                </section>
            </div>
        </div>
    </div>
</template>