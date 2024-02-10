import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { NotFoundError } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`cannot find movie by id:${id}`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  pathch(id: number, updateMovieData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    console.log('movie: ', movie, '{...movie}', { ...movie });
    console.log('updateMovieData: ', updateMovieData, '{...updateMovieData}', {
      ...updateMovieData,
    });
    console.log('{..movie,...updateMovieData}', {
      ...movie,
      ...updateMovieData,
    });

    console.log('revers{..movie,...updateMovieData}', {
      ...updateMovieData,
      ...movie,
    });

    this.movies.push({ ...movie, ...updateMovieData });
  }
}
