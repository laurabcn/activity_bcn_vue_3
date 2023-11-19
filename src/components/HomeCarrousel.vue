<template>
    <Carousel :items-to-show="1.5" class="row">
        <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item" href="{{ urlLink }}">
                {{ slide }}
            </div>
        </Slide>
        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>

<script setup lang="ts">
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
</script>
<style>
.carousel__item {
    min-height: 200px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.row {
    grid-row: 2/2;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>
