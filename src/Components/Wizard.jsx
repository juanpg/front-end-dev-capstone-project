import { Box, Stack, Icon, HStack, Flex, useMediaQuery } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { 
  BsFill1CircleFill, 
  BsFill2CircleFill,
  BsFill3CircleFill,
  BsFill4CircleFill,
  BsFill5CircleFill,
  BsFill6CircleFill,
  BsFill7CircleFill,
  BsFill8CircleFill,
  BsFill9CircleFill,
} from 'react-icons/bs';
import { SectionCategory, SectionTitle } from "./Typography";

const icons = {
  1: BsFill1CircleFill,
  2: BsFill2CircleFill,
  3: BsFill3CircleFill,
  4: BsFill4CircleFill,
  5: BsFill5CircleFill,
  6: BsFill6CircleFill,
  7: BsFill7CircleFill,
  8: BsFill8CircleFill,
  9: BsFill9CircleFill,
}

const WizardStep = ({ step, stepIndex, activeStep, stepCount }) => {
  const [isLarge] = useMediaQuery('(min-width: 48em)');
  const title =`Step ${stepIndex+1} - ${ stepIndex === activeStep ? 'Current' : stepIndex < activeStep ? "Complete" : "Pending" }`;
  
  return (
    <HStack flex={stepIndex < stepCount-1 ? 1 : 'initial'} display={isLarge || stepIndex === activeStep ? 'flex' : 'none'}>
      {stepIndex < activeStep
        ? ( 
          <Icon 
            boxSize='32px' 
            borderColor='black' 
            as={BsFillCheckCircleFill}
            color='primary.green' 
            aria-label={title}
            title={title}
            role='status'
          /> 
        ) : (
          <Flex 
            flexShrink='0' 
            w='32px' 
            h='32px' 
            borderRadius='50%' 
            color={stepIndex === activeStep ? 'black' : 'white'} 
            bg={stepIndex === activeStep ? 'primary.yellow' : 'primary.green'} 
            justifyContent='center' 
            alignItems='center'
            aria-label={title}
            title={title}
            role="status"
          >
            <SectionTitle>{stepIndex + 1}</SectionTitle>
          </Flex>
        )}
      <Box flexShrink='0'>
        <SectionTitle mb='0' display='block'>{step.title}</SectionTitle>
        <SectionCategory display='block'>{step.description}</SectionCategory>
      </Box>
      {stepIndex < stepCount-1 && <WizardSeparator />}
    </HStack>
  )
}

const WizardSeparator = () => {
  return (
    <Box h='1px' w='100%' bg='secondary.darkGray' display={{ base: 'none', md: 'block' }}></Box>
  )
}

export default function Wizard({ steps, activeStep, ...rest }) {
  return (
    <Stack 
      position='relative' 
      bg='white' 
      transform={{ base: 'translateY(-50%)', md: 'translateY(-50%)'}}
      px='5px'
      justifyContent='space-between'
      gap='35px'
      direction={{ base: 'row', md: 'row' }}
      {...rest}
    >
      {steps.map((step, idx) => (
        <WizardStep 
          key={idx} 
          stepIndex={idx} 
          step={step} 
          activeStep={activeStep} 
          stepCount={steps.length} 
        />
      ))}
    </Stack>
  )
}