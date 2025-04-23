<template>
    <v-container>
        <v-card class="bg-secondary pt-2">
            <div :id="teamPoint.name.toLowerCase()">
                <h4 class="text-center">{{ teamPoint.name }}</h4>
                <v-table hover>
                    <thead>
                        <tr class="bg-secondary">
                            <th style="width: 10%;">#</th>
                            <th>Player</th>
                            <th style="width: 28%;">Points</th>
                            <th class="d-none d-sm-table-cell" style="width: 10%;">Price (₹cr)</th>
                            <th class="d-none d-sm-table-cell" style="width: 10%;">Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in players">
                            <td>{{ p.index ? p.index : '🔄' }}</td>
                            <td>{{ p.player.Name }} {{ getOverseasIndicator(p.player) }}
                                <div class="d-sm-none text-primary">
                                    {{ p.player.TeamShortName }}
                                </div>
                            </td>
                            <td>{{ p.player.OverallPoints }} {{ getPointIndicator(p.player) }}
                                <div class="d-sm-none text-secondary">
                                    ₹{{ p.price }} cr {{ getPriceIndicator(p.price) }}
                                </div>
                            </td>
                            <td class="d-none d-sm-table-cell"> {{ p.price ? p.price : '🩹' }} {{
                                getPriceIndicator(p.price) }}
                            </td>
                            <td class="d-none d-sm-table-cell">{{ p.player.TeamShortName }}</td>
                        </tr>
                        <tr class="bg-primary">
                            <td></td>
                            <td><b>TOTAL</b></td>
                            <td><b>{{ teamPoint.points }}</b></td>
                            <td class="d-none d-sm-table-cell"></td>
                            <td class="d-none d-sm-table-cell"></td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </v-card>
    </v-container>

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
    index: number,
    price: number,
    player: FantasyPlayerObject,
}[] = [];

// const playerIds = getPlayerIdsForTeam(teamPoint);

for (let i = 0; i < teamPoint.auction.length; i++) {
    const auction = teamPoint.auction[i];
    let pid = auction.playerId;
    const p = fantasyPlayers[pid];
    players.push({ index: i + 1, player: p, price: auction.price });

    while (Replacements[pid]) {
        players.push({
            index: 0,
            player: fantasyPlayers[Replacements[pid]],
            price: 0
        });
        pid = Replacements[pid];
    }
}

const descPoints =
    teamPoint.auction
        .map((a) => fantasyPlayers[a.playerId].OverallPoints)
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

const expensive = teamPoint.auction.map((a) => a.price).reduce((p, c) => p > c ? p : c);

function getPriceIndicator(price: number): string {
    if (price === expensive) return '💰';
    return '';
}

</script>