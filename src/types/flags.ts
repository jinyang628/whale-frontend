export function getHomePageSelectedApplicationsFlag(userId: string) {
  return `allSelectedWhaleApplicationNames${userId}`;
}

export function getHomePageChatHistoryFlag(userId: string) {
    return `allWhaleHomePageChatHistory${userId}`;
}

export function getHomePageReverseStackFlag(userId: string) {
    return `allWhaleHomePageReverseStack${userId}`;
}

export function getUsageFlag() {
    return "allWhaleUsage";
}

export function getDefaultApplicationRemovedFlag() {
    return "whaleDefaultApplicationRemoved";
}