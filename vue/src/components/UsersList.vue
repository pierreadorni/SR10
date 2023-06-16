<script setup>
import {ref} from "vue";

const listItems = ref([]);

async function logJSONData() {
    const response = await fetch("/api/offers")
    const jsonData = await response.json();
    listItems.value =  jsonData;
}
logJSONData();
</script>

<template>
    <tbody>
    <table border="1">
        <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Intitulé</th>
            <th scope="col">Organisation</th>
        </tr>
        </thead>

        <tr v-for="item in listItems">

            <td>{{ new Date(item.dateUpload).toLocaleDateString() }}</td>
            <td>{{ item.intitule }}</td>
            <td>{{ item.nomOrganisation }}</td>
        </tr>
    </table>

    </tbody>
</template>

<style scoped>

</style>