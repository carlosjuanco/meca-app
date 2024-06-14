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
        <div class="modal-background" @click="animation_modal_content = false" v-if="loading == false"></div>

        <div :class="{'modal-content animate__animated': true, 'animate__flipInX': animation_modal_content, 'animate__flipOutX': animation_modal_content == false }"
        @animationend="animationEndModalContent">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-warning has-text-centered" v-text="data.title"></p>
                    <button class="delete" aria-label="close" @click="animation_modal_content = false"></button>
                </header>
                <section class="modal-card-body">
                    <div class="columns mb-0">
                      <div class="column is-half is-offset-one-quarter">
                            <figure class="image">
                                <img class="ml-4 animate__animated animate__flash animate__infinite" src="../assets/advertencia.png" />
                                </figure>
                      </div>
                    </div>
                    <h4 v-for="item in data.message" :key="item" class="subtitle is-4 has-text-centered mb-3" v-text="item"></h4>
                    <p class="mt-6 mb-6 has-text-white">M</p>
                    <p class="mt-6 mb-6 has-text-white">M</p>
                    <p class="mt-6 mb-6 has-text-white">M</p>
                </section>
                <footer class="modal-card-foot"> 
                </footer>
            </div>
        </div>
    </div>
</template>