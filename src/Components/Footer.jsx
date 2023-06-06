import { Box, Flex, Grid, GridItem, HStack, Heading, Image, Link, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import LogoVertical from '../Images/LogoVertical.svg';

export default function Footer() {
  return (
    <Flex as='footer' align='center' bg='#495E57' justifyContent='center' py='100px'>
      {/* <HStack spacing='95px' h='230px' color='white'> */}
      <SimpleGrid columns={{ base: 1, md: 4 }} alignItems='start' color='white' spacing='90px'>
        <Box alignItems='center' alignSelf='center'>
          <Image src={LogoVertical} maxH='130px' title='Little Lemon' alt='Little Lemon' />
        </Box>
        <Box>
          <Heading mb='25px' textTransform='uppercase' fontFamily='sectionTitle' fontSize='sectionTitle'>Navigation</Heading>
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
          <Heading mb='25px' textTransform='uppercase' fontFamily='sectionTitle' fontSize='sectionTitle'>Contact</Heading>
          <List>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>Address</ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>Phone Number</ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>Email</ListItem>
          </List>
        </Box>
        <Box>
          <Heading mb='25px' textTransform='uppercase' fontFamily='sectionTitle' fontSize='sectionTitle'>Social Media</Heading>
          <List>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>Facebook</ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>Instagram</ListItem>
            <ListItem mb='13px' fontSize='sectionCategory' fontWeight='sectionCategory'>Yelp</ListItem>
          </List>
        </Box>
      </SimpleGrid>
      {/* </HStack> */}
    </Flex>
  )
}