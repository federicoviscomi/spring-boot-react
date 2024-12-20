#curl -v --location 'http://localhost:8080/api/csrf-token' \
#--header 'Authorization: Basic YWRtaW46YWRtaW5QYXNz' \
#--header 'Cookie: JSESSIONID=B6A1F96CA7BD5902187EC88082CC7C0E' | jq



curl 'http://localhost:8080/api/csrf-token' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-GB,en;q=0.9' \
  -H 'Connection: keep-alive' \
  -H 'Origin: http://localhost:3000' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site'