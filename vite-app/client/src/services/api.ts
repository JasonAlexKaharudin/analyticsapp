import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetAveragePageViewResponse, GetBrowserStatisticsResponse, GetButtonClickResponse, GetButtonActivityResponse } from './types';

const baseURL: string = 'api/analytics';

export const analyticsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    
    reducerPath: "main",
    tagTypes: ['PageView', 'ButtonClickStats', 'ButtonClickActivity', 'BrowserStats'],
    endpoints: (build) => ({
        getAveragePageView: build.query<GetAveragePageViewResponse, void>({
            query: () => `${baseURL}/average-page-views`,
            providesTags: ["PageView"]
        }),
        getButtonClick: build.query<Array<GetButtonClickResponse>, void>({
            query: () => `${baseURL}/button-clicks-stats`,
            providesTags: ["ButtonClickStats"]
        }),
        getButtonActivity: build.query<Array<GetButtonActivityResponse>, void>({
            query: () => `${baseURL}/button-clicks-activity`,
            providesTags: ["ButtonClickActivity"]
        }),
        getBrowserStats: build.query<GetBrowserStatisticsResponse, void>({
            query: () => `${baseURL}/browser-statistics`,
            providesTags: ["BrowserStats"]
        }),
    })
})

export const { useGetAveragePageViewQuery, useGetButtonClickQuery, useGetButtonActivityQuery, useGetBrowserStatsQuery } = analyticsApi;