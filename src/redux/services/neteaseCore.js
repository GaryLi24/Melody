import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const proxy = 'http://185.187.241.50/proxy.pac'

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
      query: id => `/top/song${id ? `?type=${id}` : ''}?proxy=${proxy}`,
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
    // getTopSongs: builder.query({
    //   query: () => `/toplist/artist`,
    // }),
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
// discover新歌速递  top/song
// 推荐音乐 /personalized/newsong
// 歌手榜 /toplist/artist
// 热歌榜 /playlist/detail?id=3778678
