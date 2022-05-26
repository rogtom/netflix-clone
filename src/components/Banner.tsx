import { InformationCircleIcon, PlayIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../../atoms/modalAtom'
import { baseUrl } from '../../utils/consts'
import { Movie } from '../../utils/types'

interface IMovie {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: IMovie) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  const imageUrl = `${baseUrl}${movie?.backdrop_path || movie?.poster_path}`

  return (
    <div className="flex flex-col space-y-2  md:h-[65vh] md:justify-end md:space-y-6 ">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <div className="relative w-full h-full">
          <img src={imageUrl} alt={movie?.title} />
          {/* <Image
            src={imageUrl}
            alt={movie?.title}
            layout="fill"
            objectFit="cover"
          /> */}
        </div>
      </div>
      <h1 className="text-2xl pt-14 md:pt-0 md:text-4xl lg:text-6xl ">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-md md:text-xl lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-2">
        <button className="text-black bannerButton bg-white/70">
          <PlayIcon className="w-10 h-10 " /> Play
        </button>
        <button className="bannerButton bg-[grey]/70">
          <InformationCircleIcon className="w-10 h-10 text-black" /> More info
        </button>
      </div>
    </div>
  )
}

export default Banner
