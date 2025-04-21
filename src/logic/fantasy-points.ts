export interface FantasyPointObject {
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



const FANTASY_POINTS_URL = "https://api.codetabs.com/v1/proxy/?quest=https://fantasy.iplt20.com/classic/api/feed/gamedayplayers?tourgamedayId=";


export async function fetchLatestPoints(): Promise<FantasyPointObject[]> {
    const start = parseInt(localStorage.getItem("tourgamedayId") ?? "1");
    const points = await fetchPoints(start, []);
    return points;
}

async function fetchPoints(tourgamedayId: number, previous: FantasyPointObject[]): Promise<FantasyPointObject[]> {
    const points = await fetchPointsInner(tourgamedayId);
    if (points) {
        localStorage.setItem("tourgamedayId", tourgamedayId.toString());
        return fetchPoints(tourgamedayId + 1, points);
    } else {
        return previous;
    }
}

async function fetchPointsInner(tourgamedayId: number): Promise<FantasyPointObject[]> {
    const res = await fetch(FANTASY_POINTS_URL + tourgamedayId);
    const json = await res.json();
    const points: FantasyPointObject[] = json.Data.Value.Players;
    return points;
}