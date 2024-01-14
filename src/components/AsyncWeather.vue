<template>
    <div class="flex flex-col items-center">
        <!-- Banner -->
        <div class="text-white p-4 bg-weather-secondary w-full text-center">
            <p>
                You are currently previewing this city, click the "+"
                icon to start tracking this city.
            </p>
        </div>
        <!-- Weather Overview -->
        <template v-if="tempNow && temp24.length && temp7d.length">
            <div class="text-white py-12 text-center">
                <h1 class="text-4xl mb-2">{{ cityName }}</h1>
                <p class="text-sm mb-12">
                    {{ formatDate(tempNow.obsTime) }}
                </p>
                <p class="text-8xl mb-12">
                    {{ `${tempNow.temp}&deg;` }}
                </p>
                <div class="text-center">
                    <p>Feels like {{
                        `${tempNow.feelsLike}&deg;`
                    }}</p>
                    <p class="my-5"> {{ tempNow.text }} </p>
                    <div class="icon">
                        <i :class="`qi-${tempNow.icon}`" class="text-8xl"></i>
                    </div>
                </div>
            </div>
            <hr class="border border-white border-opactity-10 w-full" />
            <!-- 24h details -->
            <div class="w-full max-w-screen-md  py-12">
                <div class="mx-8 text-white">
                    <h2>Hourly Weather</h2>
                    <div class="flex gap-8 py-6  overflow-x-scroll">
                        <div v-for="hourT in temp24" class="flex flex-col items-center py-2 gap-2">
                            <p class=" whitespace-nowrap text-md">
                                {{ formatDate(hourT.fxTime, 'HH:mm') }}
                            </p>
                            <div class="icon">
                                <i :class="`qi-${hourT.icon}`" class="text-2xl"></i>
                            </div>
                            <p class="text-xl">
                                {{ hourT.temp }}&deg;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
            <hr class="border border-white border-opactity-10 w-full" />
            <!-- 7d details -->
            <div class="w-full max-w-screen-md py-12">
                <div class="mx-8 text-white">
                    <h2 class="mb-2 ">7 Days Forecast</h2>
                    <div class="flex my-2 p-2 justify-between" v-for="item in temp7d ">
                        <p>{{ item.fxDate }}</p>
                        <div class="w-20 flex justify-between gap-2">
                            <p class="flex-1 text-nowrap">Max: {{ item.tempMax }}&deg;</p>
                            <p class="flex-1 text-nowrap">Min: {{ item.tempMin }}&deg;</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2 text-white mb-4 cursor-pointer duration-150 hover:text-red-500"
                v-if="savedIndx > -1" @click="removeCity">
                <i class="fa-solid fa-trash"></i>
                <p>Remove City</p>
            </div>

        </template>
        <template v-else>
            <CityCardSkeleton />
        </template>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from "dayjs";
import { tempPromise } from '@/shared/service'
import router from '@/router';
import CityCardSkeleton from './CityCardSkeleton.vue';



const route = useRoute();
const cityName = route.query.cityName;


const tempNow = ref(null);
const temp24 = ref([]);
const temp7d = ref([]);

const locationID = route.params.locationID;
// -1 means not saved before, if > -1, found
const savedIndx = ref(-1);
let cacheCities = [];


const fetchData = async () => {
    const [resNow, resTemp24, resTemp7d] = await Promise.all([tempPromise(locationID, 'now'), tempPromise(locationID, '24h'), tempPromise(locationID, '7d')]);
    const { data: { now } } = resNow;
    const { data: { hourly } } = resTemp24;
    const { data: { daily } } = resTemp7d;

    tempNow.value = now;
    temp24.value = hourly;
    temp7d.value = daily;
}
const formatDate = (d, formatStr = 'YYYY-MM-DD HH:mm:ss') => dayjs(new Date(d)).format(formatStr)
await fetchData();

const hasSavedBefore = () => {
    if (localStorage.getItem('savedCities')) {
        cacheCities = JSON.parse(localStorage.getItem('savedCities'));
        // find the current city whether saved in the cache
        savedIndx.value = cacheCities.findIndex(item => item.locationID === locationID);
    }
}
hasSavedBefore();

const removeCity = () => {
    const index = savedIndx.value;
    if (index > -1) {
        cacheCities.splice(index, 1);
        localStorage.setItem('savedCities', JSON.stringify(cacheCities));
        router.push('/');
    }

}

await new Promise((res) => setTimeout(res, 300))

</script>

