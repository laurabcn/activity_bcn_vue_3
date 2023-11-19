<template>
    <div class="container mx-auto mt-5 text-center">
        <div class="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-3 gap-4">
            <div v-for="item in libraryActivity" :key="item.id" class="container mx-auto mt-5 text-left">
                <div class="relative">
                    <img :src="item.src_imatge" alt="Imatge de l'activitat" class="w-full rounded-lg h-48" />
                    <div class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-red-500 text-white p-1">
                        <h2>{{ item.grup_adreca.municipi_nom }}</h2>
                    </div>
                    <div
                        class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-red p-1"
                        style="top: 25%"
                    >
                        <h2>{{ item.categoria }}</h2>
                    </div>
                    <div class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-1">
                        <h2>{{ item.publico }}</h2>
                    </div>
                </div>
                <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                            class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                        >
                            <span>{{ item.titol }}</span>
                            <ChevronUpIcon
                                :class="open ? 'rotate-180 transform' : ''"
                                class="h-5 w-5 text-purple-500"
                            />
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <p v-if="item.grup_adreca.adreca">📌 {{ item.grup_adreca.adreca }}</p>
                            <p v-if="item.durada">&#x23F0; {{ item.durada }}</p>
                            <p v-if="item.data_inici != item.data_fi">
                                Horari: {{ item.data_inici }} - {{ item.data_fi }}
                            </p>
                            <p v-if="item.descripcio">{{ item.descripcio }}</p>
                            <p v-if="item.observacions">{{ item.observacions }}</p>
                        </DisclosurePanel>
                    </Disclosure>
                    <Disclosure v-slot="{ open }" as="div" class="mt-2">
                        <DisclosureButton
                            class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                        >
                            <span>{{ item.grup_adreca.adreca_nom }}</span>
                            <ChevronUpIcon
                                :class="open ? 'rotate-180 transform' : ''"
                                class="h-5 w-5 text-purple-500"
                            />
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <p>Organitza: {{ item.acte_organitzadors }}</p>
                            <p v-if="item.telefon">
                                Telèfon: <a :href="'tel:' + item.telefon"> {{ item.telefon }} </a>
                            </p>
                            <p v-if="item.email">
                                E-mail <a :href="'mailto:' + item.email">{{ item.email }}</a>
                            </p>
                        </DisclosurePanel>
                    </Disclosure>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'

const libraryActivity = ref(null)
let eventos = ref(null)
const errorMessage = ref(null)

// GET request using fetch with error handling
fetch(
    'https://do.diba.cat/api/dataset/actesbiblioteques_ca/camp-data_inici-greater/datetime:' +
        new Date().toISOString() +
        '/camp-municipi_nom-like/Barcelona/pag-ini/1/pag-fi/10',
)
    .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json')
        const data = isJson && (await response.json())

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        eventos.value = data.elements.forEach((element) => {
            element.title = element.titol
            element.start = element.data_inici
            element.end = element.data_fi
        })
        libraryActivity.value = data.elements.forEach((element) => {
            element.src_imatge = element.imatge.toString()
            element.categoria = element.categoria[0].toString().replace(/_/g, ' ').toUpperCase()
            element.grup_adreca.municipi_nom = element.grup_adreca.municipi_nom.toString().replace(/Barcelona -/g, ' ')
            element.publico = element.public.toString()
            element.telefon = element.telefon_contacte.toString()
            element.email = element.email.toString()
        })

        libraryActivity.value = data.elements
    })
    .catch((error) => {
        errorMessage.value = error
        console.error('There was an error!', error)
    })
</script>
