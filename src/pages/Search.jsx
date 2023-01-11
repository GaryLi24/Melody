import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetSongsBySearchQuery } from '../redux/services/neteaseCore'
import { Error, Loader, SongCard } from '../components'

const Search = () => {
  const { searchTerm } = useParams()
  const { isPlaying, activeSong, areaId } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm)

  const songsData = data?.result?.songs || []
  if (isFetching) return <Loader />
  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        搜索结果
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songsData?.map((song, i) => (
          <SongCard
            key={song?.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songsData}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Search
