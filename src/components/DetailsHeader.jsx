import { Link } from 'react-router-dom'

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const pic = songData?.songs[0]?.al?.picUrl || artistData?.user?.avatarUrl
  const songName = songData?.songs[0]?.name

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h28"></div>
      <div className="absolute inset-0 flex items-center">
        <img
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          src={pic}
          alt=""
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {songName || artistData?.artist?.name}
          </p>
          {artistId && (
            <Link to={`/artists/${songData?.songs[0].ar[0]?.id}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.songs[0].ar[0]?.name}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistData && artistData?.identify?.imageDesc}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24"></div>
    </div>
  )
}

export default DetailsHeader
