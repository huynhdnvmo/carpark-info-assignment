export type JobCarParkData = {
  car_park_no: string;
  address: string;
  x_coord: string;
  y_coord: string;
  car_park_type: string;
  type_of_parking_system: string;
  short_term_parking: string;
  free_parking: string;
  night_parking: 'YES' | 'NO';
  car_park_decks: string; // number
  gantry_height: string; // float
  car_park_basement: 'Y' | 'N';
};
