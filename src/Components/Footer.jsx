import { Box, Flex, Grid, GridItem, HStack, Heading, Image, Link, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import LogoVertical from '../Images/LogoVertical.svg';
import { SectionCategory, SectionTitle } from "./Typography";

export default function Footer() {
  return (
    <Flex as='footer' align='center' bg='#495E57' justifyContent='center' py='40px'>
      {/* <HStack spacing='95px' h='230px' color='white'> */}
      <SimpleGrid columns={{ base: 1, md: 4 }} alignItems='start' color='white' spacing='90px'>
        <Box alignItems='center' alignSelf='center'>
          <Image src={LogoVertical} maxH='130px' title='Little Lemon' alt='Little Lemon' />
        </Box>
        <Box>
          <SectionTitle mb='25px'>Navigation</SectionTitle>
          <List>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>
              <Link as={RouterLink} to='/'>Home</Link>
            </ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>
              <Link as={RouterLink} to='/'>About</Link>
            </ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>
              <Link as={RouterLink} to='/'>Menu</Link>
            </ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>
              <Link as={RouterLink} to='/reservations'>Reservations</Link>
            </ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>
              <Link as={RouterLink} to='/'>Order Online</Link>
            </ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>
              <Link as={RouterLink} to='/'>Login</Link>
            </ListItem>
          </List>
        </Box>
        <Box>
          <SectionTitle mb='25px'>Contact</SectionTitle>
          <List>
            <SectionCategory mb='13px'>Address</SectionCategory>
            <SectionCategory mb='13px'>Phone Number</SectionCategory>
            <SectionCategory mb='13px'>Email</SectionCategory>
          </List>
        </Box>
        <Box>
          <SectionTitle mb='25px'>Social Media</SectionTitle>
          <List>
            <SectionCategory mb='13px'>Facebook</SectionCategory>
            <SectionCategory mb='13px'>Instagram</SectionCategory>
            <SectionCategory mb='13px'>Yelp</SectionCategory>
          </List>
        </Box>
      </SimpleGrid>
      {/* </HStack> */}
    </Flex>
  )
}