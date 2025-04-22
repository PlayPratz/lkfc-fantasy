<template>
    <div class="my-10 mx-4">
        <h3 class="text-center">{{ teamPoint.name }}</h3>
        <v-table class="my-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th></th>
                    <th>Player</th>
                    <th>Points</th>
                    <th></th>
                    <th>IPL Team</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in teamPoint.players.length">
                    <td>{{ i }}</td>
                    <td>{{ getPlayer(i).IS_FP === '1' ? '✈️' : '' }}</td>
                    <td>{{ getPlayer(i).Name }}</td>
                    <td>{{ getPlayer(i).OverallPoints }}</td>
                    <td>{{ getStatus(i) }}</td>
                    <td>{{ getPlayer(i).TeamShortName }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><b>TOTAL</b></td>
                    <td><b>{{ teamPoint.points }}</b></td>
                    <td></td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup lang="ts">
import type { FantasyPlayerObject, FantasyPlayers } from '@/logic/fantasy-player';
import type { TeamWithPoints } from '@/logic/teams';


const p = defineProps<{
    // For some reason I am unable to pass two props
    // Seems like a bug, but can't find anything online
    // Hence I have resorted to one prop with two properties
    props: {
        fantasyPlayers: FantasyPlayers,
        teamPoint: TeamWithPoints
    }
}>();

const fantasyPlayers = p.props.fantasyPlayers;
const teamPoint = p.props.teamPoint;


function getPlayer(index: number): FantasyPlayerObject {
    // I have no idea why the loop is 1-indexed
    return fantasyPlayers[teamPoint.players[index - 1]];
}


const descPoints = teamPoint.players
    .map((p) => fantasyPlayers[p].OverallPoints)
    .sort((a, b) => b - a)

const threshold = descPoints[11];
const highest = descPoints[0];


function getStatus(index: number): string {
    const player = getPlayer(index);
    if (player.OverallPoints == highest) {
        return '🥇';
    } else if (player.OverallPoints <= threshold) {
        return '🔻';
    }

    return '';
}

</script>