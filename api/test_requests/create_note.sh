curl -v --location 'http://localhost:8080/api/notes' \
--header 'Authorization: Basic YWRtaW46YWRtaW5QYXNz' \
--header 'Cookie: JSESSIONID=D88C13095C6997CC1622A16BEF0D3C4D; XSRF-TOKEN=077146ee-1652-4c33-bab4-45d49ca6dee7' \
--header 'Content-Type: application/json' \
--header 'X-XSRF-TOKEN: q_P80PUziHAJJpI0SWOEKrx_0PNvycIOZUrCruOiUaIKJsalm8TL4cEF7RUkF6QBe06wSY9M_ZEOq_YjUX-mmtrBMJRuQ6OS' \
--data '{"content": "Your note content here"}'