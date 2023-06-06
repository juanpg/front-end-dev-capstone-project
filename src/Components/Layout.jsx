import { Box } from "@chakra-ui/react";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({children, ...rest}) {
  return (
    <Box 
      h='100vh' 
      display='grid'
      gridTemplateRows='auto 1fr auto'
      margin={{base: 'auto', md: '0 auto'}}
    >
      {/* <Box 
        maxW={{base: 'full', lg: '8xl'}}
        margin={{base: 'auto', lg: '0 auto'}}
        display='grid'
        gridTemplateRows='auto 1fr auto'
        height={'full'}
      > */}
        <Navigation />
        <Box 
          p={4} 
          h='full' 
          {...rest}
        >
          {children}
        </Box>
        <Footer />
      {/* </Box> */}
    </Box>
  )
}