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

const CORS_PROXY_CORSLOL = "https://api.cors.lol/?url=";
const CORS_PROXY_CODETABS = "https://api.codetabs.com/v1/proxy/?quest=";
const FANTASY_POINTS_URL = "https://fantasy.iplt20.com/classic/api/feed/gamedayplayers?tourgamedayId=";

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
    const res = await handleFetchProxy(FANTASY_POINTS_URL + tourgamedayId, 1);
    const json = await res.json();

    if (!json.Data) return null;

    const points: FantasyPlayerObject[] = json.Data.Value.Players;
    return points;
}

const MATCHES_URL = "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/2025-matchlinks.js";

const KEY_TOURGAMEDAYID = "tourgamedayId";
const KEY_MATCHSMID = "smId";

interface MatchLinkObject {
    smId: number;
    highlights: string;
    report: string;
}

async function fetchMatchCount(): Promise<number> {

    const res = await handleFetchProxy(MATCHES_URL, 1);
    const text = await res.text();
    const jsonString = text.slice(13, -2);
    const jsonDump: MatchLinkObject[] = JSON.parse(jsonString);
    const json = jsonDump.filter((x) => x.smId !== 1973); // Abandoned match

    const matchCount = json.length;

    localStorage.setItem(KEY_TOURGAMEDAYID, matchCount.toString());
    localStorage.setItem(KEY_MATCHSMID, json[matchCount - 1].smId.toString());

    return matchCount;
}

export function getLatestMatchNumber() {
    return localStorage.getItem(KEY_TOURGAMEDAYID);
}

export function getLatestMatchLink() {
    const MATCH_CENTER_URL = "https://www.iplt20.com/match/2025/";
    const smId = localStorage.getItem(KEY_MATCHSMID);
    return MATCH_CENTER_URL + smId;
}

async function handleFetchProxy(url: string, proxy: number): Promise<Response> {
    try {
        const uri = getProxy(proxy) + url;
        const res = await fetch(uri);
        return res;
    }  catch {
        return handleFetchProxy(url, proxy + 1);
    }
}

function getProxy(index: number): string {
    if(index === 1) return CORS_PROXY_CODETABS;
    else if (index === 2 ) return CORS_PROXY_CORSLOL;
    else return "";
}