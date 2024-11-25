curl -v --location --request PUT 'http://localhost:8080/api/admin/update-role?userId=1&roleName=ROLE_ADMIN' \
--header 'Authorization: Basic dXNlcjE6cGFzc3dvcmQx' \
--header 'Cookie: JSESSIONID=D88C13095C6997CC1622A16BEF0D3C4D' | jq