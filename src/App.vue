<template>
  <v-app>
    <v-app-bar flat density="compact">
      <v-app-bar-title>Leaderboard</v-app-bar-title>
      <a v-if="!isLoading" :href="getLatestMatchLink()" target="_blank" class="text-secondary">
        <v-btn class="rounded-pill" variant="outlined">
          <small>{{ getLatestMatchString() }}</small>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </a>
      <v-btn @click="toggleTheme" icon="mdi-theme-light-dark" class="ms-2" />
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
    <v-footer  height="40">
      <div class="text-caption">
        <span class="text-disabled">developed by</span>
        <span class="text-decoration-none on-surface">
          Pratik Nerurkar
        </span>
      </div>
    </v-footer>
  </v-app>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fetchLatestPoints, getLatestMatchLink, getLatestMatchNumber, type FantasyPlayers } from './logic/fantasy-player';
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

function getLatestMatchString() {
  const matchNumber = getLatestMatchNumber();
  switch (matchNumber) {
    case "71": return "Qualifier 1";
    case "72": return "Eliminator";
    case "73": return "Qualifier 2";
    case "74": return "Final";
    default: return `Match ${matchNumber}`;
  }
}
</script>
