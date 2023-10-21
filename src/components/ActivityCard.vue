<template>
    <div class="w-full px-4 pt-16" v-for="{ picture } in results.results" :src="picture.medium">
        <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure v-slot="{ open }">
                <DisclosureButton
                    class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                >
                    <span>What is your refund policy?</span>
                    <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-purple-500" />
                </DisclosureButton>
                <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                    If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in
                    full, no questions asked.
                </DisclosurePanel>
            </Disclosure>
            <Disclosure v-slot="{ open }" as="div" class="mt-2">
                <DisclosureButton
                    class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                >
                    <span>Do you offer technical support?</span>
                    <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-purple-500" />
                </DisclosureButton>
                <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500"> No. </DisclosurePanel>
            </Disclosure>
        </div>
    </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { useAsync } from '../composables/useAsync';
import { watchEffect } from 'vue';

const { makeRequest, results, error } = useAsync();

const data = await makeRequest('https://randomuser.me/api/?results=50');

watchEffect(() => {
	  if (error.value) alert('Problem found: ' + error.value.message);
	});
</script>
