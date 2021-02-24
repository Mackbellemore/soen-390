import { background } from '@chakra-ui/react';

const Footer = () => {
  const footerSyle = {
    backgroundColor: '#59ffc5',
    height: '10.5vh',
  };
  const textStyle = {
    paddingTop: '26px',
    textAlign: 'center',
    // position: 'relative',
  };
  return (
    <div style={footerSyle}>
      <p style={textStyle}>
        Built by Gordon Pham-Nguyen, Naasir Jusab, Mackenzie Bellemore, Sujan Saravanamuthu, David
        Liang, Tiffany Zeng, Siu Ye, Karin Kazarian, TianMing Chen
      </p>
    </div>
  );
};
export default Footer;
