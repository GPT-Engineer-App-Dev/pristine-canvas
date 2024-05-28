import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, isLoading, isError } = useEvents();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Events</Text>
        {isLoading && <Spinner />}
        {isError && (
          <Alert status="error">
            <AlertIcon />
            There was an error fetching the events.
          </Alert>
        )}
        {!isLoading && !isError && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Venue ID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((event) => (
                <Tr key={event.id}>
                  <Td>{event.name}</Td>
                  <Td>{event.date}</Td>
                  <Td>{event.description}</Td>
                  <Td>{event.venue_id}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Container>
  );
};

export default Index;