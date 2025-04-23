<template>
    <v-container>
        <v-card class="pt-4">
            <v-sparkline type="bar" auto-draw smooth :gradient="gradient" gradient-direction="right"
                :model-value="teamPoints.map((p) => p.points)" :labels="teamPoints.map((p) => p.name)" label-size=5>
            </v-sparkline>
            <v-table class="mt-4" hover>
                <thead>
                    <tr class="bg-primary">
                        <th>#</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tp in teamPoints">
                        <td> {{ teamPoints.indexOf(tp) + 1 }} </td>
                        <td>
                            <a class="text-primary text-decoration-none" :href="`#${tp.name.toLowerCase()}`">
                                {{ tp.name }}
                                <v-icon class="text-secondary">mdi-arrow-right-thin</v-icon>
                            </a>

                        </td>
                        <td> {{ tp.points }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>



    </v-container>

</template>

<script setup lang="ts">

import type { Team, TeamWithPoints } from "../logic/teams";

const props = defineProps<{ teampoints: TeamWithPoints[] }>();
const teamPoints = props.teampoints.sort((a, b) => b.points - a.points);

const gradient = ['#f72047', '#ffd200', '#1feaea'];

</script>