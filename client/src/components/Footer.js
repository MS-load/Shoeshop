import React from 'react'
import { Box, Footer, Text, Anchor, } from 'grommet';
import { Instagram, FacebookOption, Twitter } from 'grommet-icons';

const Media = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <Anchor
      a11yTitle="Share feedback on Instagram"
      href="https://www.instagram.com/"
      icon={<Instagram color="light-1" />}
    />
    <Anchor
      a11yTitle="Chat with us on Facebook"
      href="https://www.facebook.com/"
      icon={<FacebookOption color="light-1" />}
    />
    <Anchor
      a11yTitle="Follow us on Twitter"
      href="https://twitter.com/"
      icon={<Twitter color="light-1" />}
    />
  </Box>
);

export default function FooterSection() {
  return (
      <Footer
        background="brand"
        pad={{ horizontal: "large", vertical: "small" }}
      >
        <Box direction="row" gap="small">
        <Text size='large' weight='bold' margin='small'>
         Shoe<Text color='accent-1' size='large' weight='bold'>Byte</Text>
        </Text>
        </Box>
        <Media />
        <Text textAlign="center" size="small">
          © 2020 Copyright Group D
          </Text>
      </Footer>
  );
};