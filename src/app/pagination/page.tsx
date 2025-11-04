"use client";

import { Box, Button, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

type Posts = [{ id: string; title: string }];
const PER_PAGE = 10;

export default function PaginationWithAPI() {
  const [posts, setPosts] = useState<Posts>([{ id: "", title: "" }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async (page: number) => {
    setIsLoading(true);

    const start = (page - 1) * PER_PAGE;

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${PER_PAGE}`,
    );

    const data = await response.json();
    setPosts(data);

    // 総件数取得（ヘッダから）
    const total = Number(response.headers.get("x-total-count"));
    setTotalPages(Math.ceil(total / PER_PAGE));

    setIsLoading(false);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [fetchPosts, currentPage]);

  return (
    <>
      <Heading size={"3xl"}>Pagination</Heading>

      <Box p={4}>
        <Text fontWeight="bold" mb={2}>
          Posts (Page {currentPage} / Total {totalPages})
        </Text>

        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <VStack padding={3} align="stretch" mb={4}>
            {posts.map((post) => (
              <Box
                key={post.id}
                p={3}
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.50" }}
              >
                {post.id}. {post.title}
              </Box>
            ))}
          </VStack>
        )}

        {/* Pagination */}
        <HStack padding={2}>
          <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            前へ
          </Button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <Button
                key={String(page)}
                variant={currentPage === page ? "solid" : "outline"}
                colorScheme={currentPage === page ? "blue" : "gray"}
                onClick={() => handlePageChange(page)}
              >
                {String(page)}
              </Button>
            );
          })}

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            次へ
          </Button>
        </HStack>
      </Box>
    </>
  );
}
