import type { FantasyPlayerObject, FantasyPlayers } from "./fantasy-player";

export interface Team {
    name: string;
    auction: AuctionItem[];
}

interface AuctionItem {
    playerId: number;
    price: number;
}

export interface TeamWithPoints extends Team {
    points: number;
    previousPoints: number;
}


export function calculatePointsForTeam(team: Team, points: FantasyPlayers): number {
    return calculatePointsForTeamInner(team, points, (p) => calculatePointsForPlayer(p.Id, points));
}

export function calculatePreviousPointsForTeam(team: Team, points: FantasyPlayers): number {
    return calculatePointsForTeamInner(team, points, (p) => calculatePointsForPlayer(p.Id, points) - p.GamedayPoints);
}

function calculatePointsForTeamInner(team: Team, points: FantasyPlayers, calculatePoints: (p: FantasyPlayerObject) => number): number {
    const players = getPlayersForTeam(team, points);
    const penalty = calculatePenaltyForTeam(team, players);

    const totalPoints =
        players
            .map(calculatePoints)
            .sort((a, b) => b - a) // Sort descending
            .slice(0, 11) // Take top 11
            .reduce((sum, value) => sum + value, 0); // Add all values

    return totalPoints - penalty;
}

function calculatePenaltyForTeam(team: Team, players: FantasyPlayerObject[]): number {
    const overseas_players = players.filter((p) => p.IS_FP === "1");

    if (overseas_players.length > 7) {
        console.log(`Penalty applicable for ${team.name}`)
        return Math.min(...overseas_players.map((p) => p.OverallPoints));
    }

    return 0;
}

export function calculatePointsForPlayer(playerId: number | undefined, points: FantasyPlayers): number {
    if (!playerId) {
        return 0;
    }
    return points[playerId].OverallPoints + calculatePointsForPlayer(Replacements[playerId], points);
}

function getPlayerIdsForTeam(team: Team): number[] {
    return team.auction.map((a) => a.playerId);
}

function getPlayersForTeam(team: Team, points: FantasyPlayers): FantasyPlayerObject[] {
    const playerIds = getPlayerIdsForTeam(team);
    return Object.values(points).filter((p) => playerIds.includes(p.Id));
}

const ARJUN: Team = {
    name: "ARJUN",
    auction: [
        {
            playerId: 10085,
            price: 9.5
        },
        {
            playerId: 69500,
            price: 9.5
        },
        {
            playerId: 3850,
            price: 11
        },
        {
            playerId: 4338,
            price: 12
        },
        {
            playerId: 63611,
            price: 10
        },
        {
            playerId: 63345,
            price: 4
        },
        {
            playerId: 71411,
            price: 7
        },
        {
            playerId: 69656,
            price: 6
        },
        {
            playerId: 65723,
            price: 4.5
        },
        {
            playerId: 66044,
            price: 8
        },
        {
            playerId: 28891,
            price: 8
        },
        {
            playerId: 65893,
            price: 7.5
        },
        {
            playerId: 68027,
            price: 1.5
        },
        {
            playerId: 88542,
            price: 1
        },
        {
            playerId: 66819,
            price: 0.5
        },
    ]

}

const RUTASH: Team = {
    name: "RUTASH",
    auction: [
        {
            playerId: 9782,
            price: 13.5
        },
        {
            playerId: 63751,
            price: 19
        },
        {
            playerId: 82442,
            price: 6.5
        },
        {
            playerId: 70155,
            price: 7
        },
        {
            playerId: 3991,
            price: 6.5
        },
        {
            playerId: 63755,
            price: 18
        },
        {
            playerId: 63641,
            price: 2
        },
        {
            playerId: 85736,
            price: 0.5
        },
        {
            playerId: 101907,
            price: 1.5
        },
        {
            playerId: 71151,
            price: 0.5
        },
        {
            playerId: 115918,
            price: 0.5
        },
        {
            playerId: 63187,
            price: 11.5
        },
        {
            playerId: 63788,
            price: 5.5
        },
        {
            playerId: 67887,
            price: 1
        },
        {
            playerId: 66516,
            price: 0.5
        },
    ],

}

