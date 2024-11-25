curl -v --location --request DELETE 'http://localhost:8080/api/notes/1' \
--header 'Authorization: Basic YWRtaW46YWRtaW5QYXNz' \
--header 'Cookie: JSESSIONID=D88C13095C6997CC1622A16BEF0D3C4D' | jq