<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input v-model="searchQuery" type="text" placeholder="Please input province or city"
                class="py-2 px-1 w-full bg-transparent border-b focus:outline-none focus:border-weather-secondary focus:shadow-[0px_1px_0_0_#004E71]">

            <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
                v-if="matchedList.length">
                <p class="py-2" v-if="isSearchError">
                    Sorry, something went wrong, please try again.
                </p>
                <template v-else>
                    <li v-for="item in matchedList" :key="item.id" class="cursor-pointer py-2" @click="viewDetail(item)">
                        {{ item.desc }}
                    </li>
                </template>
            </ul>
        </div>
        <div class="flex flex-col gap-8">
            <Suspense>
                <CityList/>
                <template #fallback>
                    <CityCardSkeleton></CityCardSkeleton>
                </template>
            </Suspense>
        </div>
    </main>
</template>

<script setup>
import debounce from 'lodash.debounce'
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { cityPromise } from '@/shared/service'
import CityList from '@/components/CityList.vue'
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';

const searchQuery = ref("");

const isSearchError = ref(false);

const matchedList = ref([]);



const retrieveLocations = (arr) => {
    return arr.map(item => {
        return { ...item, desc: `${item.name} - ${item.adm1}${item.adm2}${item.country}` }
    });
}

const processLocationResult = (res) => {
    const { code, location } = res;
    if (code !== '200') {
        isSearchError.value = true;
        return;
    }
    matchedList.value = retrieveLocations(location);

}

watch(searchQuery, debounce(async () => {
    if (searchQuery.value != '') {
        isSearchError.value = false;
        // sometimes the API may fail or request data format is invalid, will enter catch block
        try {
            const result = await cityPromise(searchQuery.value);
            processLocationResult(result.data)
        } catch (err) {
            isSearchError.value = true;
        }
    }
}, 300));


const router = useRouter();
const viewDetail = (item) => {
    router.push({
        name: "cityView",
        params: { locationID: item.id },
        query: {
            cityName: item.name
        }
    });
}


</script>
