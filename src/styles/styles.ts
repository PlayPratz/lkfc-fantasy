

export function getGrowthClass(rankGrowth: number): string {
    if (rankGrowth < 0) return "text-error";
    if (rankGrowth > 0) return "text-success";
    return "text-grey";
}

export function getGrowthSign(rankGrowth: number): string {
    if (rankGrowth < 0) return '';
    if (rankGrowth > 0) return '+';
    return '';
}

