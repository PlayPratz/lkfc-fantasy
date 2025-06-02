<template>
    <v-container :id="teamPoint.name.toLowerCase()">
        <v-card class="bg-secondary pt-2">
            <h4 class="text-center">{{ teamPoint.name }}</h4>
            <v-table hover>
                <thead>
                    <tr class="bg-secondary">
                        <th style="width: 10%;">#</th>
                        <th>Player</th>
                        <th style="width: 30%;">Points</th>
                        <th class="d-none d-sm-table-cell" style="width: 10%;">Price (₹cr)</th>
                        <th class="d-none d-sm-table-cell" style="width: 10%;">Team</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in players">
                        <td>{{ p.index }}</td>
                        <td>{{ p.player.Name }} {{ getOverseasIndicator(p.player) }}
                            <template v-for="replacement in p.replacements">
                                <br />
                                <small>{{ fantasyPlayers[replacement].Name }}</small>
                            </template>
                            <div class="d-sm-none text-primary">
                                {{ p.player.TeamShortName }}
                            </div>
                        </td>
                        <td>{{ getPoints(p) }}
                            <small v-if="p.player.GamedayPoints !== 0" :class="getGrowthClass(p.player.GamedayPoints)">
                                ({{ getGrowthSign(p.player.GamedayPoints) }}{{ p.player.GamedayPoints }})
                            </small>
                            {{ getPointIndicator(p) }}
                            <template v-for="replacement in p.replacements">
                                <br />
                                <small>{{ fantasyPlayers[replacement].OverallPoints }}</small>
                            </template>
                            <small class="d-sm-none text-secondary">
                                <br />
                                ₹{{ p.price }}cr{{ getPriceIndicator(p.price) }}
                            </small>
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
        </v-card>
    </v-container>

</template>

<script setup lang="ts">
import type { FantasyPlayerObject, FantasyPlayers } from '@/logic/fantasy-player';
import { calculatePointsForPlayer, Replacements, type TeamWithPoints } from '@/logic/teams';
import { getGrowthClass, getGrowthSign } from '@/styles/styles';


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

interface PlayerInTeamBreakdown {
    index: number,
    player: FantasyPlayerObject,
    points: number,
    price: number,
    replacements: number[]
}

const players: PlayerInTeamBreakdown[] = teamPoint.auction.map((auctionItem, index) => ({
    index: index + 1,
    player: fantasyPlayers[auctionItem.playerId],
    points: calculatePointsForPlayer(auctionItem.playerId, fantasyPlayers),
    price: auctionItem.price,
    replacements: getReplacements(auctionItem.playerId),
}));

// for (let i = 0; i < teamPoint.auction.length; i++) {
//     const auction = teamPoint.auction[i];
//     let pid = auction.playerId;
//     const p = fantasyPlayers[pid];
//     players.push({ index: i + 1, player: p, price: auction.price });

//     while (Replacements[pid]) {
//         players.push({
//             index: 0,
//             player: fantasyPlayers[Replacements[pid]],
//             price: 0
//         });
//         pid = Replacements[pid];
//     }
// }

const descending = players.slice().sort((a, b) => b.points - a.points);

const topElevenIds = descending.slice(0, 11).map((p) => p.player.Id);
const highest = descending[0].points;

function getPointIndicator(p: PlayerInTeamBreakdown): string {
    if (p.player.OverallPoints == highest) {
        return '🥇';
    } else if (!topElevenIds.includes(p.player.Id)) {
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

const mostExpensive = teamPoint.auction.map((a) => a.price).reduce((p, c) => p > c ? p : c);

function getPriceIndicator(price: number): string {
    if (price === mostExpensive) return '💰';
    return '';
}

function getPoints(p: PlayerInTeamBreakdown): number {
    return calculatePointsForPlayer(p.player.Id, fantasyPlayers);
}

function getReplacements(playerId: number): number[] {
    const replacements: number[] = [];

    let rep = Replacements[playerId];
    while (rep) {
        replacements.push(rep);
        rep = Replacements[rep];
    }

    if(replacements.length > 0) {
        replacements.unshift(playerId); // Add to start
    }

    return replacements;
}

</script>