export const MaterialTypes = ['rubber', 'aluminum', 'steel', 'copper', 'plastic', 'leather'];

export type materialTypes = typeof MaterialTypes[number];

type MaterialCost = {
  // eslint-disable-next-line no-unused-vars
  [index in materialTypes]: Record<string, number>;
};

export const materialCost: MaterialCost = {
  rubber: {
    cost: 2,
  },
  aluminum: {
    cost: 1,
  },
  steel: {
    cost: 1,
  },
  copper: {
    cost: 3,
  },
  plastic: {
    cost: 0.5,
  },
  leather: {
    cost: 4,
  },
};