const PRATIK: Team = {
    name: "PRATIK",
    auction: [
        {
            playerId: 100353,
            price: 6
        },
        {
            playerId: 63520,
            price: 4.5
        },
        {
            playerId: 62023,
            price: 20
        },
        {
            playerId: 95322,
            price: 2
        },
        {
            playerId: 59736,
            price: 16
        },
        {
            playerId: 64941,
            price: 7
        },
        {
            playerId: 71951,
            price: 4.5
        },
        {
            playerId: 65859,
            price: 2
        },
        {
            playerId: 3676,
            price: 3
        },
        {
            playerId: 71447,
            price: 3
        },
        {
            playerId: 3852,
            price: 11
        },
        {
            playerId: 57903,
            price: 8
        },
        {
            playerId: 56964,
            price: 10
        },
        {
            playerId: 66243,
            price: 1.5
        },
        {
            playerId: 58101,
            price: 1.5
        },
    ],
}

const KONARK: Team = {
    name: "KONARK",
    auction: [
        {
            playerId: 3899,
            price: 1
        },
        {
            playerId: 63940,
            price: 6
        },
        {
            playerId: 66927,
            price: 3
        },
        {
            playerId: 66823,
            price: 3
        },
        {
            playerId: 5313,
            price: 7
        },
        {
            playerId: 4311,
            price: 9
        },
        {
            playerId: 28994,
            price: 9.5
        },
        {
            playerId: 63341,
            price: 1
        },
        {
            playerId: 64712,
            price: 8.5
        },
        {
            playerId: 66939,
            price: 12.5
        },
        {
            playerId: 13177,
            price: 1.5
        },
        {
            playerId: 66818,
            price: 20
        },
        {
            playerId: 3993,
            price: 17
        },
        {
            playerId: 67476,
            price: 0.5
        },
        {
            playerId: 71376,
            price: 0.5
        },
    ]
}

const ANIKET: Team = {
    name: "ANIKET",
    auction: [
        {
            playerId: 5407,
            price: 6
        },
        {
            playerId: 70222,
            price: 6
        },
        {
            playerId: 83453,
            price: 0.5
        },
        {
            playerId: 73830,
            price: 6.5
        },
        {
            playerId: 11229,
            price: 18
        },
        {
            playerId: 74761,
            price: 11
        },
        {
            playerId: 41229,
            price: 4.5
        },
        {
            playerId: 67905,
            price: 12
        },
        {
            playerId: 65478,
            price: 5.5
        },
        {
            playerId: 74298,
            price: 3.5
        },
        {
            playerId: 9844,
            price: 7.5
        },
        {
            playerId: 5132,
            price: 4.5
        },
        {
            playerId: 69409,
            price: 6.5
        },
        {
            playerId: 10094,
            price: 6.5
        },
        {
            playerId: 70296,
            price: 1.5
        },
    ]

}

const NISHANT: Team = {
    name: "NISHANT",
    auction: [
        {
            playerId: 67540,
            price: 0.5
        },
        {
            playerId: 64721,
            price: 3
        },
        {
            playerId: 63715,
            price: 2.5
        },
        {
            playerId: 93526,
            price: 8.5
        },
        {
            playerId: 63726,
            price: 15
        },
        {
            playerId: 66584,
            price: 17.5
        },
        {
            playerId: 74837,
            price: 8.5
        },
        {
            playerId: 71370,
            price: 5
        },
        {
            playerId: 65430,
            price: 9.5
        },
        {
            playerId: 65160,
            price: 7
        },
        {
            playerId: 69238,
            price: 15
        },
        {
            playerId: 59547,
            price: 5
        },
        {
            playerId: 67516,
            price: 1.5
        },
        {
            playerId: 100564,
            price: 0.5
        },
        {
            playerId: 71366,
            price: 0.5
        },
    ]
}

const JUGAL: Team = {
    name: "JUGAL",
    auction: [
        {
            playerId: 71260,
            price: 0.5
        },
        {
            playerId: 70500,
            price: 4.5
        },
        {
            playerId: 58065,
            price: 1
        },
        {
            playerId: 63719,
            price: 5.5
        },
        {
            playerId: 66438,
            price: 1.5
        },
        {
            playerId: 64727,
            price: 7.5
        },
        {
            playerId: 70746,
            price: 7
        },
        {
            playerId: 64219,
            price: 7.5
        },
        {
            playerId: 64861,
            price: 5.5
        },
        {
            playerId: 69657,
            price: 6.5
        },
        {
            playerId: 65291,
            price: 1.5
        },
        {
            playerId: 64254,
            price: 4.5
        },
        {
            playerId: 12047,
            price: 16.5
        },
        {
            playerId: 64440,
            price: 3.5
        },
        {
            playerId: 63961,
            price: 27
        },
    ],
}

