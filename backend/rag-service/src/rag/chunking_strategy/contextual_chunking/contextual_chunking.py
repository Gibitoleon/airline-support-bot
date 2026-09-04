class Contextualizer:
    def __init__(self, llm):
        self.llm = llm

    def contextualize(self, chunk, previous_chunk=None, next_chunk=None):
        title = chunk.metadata.get("title", "")
        section = chunk.metadata.get("section", "")

        previous = previous_chunk.page_content if previous_chunk else "None"

        next = next_chunk.page_content if next_chunk else "None"

        prompt = f"""
        You are preparing a document chunk for a
        Retrieval-Augmented Generation (RAG) system.

        Document title:
        {title}

        Section:
        {section}

        Previous chunk:
        {previous}

        TARGET CHUNK:
        {chunk.page_content}

        Next chunk:
        {next}

        Using only the information provided above, write 1-2 concise
        sentences that explain what the TARGET CHUNK is about and how
        it fits within the surrounding document context.

        Rules:
        - Only use information provided above.
        - Do not invent or assume facts.
        - Do not answer a question.
        - Do not repeat the target chunk verbatim.
        - Focus on the meaning and context of the TARGET CHUNK.
        """

        return self.llm.generate_response(prompt)

    def enrich_chunk(self, chunk, previous_chunk=None, next_chunk=None):
        context = self.contextualize(chunk, previous_chunk, next_chunk)

        chunk.page_content = f"Context: {context}\n\n{chunk.page_content}"

        return chunk
