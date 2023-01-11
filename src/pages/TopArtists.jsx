import React from 'react'
import { useSelector } from 'react-redux'
import { useGetTopArtistsQuery } from '../redux/services/neteaseCore'
import { Error, Loader, ArtistCard } from '../components'

const TopArtists = () => {
  const { isPlaying, activeSong } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetTopArtistsQuery()
  const artistsData = data?.list?.artists.slice(0, 30) || []

  if (isFetching) return <Loader />
  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        热门歌手
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artistsData?.map((artist, i) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  )
}

export default TopArtists
