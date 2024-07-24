import Container from '@mui/material/Container';

const Footer = () => {
  const StyledFooter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: '2rem',
  };

  return (
    <Container component="footer" className="footer" sx={StyledFooter}>
      TWIXER
    </Container>
  );
};

export default Footer;
