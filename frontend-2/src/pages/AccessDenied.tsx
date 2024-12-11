import { useNavigate } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 5 }}>
      <Box
        sx={{
          padding: 2,
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          You do not have permission to access this page. Please check your
          credentials or contact support if you believe this is an error.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={(_event) => navigate("/")}
          sx={{ marginTop: 2 }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default AccessDenied;
