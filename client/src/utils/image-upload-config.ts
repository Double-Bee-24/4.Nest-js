import { uploadFilmAvatar } from "../services/filmsService";
import { uploadPersonAvatar } from "../services/peopleService";
import { uploadPlanetAvatar } from "../services/planetsService";
import { uploadSpeciesAvatar } from "../services/speciesService";
import { uploadStarshipAvatar } from "../services/starshipsService";
import { uploadVehicleAvatar } from "../services/vehiclesService";

const getImageUploadConfig = () => {
  return {
    people: uploadPersonAvatar,
    planets: uploadPlanetAvatar,
    species: uploadSpeciesAvatar,
    vehicles: uploadVehicleAvatar,
    starships: uploadStarshipAvatar,
    films: uploadFilmAvatar,
  };
};

export { getImageUploadConfig };
