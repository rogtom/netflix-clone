import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import { Movie } from '../../utils/types'
import MovieThumbnail from './MovieThumbnail'

interface IRow {
  movies: Movie[]
  title: string
}

const Row = ({ title, movies }: IRow) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isScroled, setIsScroled] = useState(false)

  function handleClick(direction: string): void {
    setIsScroled(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }
  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    if (e.currentTarget.scrollLeft === 0) {
      setIsScroled(false)
    } else if (e.currentTarget.scrollLeft > 0) {
      setIsScroled(true)
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl ">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`rowIcons left-2  ${!isScroled && 'hidden'}`}
          onClick={() => handleClick('left')}
        />
        <div
          onScroll={handleScroll}
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <MovieThumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="rowIcons right-2"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Row
