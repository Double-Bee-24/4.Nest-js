export interface IRepositoryMap {
  people: Repository<Person>;
  planets: Repository<Planet>;
  vehicles: Repository<Vehicle>;
  starships: Repository<Starship>;
  species: Repository<Species>;
  films: Repository<Film>;
}
