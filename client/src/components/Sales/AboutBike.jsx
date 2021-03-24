import { Heading, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getOneBike } from 'utils/api/bikes.js';

const AboutBike = ({ bikeId }) => {
  const { data, isSuccess } = useQuery(`bikes/${bikeId}`, () => getOneBike(bikeId));

  return (
    <>
      {isSuccess && (
        <>
          <Heading size="md" m={3}>
            About the bike
          </Heading>
          <Text>Name: {data.data.name}</Text>
          <Text>Description: {data.data.description}</Text>
          <Text>Weight: {data.data.weight} kg</Text>
          <Text>Color: {data.data.color}</Text>
          <Text>Cost price: {data.data.costPrice}$</Text>
          <Text>Selling price: {data.data.sellingPrice}$</Text>
          <Text>Stock left: {data.data.stock}</Text>
        </>
      )}
    </>
  );
};

AboutBike.propTypes = {
  bikeId: PropTypes.string.isRequired,
};

export default AboutBike;
