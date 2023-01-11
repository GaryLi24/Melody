import React from 'react'
import { useSelector } from 'react-redux'
import { useGetTopSongsQuery } from '../redux/services/neteaseCore'
import { Error, Loader, SongCard } from '../components'

const TopCharts = () => {
  const { isPlaying, activeSong, areaId } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetTopSongsQuery(areaId)

  if (isFetching) return <Loader />
  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        歌曲排行
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data?.map((song, i) => (
          <SongCard
            key={song?.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default TopCharts
