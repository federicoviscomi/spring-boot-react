import React from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const renderLinksSection = () => (
  <Grid item xs={12} md={4}>
    <Typography variant="h6" gutterBottom>
      Quick Links
    </Typography>
    <Box>
      <Link href="/about" color="inherit" underline="hover" display="block">
        About
      </Link>
      <Link href="/contact" color="inherit" underline="hover" display="block">
        Contact
      </Link>
      <Link href="/services" color="inherit" underline="hover" display="block">
        Services
      </Link>
      <Link href="/privacy" color="inherit" underline="hover" display="block">
        Privacy Policy
      </Link>
    </Box>
  </Grid>
);

const renderCopyrightSection = () => (
  <Box mt={4} textAlign="center">
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Your Company. All rights reserved.
    </Typography>
  </Box>
);

const renderAboutSection = () => (
  <Grid item xs={12} md={4}>
    <Typography variant="h6" gutterBottom>
      About Us
    </Typography>
    <Typography variant="body2">
      We are a company committed to delivering the best products and services.
      Our goal is to provide outstanding experiences to our customers.
    </Typography>
    <Link
      href="/about"
      color="inherit"
      underline="hover"
      sx={{ display: "block", mt: 1 }}
    >
      Learn More About Us
    </Link>
  </Grid>
);

const renderSocialMediaSection = () => (
  <Grid item xs={12} md={4}>
    <Typography variant="h6" gutterBottom>
      Follow Us
    </Typography>
    <Box>
      <IconButton
        href="https://facebook.com"
        color="inherit"
        aria-label="Facebook"
      >
        <Facebook />
      </IconButton>
      <IconButton
        href="https://twitter.com"
        color="inherit"
        aria-label="Twitter"
      >
        <Twitter />
      </IconButton>
      <IconButton
        href="https://instagram.com"
        color="inherit"
        aria-label="Instagram"
      >
        <Instagram />
      </IconButton>
      <IconButton
        href="https://linkedin.com"
        color="inherit"
        aria-label="LinkedIn"
      >
        <LinkedIn />
      </IconButton>
    </Box>
  </Grid>
);

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "primary.main",
      color: "white",
      py: 4,
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {renderAboutSection()}
        {renderLinksSection()}
        {renderSocialMediaSection()}
      </Grid>
      {renderCopyrightSection()}
    </Container>
  </Box>
);

export default Footer;
