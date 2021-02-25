import { Text } from '@chakra-ui/react';

const footerSyle = {
  backgroundColor: '#d1f1ff',
  height: '10.5vh',
};
const textStyle = {
  paddingTop: '26px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Footer = () => {
  return (
    <div style={footerSyle}>
      <Text style={textStyle}>
        Built by Gordon Pham-Nguyen, Naasir Jusab, Mackenzie Bellemore, Sujan Saravanamuthu, David
        Liang, Tiffany Zeng, Siu Ye, Karin Kazarian, TianMing Chen
      </Text>
    </div>
  );
};
export default Footer;
