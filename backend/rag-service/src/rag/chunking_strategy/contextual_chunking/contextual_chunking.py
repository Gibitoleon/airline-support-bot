class Contextualizer:
    def __init__(self, llm):
        self.llm = llm

    def contextualize(self, chunk, previous_chunk=None, next_chunk=None):
        title = chunk.metadata.get("title", "")
        section = chunk.metadata.get("section", "")

        previous = previous_chunk.page_content if previous_chunk else "None"

        next = next_chunk.page_content if next_chunk else "None"

        return self.llm.generate_context(
            title=title,
            section=section,
            previous=previous,
            chunk=chunk.page_content,
            next=next,
        )

    def enrich_chunk(self, chunk, previous_chunk=None, next_chunk=None):
        context = self.contextualize(chunk, previous_chunk, next_chunk)

        chunk.page_content = f"Context: {context}\n\n{chunk.page_content}"

        return chunk
