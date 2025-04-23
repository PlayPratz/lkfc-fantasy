export interface FantasyPlayerObject {
    CapSelectedPer: number
    GamedayPoints: number
    IS_FP: string
    Id: number
    IsActive: number
    IsAnnounced: string
    Name: string
    OverallPoints: number
    PlayerDesc: string
    PlyrGamedayId: number
    ProfileUrl: string
    SelectedPer: number
    ShortName: string
    SkillId: number
    SkillName: string
    TeamId: number
    TeamName: string
    TeamShortName: string
    VCapSelectedPer: number
    Value: number
    inCAPPlayer: string
    isImpactPlayer: number
    isInjured: string
    isUnCap: number
}

export type FantasyPlayers = Record<number, FantasyPlayerObject>;

const FANTASY_POINTS_URL = "https://api.codetabs.com/v1/proxy/?quest=https://fantasy.iplt20.com/classic/api/feed/gamedayplayers?tourgamedayId=";

const KEY_TOURGAMEDAYID = "tourgamedayId";

export async function fetchLatestPoints(): Promise<FantasyPlayers> {
    const start = await fetchMatchCount();;
    const points = await fetchPointsInner(start);

    if (!points) {
        throw "Error fetching points!";
    }

    const players: FantasyPlayers = {};
    for (const p of points) {
        players[p.Id] = p; // I couldn't figure out how to do it with .map() :-\
    }

    return players;
}

// async function fetchPoints(tourgamedayId: number, previous: FantasyPlayerObject[]): Promise<FantasyPlayerObject[]> {
//     const points = await fetchPointsInner(tourgamedayId);
//     if (points) {
//         localStorage.setItem(KEY_TOURGAMEDAYID, tourgamedayId.toString());
//         return fetchPoints(tourgamedayId + 1, points);
//     } else {
//         return previous;
//     }
// }

async function fetchPointsInner(tourgamedayId: number): Promise<FantasyPlayerObject[] | null> {
    const res = await fetch(FANTASY_POINTS_URL + tourgamedayId);
    const json = await res.json();

    if (!json.Data) return null;

    const points: FantasyPlayerObject[] = json.Data.Value.Players;
    return points;
}

const MATCHES_URL = "https://api.codetabs.com/v1/proxy/?quest=https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/2025-matchlinks.js";

async function fetchMatchCount(): Promise<number> {
    const res = await fetch(MATCHES_URL);
    const text = await res.text();
    const jsonString = text.slice(13, -2);
    const json: Object[] = JSON.parse(jsonString);

    const matchCount = json.length;
    localStorage.setItem(KEY_TOURGAMEDAYID, matchCount.toString());

    return matchCount;
}

export function getLocalMatchCount() {
    return localStorage.getItem(KEY_TOURGAMEDAYID);
}