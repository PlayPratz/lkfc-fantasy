<template>
    <v-container>
        <!-- <h3 class="text-center">LEADERBOARD</h3> -->
        <v-table class="mx-1 mt-4">
            <thead>
                <tr class="bg-secondary">
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
    </v-container>

</template>

<script setup lang="ts">

import type { Team, TeamWithPoints } from "../logic/teams";

const props = defineProps<{ teampoints: TeamWithPoints[] }>();
const teamPoints = props.teampoints.sort((a, b) => b.points - a.points);

</script>