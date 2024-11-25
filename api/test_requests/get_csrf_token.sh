curl -v --location 'http://localhost:8080/api/csrf-token' \
--header 'Authorization: Basic YWRtaW46YWRtaW5QYXNz' \
--header 'Cookie: JSESSIONID=B6A1F96CA7BD5902187EC88082CC7C0E' | jq