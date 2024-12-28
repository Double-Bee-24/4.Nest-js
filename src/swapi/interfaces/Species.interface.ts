export interface SpeciesResponse {
  properties: {
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    hair_colors: string;
    skin_colors: string;
    eye_colors: string;
    homeworld: string | null;
    language: string;
    people: string[];
    created: string;
    edited: string;
    name: string;
    url: string;
  };
  description: string;
  uid: string;
}
