import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../../atoms/modalAtom'
import { thumbnailUrl } from '../../utils/consts'
import { Movie } from '../../utils/types'

interface IMovieThumbnail {
  movie: Movie
}

const MovieThumbnail = ({ movie }: IMovieThumbnail) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  return (
    <div
      onClick={() => {
        setCurrentMovie(movie)
        setIsModalOpen(true)
      }}
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`${thumbnailUrl}${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        layout="fill"
        className="object-cover rounded-sm md:rounded"
      />
    </div>
  )
}

export default MovieThumbnail
function setShowModal(arg0: boolean) {
  throw new Error('Function not implemented.')
}
