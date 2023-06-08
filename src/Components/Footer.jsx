import { Box, Flex, Grid, GridItem, HStack, Heading, Image, Link, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import LogoVertical from '../Images/LogoVertical.svg';
import { SectionCategory, SectionTitle } from "./Typography";

import { NAV_ITEMS } from "./NavItems";

export default function Footer() {
  return (
    <Flex as='footer' align='center' bg='#495E57' justifyContent='center' py='40px'>
      <SimpleGrid columns={{ base: 1, md: 4 }} alignItems='start' color='white' spacing={{ base: '40px', md: '90px'}}>
        <Box alignItems='center' alignSelf='center'>
          <Image src={LogoVertical} maxH={{base: '80px', md: '130px'}} title='Little Lemon' alt='Little Lemon' />
        </Box>
        <Box as='nav' aria-label='Website navigation'>
          <SectionTitle display='block' mb='25px'>Navigation</SectionTitle>
          <List>
            {NAV_ITEMS.map(menu => (
              <ListItem key={menu.label} mb='13px'>
                <Link as={RouterLink} to={menu.href}><SectionCategory>{menu.label}</SectionCategory></Link>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box aria-label="Contact links">
          <SectionTitle display='block' mb='25px'>Contact</SectionTitle>
          <List>
            <SectionCategory display='block' mb='13px'>Address</SectionCategory>
            <SectionCategory display='block' mb='13px'>Phone Number</SectionCategory>
            <SectionCategory display='block' mb='13px'>Email</SectionCategory>
          </List>
        </Box>
        <Box as='nav' aria-label="Social Media links">
          <SectionTitle display='block' mb='25px'>Social Media</SectionTitle>
          <List>
            <SectionCategory display='block' mb='13px'>Facebook</SectionCategory>
            <SectionCategory display='block' mb='13px'>Instagram</SectionCategory>
            <SectionCategory display='block' mb='13px'>Yelp</SectionCategory>
          </List>
        </Box>
      </SimpleGrid>
    </Flex>
  )
}