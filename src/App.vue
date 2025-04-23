<template>
  <v-app>
    <v-app-bar flat density="compact">
      <v-app-bar-title>Leaderboard</v-app-bar-title>
      <v-btn @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <div v-if="isLoading" class="text-center my-16">
        <v-progress-circular indeterminate />
        <br />
        <br />
        <span>Fetching Fantasy Points...</span>
      </div>
      <div v-else>
        <Leaderboard :teampoints="teamPoints" />
        <TeamBreakdown v-for="team in teamPoints" :props="{
          fantasyPlayers,
          teamPoint: team
        }" />
      </div>
    </v-main>
    <v-fab v-if="!isLoading" app color="primary" location="bottom right" icon="mdi-arrow-up" @click="scrollToTop"
      :active="!isScrolledTop" />
    <!-- <v-bottom-navigation mode="shift" value="leaderboard" mandatory="force" @update:model-value="(v) => console.log(v)">
      <v-btn value="leaderboard">
        <v-icon>mdi-format-list-numbered</v-icon>
        <span>Leaderboard</span>
      </v-btn>

      <v-btn value="stats">
        <v-icon>mdi-chart-bar</v-icon>
        <span>Stats</span>
      </v-btn>
    </v-bottom-navigation> -->
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fetchLatestPoints, type FantasyPlayers } from './logic/fantasy-player';
import { calculatePointsForTeam, calculatePreviousPointsForTeam, TEAMS, type TeamWithPoints } from './logic/teams';
import Leaderboard from './components/Leaderboard.vue';
import TeamBreakdown from './components/TeamBreakdown.vue';
import { useTheme } from 'vuetify';
import { THEME } from './logic/theme';

const theme = useTheme();
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';

  THEME.saveTheme(theme.global.current.value.dark ? 1 : 0);
}

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
        previousPoints: calculatePreviousPointsForTeam(team, fp)
      })
      fantasyPlayers = fp;
    }

    teamPoints.sort((t1, t2) => t2.points - t1.points)
    isLoading.value = false;
  });

const isScrolledTop = ref(true);
addEventListener("scroll", () => {
  isScrolledTop.value = scrollY === 0;
});
function scrollToTop() {
  scrollTo({ top: 0 });
}

</script>
