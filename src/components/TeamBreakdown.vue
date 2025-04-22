<template>
    <div class="my-10 mx-1" :id="teamPoint.name.toLowerCase()">
        <h3 class="text-center">{{ teamPoint.name }}</h3>
        <v-table class="my-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Points</th>
                    <th>Team</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in players">
                    <td>{{ p.rank ? p.rank : '+'}}</td>
                    <td>{{ p.player.Name }} {{ getOverseasIndicator(p.player) }}</td>
                    <td>{{ p.player.OverallPoints }} {{ getPointIndicator(p.player) }}</td>
                    <td>{{ p.player.TeamShortName }}</td>
                </tr>
                <tr>
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
import { Replacements, type TeamWithPoints } from '@/logic/teams';


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

const players: {
    rank: number,
    player: FantasyPlayerObject,
}[] = [];

for (let i = 0; i < teamPoint.players.length; i++) {
    let pid = teamPoint.players[i];
    const p = fantasyPlayers[pid];
    players.push({ rank: i + 1, player: p });

    while (Replacements[pid]) {
        players.push({
            rank: 0,
            player: fantasyPlayers[Replacements[pid]]
        });
        pid = Replacements[pid];
    }
}

const descPoints = teamPoint.players
    .map((p) => fantasyPlayers[p].OverallPoints)
    .sort((a, b) => b - a)

const threshold = descPoints[11];
const highest = descPoints[0];

function getPointIndicator(p: FantasyPlayerObject): string {
    if (p.OverallPoints == highest) {
        return '🥇';
    } else if (p.OverallPoints <= threshold) {
        return '🔻';
    }

    return '';
}

function getOverseasIndicator(p: FantasyPlayerObject): string {
    if (p.IS_FP === '1') {
        return '✈️';
    }
    return '';
}

</script>