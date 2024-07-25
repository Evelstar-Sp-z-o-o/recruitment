import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px auto 20px',
        gap: '15px',
        borderRadius: '20px',
        padding: '5px',
        backgroundColor: 'white',
        boxShadow: '8px 8px 24px 0px rgba(66, 68, 90, 1)',
      }}
    >
      <Typography sx={{ fontSize: '40px', color: '#2b7ad4' }}>QUACKER</Typography>
      <FlutterDashIcon
        sx={{
          fontSize: '40px',
        }}
        color="primary"
      />
    </Box>
  );
};

export default Header;
