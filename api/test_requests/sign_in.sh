#curl -v --location 'http://localhost:8080/api/auth/public/signin' \
#--header 'Cookie: JSESSIONID=B18687F484B2C73D3EA2ACBE4BCD6CFA; XSRF-TOKEN=077146ee-1652-4c33-bab4-45d49ca6dee7' \
#--header 'Content-Type: application/json' \
#--data '{"username": "admin", "password": "adminPass"}' | jq
#

curl 'http://localhost:8080/api/auth/public/sign-in' \
  -H 'Accept: application/json' \
  -H 'Accept-Language: en-GB,en;q=0.9' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:3000' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'X-XSRF-TOKEN: "MgQAyGDQ6ozJCcsHJD9njvkJPbnGIaR2xC3yI1jBVYk7gGyjADw2_VPjj7TkO_hhHRJTvZpvENvxEsVb_BrLFWD3YbAC5VzG"' \
  --data-raw '{"username":"admin","password":"adminPass"}'
