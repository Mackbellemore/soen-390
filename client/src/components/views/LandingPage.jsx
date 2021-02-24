import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import CarouselPage from '../CarouselPage.jsx';
import { carouselContent } from '../../constants';
import Footer from '../Footer.jsx';
import Login from './Login.jsx';
const LandingPage = () => {
  const carouselStyle = {
    position: 'relative',
    zIndex: -1,
  };

  const loginStyle = {
    // position: 'absolute',
    // marginLeft: '60%'
  };

  return (
    <div>
      <Carousel autoplay style={carouselStyle}>
        {carouselContent.map((item) => {
          return <CarouselPage key={item.title} title={item.title} imgSrc={item.imgName} />;
        })}
      </Carousel>

      <Login style={loginStyle} />
      <Footer />
    </div>
  );
};
export default LandingPage;