const ADVAY: Team = {
    name: "ADVAY",
    auction: [
        {
            playerId: 58223,
            price: 1.5
        },
        {
            playerId: 65867,
            price: 3
        },
        {
            playerId: 64724,
            price: 4.5
        },
        {
            playerId: 61837,
            price: 15
        },
        {
            playerId: 66953,
            price: 1.5
        },
        {
            playerId: 65687,
            price: 11
        },
        {
            playerId: 67285,
            price: 0.5
        },
        {
            playerId: 10053,
            price: 7
        },
        {
            playerId: 62576,
            price: 12
        },
        {
            playerId: 67469,
            price: 11
        },
        {
            playerId: 94786,
            price: 0.5
        },
        {
            playerId: 70761,
            price: 19.5
        },
        {
            playerId: 65702,
            price: 1
        },
        {
            playerId: 67778,
            price: 5
        },
        {
            playerId: 70324,
            price: 2
        },
    ]

}

const CHAITANYA: Team = {
    name: "CHAITANYA",
    auction: [
        {
            playerId: 67589,
            price: 1
        },
        {
            playerId: 66053,
            price: 12
        },
        {
            playerId: 4255,
            price: 4
        },
        {
            playerId: 60122,
            price: 13
        },
        {
            playerId: 11803,
            price: 10
        },
        {
            playerId: 65632,
            price: 9
        },
        {
            playerId: 71288,
            price: 10.5
        },
        {
            playerId: 66799,
            price: 18
        },
        {
            playerId: 67402,
            price: 7
        },
        {
            playerId: 88352,
            price: 2
        },
        {
            playerId: 90501,
            price: 1
        },
        {
            playerId: 66807,
            price: 1
        },
        {
            playerId: 61738,
            price: 0.5
        },
        {
            playerId: 67910,
            price: 1
        },
        {
            playerId: 69659,
            price: 10
        },
    ]
}

const SAAHIL: Team = {
    name: "SAAHIL",
    auction: [
        {
            playerId: 65799,
            price: 7.5
        },
        {
            playerId: 58913,
            price: 4
        },
        {
            playerId: 10116,
            price: 5
        },
        {
            playerId: 69274,
            price: 6.5
        },
        {
            playerId: 65756,
            price: 14
        },
        {
            playerId: 65027,
            price: 8
        },
        {
            playerId: 65584,
            price: 9.5
        },
        {
            playerId: 63649,
            price: 8
        },
        {
            playerId: 65748,
            price: 18
        },
        {
            playerId: 28035,
            price: 4.5
        },
        {
            playerId: 68176,
            price: 3
        },
        {
            playerId: 64511,
            price: 4.5
        },
        {
            playerId: 65295,
            price: 2
        },
        {
            playerId: 4555,
            price: 4.5
        },
        {
            playerId: 63748,
            price: 1
        }
    ]
}

export const Replacements: Record<number, number> = {
    // CSK
    66584: 120157, // Ruturaj Gaikwad: Ayush Mhatre

    // RCB
    67589: 10115, // Devdutt Padikkal: Mayank Agarwal

    // Replacements due to rescheduling

    // PBKS
    10085: 81813, // Glenn Maxwell: Mitchell Owen
    63719: 63865, // Lockie Ferguson: Kyle Jamieson

    // RCB
    85736: 63867, // Jacob Bethell: Tim Seifert

    // MI
    66927: 19394, // Will Jacks: Jonny Bairstow
    64941: 65630, // Ryan Rickelton: Richard Gleeson

    // GT
    9782: 63882, // Jos Buttler: Kusal Mendis

    // LSG
    90501: 74400, // Mayank Yadav: Will O' Rourke

    // DC
    70746: 63881, // Jake Fraser-McGurk: Mustafizur Rehman
};

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