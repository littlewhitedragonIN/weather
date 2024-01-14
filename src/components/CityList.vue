<template>
    <div v-for="cityWeather in savedCitiesWeather">
        <CityCard :cityWeather="cityWeather" @click="goDetail(cityWeather)" />
    </div>
    <p v-if="savedCitiesWeather.length === 0">
        No location added. To start tracking a location, search in the field above.
    </p>
</template>

<script setup>
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import { tempPromise } from '@/shared/service';
import { useRouter } from 'vue-router';


const savedCitiesWeather = ref([]);

const getCities = async () => {
    let savedCities = [];
    if (localStorage.getItem('savedCities')) {
        savedCities = JSON.parse(localStorage.getItem('savedCities'));
    }
    // get the location ID array to send request to get all related info
    const requests = [];
    if (savedCities.length) {
        for (const item of savedCities) {
            requests.push(tempPromise(item.locationID, 'now'));
        }
        const res = await Promise.all(requests);
        savedCitiesWeather.value = res.map((el, index) => ({ ...el.data.now, locationName: savedCities[index].locationName, locationID: savedCities[index].locationID }))
    }
}
await new Promise((resolve) => setTimeout(resolve, 300))

await getCities();


const router = useRouter();

const goDetail = (city) => {
    router.push({
        name: "cityView",
        params: { locationID: city.locationID },
        query: {
            cityName: city.locationName
        }
    });
}
</script>

