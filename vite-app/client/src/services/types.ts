export interface PageViewDuration {
    userID: string;
    pathURL: string;
    duration: number;
    timestamp: Date;
}

export interface ButtonClick {
    userID: string;
    clicks: Array<Click>;
}

export interface Click {
    buttonId: string;
    pageURL: string;
    timestamp: Date;
}

export interface BrowserInfo {
    userID: string;
    userAgent: string;
    browserName: string;
    browserVersion: string;
    device: string;
    operatingSystem: string;
    timezone: string;
    language: string;
    timestamp: Date;
}

export interface GetAveragePageViewResponse {
    totalObjects: number;
    data: Array<AveragePageViewResponse>;
}

export interface AveragePageViewResponse {
    pageURL: string;
    averageDuration: number;
}

export interface SessionCounts {
    date: string;
    visits: number;
}

export interface GetBrowserStatisticsResponse {
    numberOfSessions: number;
    usersPerLocation: Record<string, number>;
    usersPerBrowserName: Record<string, number>;
    usersPerDevice: Record<string, number>;
    sessionCountsPerDay: Array<SessionCounts>;
}

export interface GetButtonClickResponse {
    totalClicks: number;
    buttonId: string;
}

export interface GetButtonActivityResponse {
    totalObjects: number;
    activity: Array<ButtonActivity>;
}

export interface ButtonActivity {
    date: string;
    activityCount: number;
}