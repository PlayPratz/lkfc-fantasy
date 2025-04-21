<template>
    <div v-if="isLoading" class="text-center my-16">
        <v-progress-circular indeterminate />
    </div>
    <div v-else>

        <v-table>
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
                    <td>{{ tp.team.name }}</td>
                    <td> {{ tp.points }}</td>
                </tr>
            </tbody>

        </v-table>
    </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { fetchLatestPoints } from "../logic/fantasy-points";
import { calculatePointsForTeam, TEAMS } from "../logic/teams";
import type { Team } from "../logic/teams";

interface TeamPointDisplay {
    team: Team;
    points: number;
}

const isLoading = ref(true);

const teamPoints: TeamPointDisplay[] = [];

fetchLatestPoints()
    .then((points) => {
        for (const team of TEAMS) {
            teamPoints.push({
                team: team,
                points: calculatePointsForTeam(team, points),
            })
        }

        teamPoints.sort((a, b) => b.points - a.points);

        isLoading.value = false;
    });

</script>