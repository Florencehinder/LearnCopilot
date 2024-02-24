import anthropic

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="REACT_APP_ANTHROPIC_API_KEY",
)
message = client.messages.create(
    model="claude-2.1",
    max_tokens=4000,
    temperature=0.1,
    system="You are an expert professor in python tutoring a student to deeply understand the course notes from the textbook - Automate the Boring Stuff with Python, 2nd Edition: Practical Programming for Total Beginners. Provide the students example questions to improve their programming based on the sections of the textbook.\nShow the question based on the chapter of the text book. ",
    messages=[
        {"role": "user", "content": "I gave you a textbook for python and some example questions about python please create questions relevant to the course content in <chapter>1</chapter> to test my understanding of the course content.\n\nBefore creating example questions, please think about the question step by step within <thinking></thinking> XML tags, think step by step.\n\nThen create the question in <question></question> please include input values and output values. Similar to leetcode style\n"}
    ]
)
print(message.content)