import { Box, Collapse, Flex, IconButton, Image, Link, Text, Popover, PopoverContent, PopoverTrigger, Stack, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";

import Logo from '../Images/Logo.svg';
import { CardTitle } from "./Typography";

import { NAV_ITEMS } from "./NavItems";

export default function Navigation() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box as='header'>
      <Flex
        flex={{base: 1, md: 'auto'}}
        minH={{base: '', md: '140px'}}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align='center'
        as='nav'
      >
        <Flex
          // flex={{ base: 1, md: 'auto' }}
          ml={{ base: 0 }}
          display={{ base: 'flex', lg: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant='ghost'
            aria-label='Toggle Navigation'
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify='center' align='center'>
          <Image src={Logo} title="Little Lemon" alt='Little Lemon' h='12' mr={{base: '0', md: '90px'}} />
          <Flex display={{base: 'none', lg: 'flex'}} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} as='nav' animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const location = useLocation();

  return (
    <Stack direction='row' spacing='21px' alignItems='center' gap='21px'>
      {NAV_ITEMS.map((navItem, idx) => {
        const bgColor = navItem.href === location.pathname ? 'primary.yellow' : 'initial';

        return (
          <Box key={idx}>
            <Popover trigger='hover' placement='bottom-start'>
              <PopoverTrigger>
                <Link as={RouterLink} to={navItem.href ?? '#'} aria-current={navItem.href === location.pathname}>
                  <Flex alignItems='center' p={2}  backgroundColor={bgColor}>
                    <CardTitle>{navItem.label}</CardTitle>
                  </Flex>
                </Link>
              </PopoverTrigger>
              {navItem.children && (
                <PopoverContent border={0} boxShadow='xl' p={4} rounded='xl' minW='sm'>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
}

const DesktopSubNav = ({ label, href, subLabel, icon }) => {

  return (
    <Link
      as={RouterLink}
      to={href}
      role={'group'}
    >
      <Stack direction={'row'} align={'center'} mb={4} p={2} _groupHover={{ bg: 'orange.100'}}>
        <Box
          alignItems='center'
        >
          <Flex
            direction='row'
            alignItems='center'
            transition={'all .2s ease'}
            fontSize='sm'
          >
            {label}
          </Flex>
          {subLabel && <Text fontSize={'sm'}>{subLabel}</Text>}
        </Box>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      p={4}
      display={{ lg: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <CardTitle>
          {label}
        </CardTitle>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link
                as={RouterLink} 
                key={child.label} 
                to={child.href}
                // py={2} 
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
