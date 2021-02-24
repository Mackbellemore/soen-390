const footerSyle = {
  backgroundColor: '#d1f1ff',
  height: '10.5vh',
};
const textStyle = {
  paddingTop: '26px',
  textAlign: 'center',
};

const Footer = () => {
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
