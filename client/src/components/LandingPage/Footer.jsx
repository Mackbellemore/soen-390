import { Text, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const BottomFooter = styled(Box)`
  background-color: #d1f1ff;
  width: 100%;
`;

const FooterText = styled(Text)`
  padding: 26px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <BottomFooter>
      <FooterText>
        Built by Gordon Pham-Nguyen, Naasir Jusab, Mackenzie Bellemore, Sujan Saravanamuthu, David
        Liang, Tiffany Zeng, Siu Ye, Karin Kazarian, TianMing Chen
      </FooterText>
    </BottomFooter>
  );
};

export default Footer;
