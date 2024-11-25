curl -v --location 'http://localhost:8080/api/auth/public/signin' \
--header 'Cookie: JSESSIONID=B18687F484B2C73D3EA2ACBE4BCD6CFA; XSRF-TOKEN=077146ee-1652-4c33-bab4-45d49ca6dee7' \
--header 'Content-Type: application/json' \
--data '{"username": "admin", "password": "adminPass"}' | jq