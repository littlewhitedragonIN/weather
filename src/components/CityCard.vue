<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer justify-between">
        <div class="flex flex-col">
            <h2 class="text-xl">{{ cityWeather.locationName }}</h2>
            <h3>{{ cityWeather.temp }}&deg;</h3>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-xl">{{ cityWeather.text }}</p>
            <div class="icon">
                <i :class="`qi-${cityWeather.icon}`"></i>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
    cityWeather: {
        type: Object,
        default: {}
    }
})


</script>

