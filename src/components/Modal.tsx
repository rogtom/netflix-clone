import { Dialog, Transition } from '@headlessui/react'
import { FaPlay } from 'react-icons/fa'

import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../../atoms/modalAtom'
import { Genre, Movie, Element } from '../../utils/types'
import ReactPlayer from 'react-player/lazy'

type Props = {}

const Modal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)
  const [addedToList, setAddedToList] = useState(false)

  useEffect(() => {
    // if (!movie) return

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json())
      console.log(data)

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }
    console.log(trailer)
    fetchMovie()
  }, [movie])

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="relative top-0 bottom-0 z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full h-full">
          <div className="relative pt-[56.25%] ">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing={true}
              muted={muted}
            />
            <div className="absolute flex items-center justify-between w-full px-10 -bottom-14 lg:bottom-10">
              <div className="flex space-x-2">
                <button className="flex items-center gap-x-2 rounded bg-white px-4 text-base font-bold text-black transition hover:bg-[#e6e6e6] md:px-8 md:text-xl">
                  <FaPlay className="h-5 text-black md:w-7" />
                  Play
                </button>
                <button className="modalButton">
                  {addedToList ? (
                    <CheckIcon className="h-7 w-7" />
                  ) : (
                    <PlusIcon className="h-7 w-7" />
                  )}
                </button>
                <button className="modalButton">
                  <ThumbUpIcon className="w-6 h-6" />
                </button>
              </div>
              <button className="modalButton" onClick={() => setMuted(!muted)}>
                {muted ? (
                  <VolumeOffIcon className="w-6 h-6" />
                ) : (
                  <VolumeUpIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
          <div className=" flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="mt-8 space-y-6 text-base md:text-lg">
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold text-green-400">
                  {movie!.vote_average * 10}% Match
                </p>
                <p className="font-light">
                  {movie?.release_date || movie?.first_air_date}
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  HD
                </div>
              </div>
              <div className="flex flex-col font-light gap-x-10 gap-y-4 md:flex-row">
                <p className="w-5/6">{movie?.overview}</p>
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">Genres:</span>{' '}
                    {genres.map((genre) => genre.name).join(', ')}
                  </div>

                  <div>
                    <span className="text-[gray]">Original language:</span>{' '}
                    {movie?.original_language}
                  </div>

                  <div>
                    <span className="text-[gray]">Total votes:</span>{' '}
                    {movie?.vote_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(false)}>
            <XIcon className="absolute top-0 right-0 z-50 mt-3 text-white mr-7 h-11 w-11 bg-black/80 md:mt-6 md:mr-14" />
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal
