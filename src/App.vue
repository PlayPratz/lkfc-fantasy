<template>
  <v-app>
    <v-main>
      <div v-if="isLoading" class="text-center my-16">
        <v-progress-circular indeterminate />
      </div>
      <div v-else>
        <Leaderboard :teampoints="teamPoints" />
        <TeamBreakdown v-for="team in teamPoints" :props="{
          fantasyPlayers,
          teamPoint: team
        }" />
      </div>
    </v-main>
    <v-fab app color="primary" location="bottom right" icon="mdi-arrow-up" @click="scrollToTop">
      <v-icon></v-icon>
    </v-fab>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fetchLatestPoints, type FantasyPlayers } from './logic/fantasy-player';
import { calculatePointsForTeam, TEAMS, type TeamWithPoints } from './logic/teams';
import Leaderboard from './components/Leaderboard.vue';
import TeamBreakdown from './components/TeamBreakdown.vue';

const isLoading = ref(true);



const teamPoints: TeamWithPoints[] = [];
let fantasyPlayers: FantasyPlayers;

fetchLatestPoints()
  .then((fp) => {
    console.log(fp)
    for (const team of TEAMS) {
      teamPoints.push({
        ...team,
        points: calculatePointsForTeam(team, fp),
      })

      fantasyPlayers = fp;
    }

    teamPoints.sort((t1, t2) => t2.points - t1.points)
    isLoading.value = false;
  });

function scrollToTop() {
  scrollTo({ top: 0 });
}
</script>
