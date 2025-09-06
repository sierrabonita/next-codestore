import { Heading, Link, VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <VStack>
      <Heading size={"3xl"}>next-codestore</Heading>
      <Link href="/pagination">Pagination</Link>
    </VStack>
  );
}
