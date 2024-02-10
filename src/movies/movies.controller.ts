import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  //   @Get('/search')
  //   search(@Query('year') searchngYear: string) {
  //     return `search with title year: ${searchngYear}`;
  //   }

  @Get('/:id')
  getOne(@Param('id') movieID: number): Movie {
    return this.moviesService.getOne(movieID);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieID: number) {
    return this, this.moviesService.deleteOne(movieID);
  }

  @Put('/:id')
  update(@Param('id') movieID: number, @Body() updateBody) {
    return {
      updateBody: updateBody,
      id: movieID,
    };
  }

  @Patch('/:id')
  patch(@Param('id') movieID: number, @Body() updateBody: UpdateMovieDto) {
    return this.moviesService.pathch(movieID, updateBody);
  }
}
