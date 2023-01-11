import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import { useGetTopSongsQuery } from '../redux/services/neteaseCore'
import { selectAreaId } from '../redux/features/playerSlice'

const Discover = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying, areaId } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetTopSongsQuery(areaId)

  if (isFetching) return <Loader />

  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-10">
        <h2 className="font-bold text-3xl text-white text-left">新歌速递</h2>
        <select
          onChange={e => dispatch(selectAreaId(e.target.value))}
          value={areaId}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 cursor-pointer"
        >
          {genres.map(genre => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data?.slice(0, 50).map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            data={data.data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Discover
