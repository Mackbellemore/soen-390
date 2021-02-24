import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import CarouselPage from '../CarouselPage.jsx';
import { carouselContent } from '../../constants';
import Footer from '../Footer.jsx';

const LandingPage = () => {
  return (
    <div>
      <Carousel autoplay>
        {carouselContent.map((item) => {
          return <CarouselPage key={item.title} title={item.title} imgSrc={item.imgName} />;
        })}
      </Carousel>

      <Footer />
    </div>
  );
};
export default LandingPage;
