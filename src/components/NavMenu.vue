<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Tr from '@/i18n/translation'
</script>
<template>
    <nav>
        <ul>
            <li>
                <RouterLink :to="Tr.i18nRoute({ name: 'home' })">{{ $t('nav.home') }}</RouterLink>
            </li>
            <li>
                <RouterLink :to="Tr.i18nRoute({ name: 'about' })">{{ $t('nav.about') }}</RouterLink>
            </li>
        </ul>
    </nav>
    <LanguageSwitcher></LanguageSwitcher>
</template>

<style>
.row-1 {
    grid-row: 1/2;
}
</style>
