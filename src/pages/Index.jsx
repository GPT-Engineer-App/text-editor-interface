import React, { useState } from "react";
import { Box, Button, Flex, Heading, Textarea, Text, useToast, VStack, HStack, Badge } from "@chakra-ui/react";

const Index = () => {
  const [mode, setMode] = useState("word");
  const [text, setText] = useState("");
  const [selectedLines, setSelectedLines] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [cards, setCards] = useState([]);
  const toast = useToast();

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setSelectedLines([]);
    setSelectedWords([]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleLineClick = (lineNumber) => {
    if (selectedLines.includes(lineNumber)) {
      setSelectedLines(selectedLines.filter((line) => line !== lineNumber));
    } else {
      setSelectedLines([...selectedLines, lineNumber]);
    }
  };

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSaveCard = () => {
    if (mode === "line" && selectedLines.length > 0) {
      const selectedText = text
        .split("\n")
        .filter((_, index) => selectedLines.includes(index))
        .join("\n");
      setCards([...cards, selectedText]);
      setSelectedLines([]);
      toast({
        title: "Card saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else if (mode === "word" && selectedWords.length > 0) {
      const selectedText = selectedWords.join(" ");
      setCards([...cards, selectedText]);
      setSelectedWords([]);
      toast({
        title: "Card saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Text Editor</Heading>
      <Flex mb={4}>
        <Button colorScheme={mode === "word" ? "blue" : "gray"} onClick={() => handleModeChange("word")} mr={2}>
          Word Mode
        </Button>
        <Button colorScheme={mode === "line" ? "blue" : "gray"} onClick={() => handleModeChange("line")}>
          Line Mode
        </Button>
      </Flex>
      <Textarea value={text} onChange={handleTextChange} placeholder="Enter your text here..." rows={10} mb={4} />
      {mode === "line" && (
        <VStack align="stretch" mb={4}>
          {text.split("\n").map((line, index) => (
            <HStack key={index} cursor="pointer" onClick={() => handleLineClick(index)} bg={selectedLines.includes(index) ? "blue.100" : "white"} p={2} borderRadius="md">
              <Badge>{index + 1}</Badge>
              <Text>{line}</Text>
            </HStack>
          ))}
        </VStack>
      )}
      {mode === "word" && (
        <Flex wrap="wrap" mb={4}>
          {text.split(/\s+/).map((word, index) => (
            <Badge key={index} cursor="pointer" onClick={() => handleWordClick(word)} colorScheme={selectedWords.includes(word) ? "blue" : "gray"} mr={2} mb={2}>
              {word}
            </Badge>
          ))}
        </Flex>
      )}
      <Button colorScheme="green" onClick={handleSaveCard} mb={4}>
        Save Selected to Card
      </Button>
      <VStack align="stretch">
        {cards.map((card, index) => (
          <Box key={index} p={4} bg="gray.100" borderRadius="md" mb={2}>
            <Text>{card}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
