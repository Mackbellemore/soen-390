import { Image } from 'antd';
const CarouselPage = (props) => {
  const textStyle = {
    fontSize: 50,
    color: '#fff',
    textAlign: 'left',
    marginLeft: '10%',
    paddingTop: '1%',
  };

  const imgStyle = {
    height: '400px',
    width: '800px',
    marginLeft: '10%',
    position: 'relative',
    top: '40px',
  };
  const carouselStyle = {
    background: '#364d79',
    height: '75vh',
  };
  return (
    <div>
      <div style={carouselStyle}>
        <p style={textStyle}>{props.title}</p>
        <svg style={imgStyle}>
          <image href={'/assets/' + props.imgSrc} width="800px" height="400px" />
        </svg>
        {/* <Image style={imgStyle} src={"/assets/"+props.imgSrc}/> */}
      </div>
    </div>
  );
};
export default CarouselPage;
