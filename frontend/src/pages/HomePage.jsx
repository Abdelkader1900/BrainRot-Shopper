import { Container, SimpleGrid, Text, textDecoration, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
            <Text
                fontSize={"30"}
                fontWeight={"bold"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
                textAlign={"center"}
            >
                Liste de produits
            </Text>

            <SimpleGrid
                columns={{
                    base : 1,
                    md : 2,
                    lg : 3,
                }}
                spacing={10}
                w={'full'}
            >

            </SimpleGrid>

            <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color="gray.500">
                Pas de produit pour le moment 
                <Link to="/create">
                    <br/>
                    <Text as="span" color={"blue.500"} _hover={{textDecoration: "underline"}}>
                        Ajouter un produit
                    </Text>
                </Link>
           </Text>
        </VStack>
    </Container>
  )
}

export default HomePage