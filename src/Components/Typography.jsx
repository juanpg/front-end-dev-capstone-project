import { Heading, Text, chakra } from "@chakra-ui/react"

function DisplayTitle({children, ...rest}) {
  return (
    <Heading
      as='h1' 
      fontFamily='Markazi Text'
      fontWeight='medium'
      fontSize='64px'
      lineHeight='1'
      {...rest}
    >{children}</Heading>
  );
}

function Subtitle({children, ...rest}) {
  return (
    <DisplayTitle
      as='h2'
      fontWeight='normal'
      fontSize='40px'
      {...rest}
    >{children}</DisplayTitle>
  )
}

function LeadText({children, ...rest}) {
  return (
    <chakra.span
      fontFamily='Karla'
      fontWeight='medium'
      fontSize='18px'
      {...rest}
    >{children}</chakra.span>
  );
}

function SectionTitle({children, ...rest}) {
  return (
    <LeadText
      fontSize='20px'
      fontWeight='bolder'
      textTransform='uppercase'
      {...rest}
    >{children}</LeadText>
  )
}

function SectionCategory({children, ...rest}) {
  return (
    <LeadText
      fontSize='16px'
      fontWeight='bolder'
      {...rest}
    >{children}</LeadText>
  );
}

function CardTitle({children, ...rest}) {
  return (
    <LeadText
      fontSize='18px'
      fontWeight='bold'
      {...rest}
    >{children}</LeadText>
  );
}

function ParagraphText({children, ...rest}) {
  return (
    <LeadText
      fontSize='16px'
      fontWeight='normal'
      lineHeight='1.5rem'
      {...rest}
    >{children}</LeadText>
  )
}

function HighlightText({children, ...rest}) {
  return (
    <LeadText
      fontSize='16px'
      fontWeight='medium'
      {...rest}
    >{children}</LeadText>
  )
}

export { DisplayTitle, Subtitle, LeadText, SectionTitle, SectionCategory, CardTitle, ParagraphText, HighlightText }