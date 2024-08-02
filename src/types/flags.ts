export function getHomePageSelectedApplicationsFlag(userId: string | null) {
  return `allSelectedWhaleApplicationNames${userId || ""}`;
}

export function getHomePageChatHistoryFlag(userId: string | null) {
    return `allWhaleHomePageChatHistory${userId || ""}`;
}

export function getHomePageReverseStackFlag(userId: string | null) {
    return `allWhaleHomePageReverseStack${userId || ""}`;
}
