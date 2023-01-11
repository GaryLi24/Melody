import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import {
  useGetTopSongsQuery,
  useGetTopArtistsQuery,
} from '../redux/services/neteaseCore'

import 'swiper/css'
import 'swiper/css/free-mode'
import Loader from './Loader'

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}. </h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.album?.blurPicUrl}
        alt={song.name}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-xl font-bold text-white">{song?.name}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0]?.id}`}>
          <p className="text-base text-gray-300 mt-1">
            {song?.artists[0]?.name}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    ></PlayPause>
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying, areaId } = useSelector(state => state.player)
  const { data, isFetching: isFetchingTopSongs } = useGetTopSongsQuery(areaId)
  const { data: artistsList, isFetching: isFetchingTopArtists } =
    useGetTopArtistsQuery()
  const divRef = useRef(null)

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  const topPlays = data?.data.slice(0, 5)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  // if (isFetchingTopSongs || isFetchingTopArtists) return <Loader />
  return (
    <div
      ref={divRef}
      className="x:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        {!isFetchingTopSongs && (
          <div>
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-white font-bold text-2xl">歌曲排行</h2>
              <Link to="/top-charts">
                <p className="text-gray-300 text-base cursor-pointer">更多</p>
              </Link>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              {topPlays?.map((song, i) => (
                <TopChartCard
                  song={song}
                  i={i}
                  key={song.id}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={() => handlePlayClick(song, i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col mt-8">
        {!isFetchingTopArtists && (
          <div>
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-white font-bold text-2xl">热门歌手</h2>
              <Link to="/top-artists">
                <p className="text-gray-300 text-base cursor-pointer">更多</p>
              </Link>
            </div>

            <Swiper
              slidesPerView={'auto'}
              spaceBetween={15}
              freeMode
              centeredSlides
              centeredSlidesBounds
              modules={[FreeMode]}
              className="mt-4"
            >
              {artistsList?.list?.artists.slice(0, 5).map((artist, i) => (
                <SwiperSlide
                  key={artist?.id}
                  style={{ width: '25%', height: 'auto' }}
                  className="shadow-lg rounded-full animate-slideright"
                >
                  <Link to={`/artists/${artist.id}`}>
                    <img
                      className="rounded-full w-full object-cover"
                      width={375}
                      height={375}
                      src={artist.img1v1Url}
                      alt=""
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopPlay
