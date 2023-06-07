import { Box, Stack, Heading, Text, Icon, HStack, Flex } from "@chakra-ui/react";
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
  
  return (
    <HStack flex={stepIndex < stepCount-1 ? 1 : 'initial'}>
      {stepIndex < activeStep
        ? ( 
          <Icon 
            boxSize='32px' 
            borderColor='black' 
            as={BsFillCheckCircleFill}
            color='primary.green' 
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
      transform={{ base: '', md: 'translateY(-50%)'}}
      px='5px'
      justifyContent='space-between'
      gap='35px'
      direction={{ base: 'column', md: 'row' }}
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