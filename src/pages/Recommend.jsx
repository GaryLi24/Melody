import React from 'react'
import { useSelector } from 'react-redux'
import { useGetRecommendedSongsQuery } from '../redux/services/neteaseCore'
import { Error, Loader, SongCard } from '../components'

const Recommend = () => {
  const { isPlaying, activeSong } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetRecommendedSongsQuery()
  const recommendData = data?.result.map(x => x.song)

  if (isFetching) return <Loader />
  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        推荐歌曲
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {recommendData?.map((song, i) => (
          <SongCard
            key={song?.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={recommendData}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Recommend
