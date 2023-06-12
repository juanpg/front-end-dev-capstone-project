import { Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom'
import Layout from "../Components/Layout";
import { CardTitle } from "../Components/Typography";

export default function Home() {
  return (
    <Layout>
      <Text>This is the home page. Go to the <Link as={RouterLink} to='/reservations'><CardTitle>Reservations page</CardTitle></Link></Text>
    </Layout>
  )
}