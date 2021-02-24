import { Text } from '@chakra-ui/react';
const textStyle = {
  fontSize: 45,
  textAlign: 'center',
  paddingTop: '1%',
  marginBottom: '40px',
};

const imgStyle = {
  height: '400px',
  width: '800px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
};
const carouselStyle = {
  background: '#EDF2F7',
  height: '75vh',
  left: '50%',
};

const CarouselPage = (props) => {
  return (
    <div style={carouselStyle}>
      <div>
        <Text style={textStyle}>{props.title}</Text>
        <svg style={imgStyle}>
          <image href={'/assets/' + props.imgSrc} width="800px" height="400px" />
        </svg>
      </div>
    </div>
  );
};
export default CarouselPage;
