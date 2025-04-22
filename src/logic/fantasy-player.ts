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


export async function fetchLatestPoints(): Promise<FantasyPlayers> {
    const start = parseInt(localStorage.getItem("tourgamedayId") ?? "38");
    const points = await fetchPoints(start, []);

    const players: FantasyPlayers = {};
    for (const p of points) {
        players[p.Id] = p; // I couldn't figure out how to do it with .map() :-\
    }

    return players;
}

async function fetchPoints(tourgamedayId: number, previous: FantasyPlayerObject[]): Promise<FantasyPlayerObject[]> {
    const points = await fetchPointsInner(tourgamedayId);
    if (points) {
        localStorage.setItem("tourgamedayId", tourgamedayId.toString());
        return fetchPoints(tourgamedayId + 1, points);
    } else {
        return previous;
    }
}

async function fetchPointsInner(tourgamedayId: number): Promise<FantasyPlayerObject[]> {
    const res = await fetch(FANTASY_POINTS_URL + tourgamedayId);
    const json = await res.json();
    const points: FantasyPlayerObject[] = json.Data.Value.Players;
    return points;
}