import { Text, Image, Box, Flex, Center } from '@chakra-ui/react';

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

export default CarouselPage;
