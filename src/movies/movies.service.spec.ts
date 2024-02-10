import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import exp from 'constants';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an arr', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return movie', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['tetst'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie ', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['tetst'],
      });
      const allMovie = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(allMovie.length);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('create a movie', () => {
      const beforeCreat = service.getAll().length;
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['tetst'],
      });
      const afterCreat = service.getAll().length;
      expect(afterCreat).toBeGreaterThan(beforeCreat);
    });
  });

  describe('update', () => {
    it('update a movie', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['tetst'],
      });
      service.pathch(1, { title: 'updatedTitle' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updatedTitle');
    });

    it('should throw 404 error', () => {
      try {
        service.pathch(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
