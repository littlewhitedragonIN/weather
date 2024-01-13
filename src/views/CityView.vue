<template>
    <Suspense>
        <AsyncWeather />
        <template #fallback>
            <CityViewSkeleton />
        </template>
    </Suspense>
</template>

<script setup>
import AsyncWeather from '@/components/AsyncWeather.vue';
import CityViewSkeleton from '@/components/CityViewSkeleton.vue';

</script>

