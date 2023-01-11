import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { setActiveSong, playPause } from '../redux/features/playerSlice'
import {
  useGetSongDetailsQuery,
  useGetSongLyricsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/neteaseCore'

const SongDetails = () => {
  const dispatch = useDispatch()
  const { songId } = useParams()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songId)
  const { data: songLyrics, isFetching: isFetchingSongLyrics } =
    useGetSongLyricsQuery(songId)
  const {
    data: songRelatedData,
    isFetching: isFetchingSongRelated,
    error,
  } = useGetSongRelatedQuery(songId)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: songRelatedData.songs, i }))
    dispatch(playPause(true))
  }

  if (isFetchingSongDetails || isFetchingSongRelated)
    return <Loader title="查询中..." />
  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={songData?.songs[0]?.ar[0].id}
        songData={songData}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">lyriks:</h2>

        <div className="mt-5">
          {songLyrics?.lrc?.lyric ? (
            songLyrics?.lrc?.lyric
              .replace(/\[(\S*)\]/g, '#')
              .split('#')
              .map((line, index) => (
                <p className="text-gray-400 text-base my-1" key={index}>
                  {line}
                </p>
              ))
          ) : (
            <p className="text-gray-400 text-base my-1">暂无歌词</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={songRelatedData.data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={songData?.songs[0]?.ar[0].id}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  )
}

export default SongDetails
