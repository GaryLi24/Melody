import SongBar from './SongBar'

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  artistId,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">相关歌曲:</h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.slice(0, 20).map((song, i) => (
          <SongBar
            key={`${song.id}-${i}`}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            artistId={artistId}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedSongs
