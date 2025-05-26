<script lang="ts">
import {defineComponent, reactive} from 'vue'
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

        interface IconType {
            Informacion: MessageType,
            Advertencia: MessageType,
        }

        let loading = ref(false)
        let animation_modal_content = ref(true)
        let icon = reactive<IconType>({
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
            if(animation_modal_content.value == false) {
               emit('close')
               animation_modal_content.value = true
            }
        }

        return { loading, animation_modal_content, animationEndModalContent, icon }
    }
})
</script>
<template>
    <div :class="{'modal modal-fx-fadeInScale': true, 'is-active': show }">
        <div @click="animation_modal_content = false" v-if="loading == false"></div>
            <div :class="{'animate__animated': true, 
                'animate__bounceOut': animation_modal_content == false }"
                @animationend="animationEndModalContent"
            >
                <div>
                    <section @click="animation_modal_content = false"
                        class="animate__animated animate__bounceIn">
                        <div class="columns is-mobile">
                            <div class="column is-half is-offset-one-quarter">
                                <span :class="`icon is-large has-text-${icon[data.iconType].textColor} is-justify-content-space-between`">
                                    <i :class="`${icon[data.iconType].icon} fa-10x`"></i>
                                </span>
                            </div>
                        </div>
                        <h4 v-for="item in data.message" :key="item" 
                            :class="`subtitle is-4 has-text-centered mb-3 tag is-${icon[data.iconType].textColor} is-medium`" 
                            v-text="item"
                        >
                        </h4>
                    </section>
                </div>
            </div>
    </div>
</template>