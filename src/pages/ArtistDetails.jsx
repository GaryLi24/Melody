import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import {
  useGetArtistDetailsQuery,
  useGetArtistSongsQuery,
} from '../redux/services/neteaseCore'
import { setActiveSong, playPause } from '../redux/features/playerSlice'

const ArtistDetails = () => {
  const dispatch = useDispatch()
  const { id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId)
  const { data: artistSongsData } = useGetArtistSongsQuery(artistId)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: artistSongsData, i }))
    dispatch(playPause(true))
  }

  if (isFetchingArtistDetails) return <Loader title="查询中..." />
  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData.data} />

      <RelatedSongs
        data={artistSongsData?.songs}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  )
}

export default ArtistDetails
