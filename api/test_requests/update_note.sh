curl -v --location --request PUT 'http://localhost:8080/api/notes/1' \
--header 'Authorization: Basic YWRtaW46YWRtaW5QYXNz' \
--header 'Cookie: JSESSIONID=D88C13095C6997CC1622A16BEF0D3C4D' \
--header 'Content-Type: application/json' \
--header 'Content-Type: application/json' \
--data '{"content": "Updated note content here"}' | jq