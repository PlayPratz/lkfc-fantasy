import type { FantasyPlayerObject, FantasyPlayers } from "./fantasy-player";

export interface Team {
    name: string;
    players: number[];
}

export interface TeamWithPoints extends Team {
    points: number;
}

const ARJUN: Team = {
    name: "ARJUN",
    players: [
        10085,
        69500,
        3850,
        4338,
        63611,
        63345,
        71411,
        69656,
        65723,
        66044,
        28891,
        65893,
        68027,
        88542,
        66819,
    ]
}

const RUTASH: Team = {
    name: "RUTASH",
    players: [
        9782,
        63751,
        82442,
        70155,
        3991,
        63755,
        63641,
        85736,
        101907,
        71151,
        115918,
        63187,
        63788,
        67887,
        66516,
    ]
}

const PRATIK: Team = {
    name: "PRATIK",
    players: [
        100353,
        63520,
        62023,
        95322,
        59736,
        64941,
        71951,
        65859,
        3676,
        71447,
        3852,
        57903,
        56964,
        66243,
        58101,
    ]
}

const KONARK: Team = {
    name: "KONARK",
    players: [
        3899,
        63940,
        66927,
        66823,
        5313,
        4311,
        28994,
        63341,
        64712,
        66939,
        13177,
        66818,
        3993,
        67476,
        71376,
    ]
}

const ANIKET: Team = {
    name: "ANIKET",
    players: [
        5407,
        70222,
        83453,
        73830,
        11229,
        74761,
        41229,
        67905,
        65478,
        74298,
        9844,
        5132,
        69409,
        10094,
        70296,
    ]
}

const NISHANT: Team = {
    name: "NISHANT",
    players: [
        67540,
        64721,
        63715,
        93526,
        63726,
        66584,
        74837,
        71370,
        65430,
        65160,
        69238,
        59547,
        67516,
        100564,
        71366,
        120157
    ]
}

const JUGAL: Team = {
    name: "JUGAL",
    players: [
        71260,
        70500,
        58065,
        63719,
        66438,
        64727,
        70746,
        64219,
        64861,
        69657,
        65291,
        64254,
        12047,
        64440,
        63961,
    ],
}

const ADVAY: Team = {
    name: "ADVAY",
    players: [
        58223,
        65867,
        64724,
        61837,
        66953,
        65687,
        67285,
        10053,
        62576,
        67469,
        94786,
        70761,
        65702,
        67778,
        70324,
    ]
}

const CHAITANYA: Team = {
    name: "CHAITANYA",
    players: [
        67589,
        66053,
        4255,
        60122,
        11803,
        65632,
        71288,
        66799,
        67402,
        88352,
        90501,
        66807,
        61738,
        67910,
        69659,
    ]
}

const SAAHIL: Team = {
    name: "SAAHIL",
    players: [
        65799,
        58913,
        10116,
        69274,
        65756,
        65027,
        65584,
        63649,
        65748,
        28035,
        68176,
        64511,
        65295,
        4555,
        63748,
    ]
}


export function calculatePointsForTeam(team: Team, points: FantasyPlayers): number {

    let penalty = 0;
    const players = getPlayersForTeam(team, points);
    const overseas_players = players.filter((p) => p.IS_FP === "1");

    if (overseas_players.length > 7) {
        console.log(`Penalty applicable for ${team.name}`)
        penalty = Math.min(...overseas_players.map((p) => p.OverallPoints));
    }

    const totalPoints =
        players
            .map((value) => value.OverallPoints)
            .sort((a, b) => b - a) // Sort descending
            .slice(0, 11) // Take top 11
            .reduce((sum, value) => sum + value, 0);

    return totalPoints - penalty;
}

export function getPlayersForTeam(team: Team, points: FantasyPlayers): FantasyPlayerObject[] {
    return Object.values(points).filter((value) => team.players.includes(value.Id));
}

// export const TEAMS = {
//     ARJUN,
//     RUTASH,
//     PRATIK,
//     KONARK,
//     ANIKET,
//     NISHANT,
//     JUGAL,
//     ADVAY,
//     CHAITANYA,
//     SAAHIL
// }

export const TEAMS = [
    ARJUN,
    RUTASH,
    PRATIK,
    KONARK,
    ANIKET,
    NISHANT,
    JUGAL,
    ADVAY,
    CHAITANYA,
    SAAHIL
]