import { Text, Image, Box, Flex, Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CarouselPage = ({ title, imgSrc }) => {
  return (
    <Box height="80%">
      <Text
        fontSize={{ sm: '8vw', lg: '2vw' }}
        textAlign="center"
        paddingTop="1%"
        marginBottom="40px"
      >
        {title}
      </Text>
      <Flex justifyContent="center">
        <Center>
          <Image src={imgSrc} />
        </Center>
      </Flex>
    </Box>
  );
};

CarouselPage.propTypes = {
  title: PropTypes.string,
  imgSrc: PropTypes.string,
};

export default CarouselPage;
