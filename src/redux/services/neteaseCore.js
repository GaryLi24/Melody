import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const neteaseCoreApi = createApi({
  reducerPath: 'neteaseCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://music-api-two-beta.vercel.app',
    prepareHeaders: headers => {
      return headers
    },
  }),
  endpoints: builder => ({
    getTopSongs: builder.query({
      query: id => `/top/song${id ? `?type=${id}` : ''}`,
    }),
    getTopArtists: builder.query({ query: () => '/toplist/artist' }),
    getSongDetails: builder.query({
      query: songId => `/song/detail?ids=${songId}`,
    }),
    getSongLyrics: builder.query({
      query: songId => `/lyric?id=${songId}`,
    }),
    getSongRelated: builder.query({
      query: songId => `/simi/song?id=${songId}`,
    }),
    getArtistDetails: builder.query({
      query: artistId => `/artist/detail?id=${artistId}`,
    }),
    getArtistSongs: builder.query({
      query: artistId => `/artist/top/song?id=${artistId}`,
    }),
    getRecommendedSongs: builder.query({
      query: () => '/personalized/newsong',
    }),
    getSongsBySearch: builder.query({
      query: keyword => `/search?keywords=${keyword}`,
    }),
  }),
})

export const {
  useGetTopSongsQuery,
  useGetTopArtistsQuery,
  useGetSongDetailsQuery,
  useGetSongLyricsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetArtistSongsQuery,
  useGetRecommendedSongsQuery,
  useGetSongsBySearchQuery,
} = neteaseCoreApi
