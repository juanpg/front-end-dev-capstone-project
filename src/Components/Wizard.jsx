import { Box, Stack, Heading, Text, Icon, HStack } from "@chakra-ui/react";
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

const WizardStep = ({ step, stepIndex, currentStep, stepCount }) => {
  
  return (
    <HStack flex={stepIndex < stepCount-1 ? 1 : 'initial'}>
      <Icon 
        boxSize='32px' 
        borderColor='primary.green' 
        as={stepIndex < currentStep ? BsFillCheckCircleFill : icons[stepIndex+1] }
      />
      <Box flexShrink='0'>
        <Heading fontSize='sectionTitle' fontWeight='sectionTitle' textTransform='uppercase' mb='0'>{step.title}</Heading>
        <Text fontSize='sectionCategory' fontWeight='sectionCategory'>{step.description}</Text>
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
      translateY='-50%'
      p='5px'
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