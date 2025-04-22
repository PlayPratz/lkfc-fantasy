<template>
    <v-table class="mx-1">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tp in teamPoints">
                <td> {{ teamPoints.indexOf(tp) + 1 }} </td>
                <td> <a :href="`#${tp.name.toLowerCase()}`">{{ tp.name }}</a></td>
                <td> {{ tp.points }}</td>
            </tr>
        </tbody>

    </v-table>
</template>

<script setup lang="ts">

import type { Team, TeamWithPoints } from "../logic/teams";

const props = defineProps<{ teampoints: TeamWithPoints[] }>();
const teamPoints = props.teampoints.sort((a, b) => b.points - a.points);

</script>