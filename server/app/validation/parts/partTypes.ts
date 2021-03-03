import { partType } from './../../entities/Part';

type PartMaterials = {
  // eslint-disable-next-line no-unused-vars
  [index in partType]: Record<string, unknown>;
};

export const partTypeMaterials: PartMaterials = {
  handle_bar: {
    rubber: 2,
    aluminum: 2,
  },
  brakes: {
    rubber: 2,
    aluminum: 2,
  },
  chain: {
    steel: 2,
    aluminum: 2,
  },
  fork: {
    steel: 3,
    aluminum: 3,
  },
  frame: {
    steel: 3,
    plastic: 2,
    aluminum: 4,
    copper: 1,
  },
  pedal: {
    rubber: 1,
    aluminum: 1,
    plastic: 3,
  },
  seat: {
    rubber: 2,
    leather: 2,
    plastic: 1,
  },
  wheels: {
    steel: 1,
    rubber: 3,
    aluminum: 1,
    plastic: 1,
  },
};
