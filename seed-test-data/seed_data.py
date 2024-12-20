import os
import requests
from auth_response import AuthResponse
from create_note_response import CreateNoteResponse
from csrf_response import CsrfResponse
from requests.models import Response

BASE_URL = os.getenv('API_BASE_URL')


def send_debug_request(method: str, url: str, headers: dict[str, str], data=None, params=None, json=None):
    """
    Print and send the full HTTP request for debugging purposes.
    """
    session = requests.Session()
    request = requests.Request(method, url, headers=headers, data=data, params=params, json=json)
    prepared_request = session.prepare_request(request)

    # Print the full request
    print("=== REQUEST ===")
    print(f"URL: {prepared_request.url}")
    print(f"Method: {prepared_request.method}")
    print("Headers:")
    for key, value in prepared_request.headers.items():
        print(f"  {key}: {value}")
    if prepared_request.body:
        print("Body:")
        print(prepared_request.body.decode() if isinstance(prepared_request.body, bytes) else prepared_request.body)
    print("================")

    # Send the request
    response = session.send(prepared_request)

    # Print the response
    print("=== RESPONSE ===")
    print(f"Status Code: {response.status_code}")
    print("Headers:")
    for key, value in response.headers.items():
        print(f"  {key}: {value}")
    print("Body:")
    print(response.text)
    print("================")

    return response


def csrfToken() -> None:
    url: str = f"{BASE_URL}/api/csrf-token"
    headers: dict[str, str] = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Connection': 'keep-alive',
        'Origin': 'http://localhost:3000',
        'Referer': 'http://localhost:3000/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site'
    }
    response: Response = send_debug_request("GET", url, headers)
    if response.status_code == 200:
        csrf_response = CsrfResponse.from_dict(response.json(), response.headers['Set-Cookie'])
        return csrf_response
    else:
        print(f"Failed to retrieve CSRF token. Status code: {response.status_code}")
        print(response.text)
        raise Exception()


def sign_in(username: str, password: str, csrf_response: CsrfResponse) -> None:
    url: str = f"{BASE_URL}/api/auth/public/sign-in"
    headers = {
        'Accept': 'application/json',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
        'Referer': 'http://localhost:3000/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'X-XSRF-TOKEN': f'"${csrf_response.token}"'
    }
    payload = {
        'username': username,
        'password': password
    }
    response = send_debug_request("POST", url, headers, json=payload)
    if response.status_code == 200:
        return AuthResponse.from_dict(response.json())
    else:
        print(f"Failed to sign in. Status code: {response.status_code}")
        print("Response Text:", response.text)


def send_notes_request(csrf_response: CsrfResponse, auth_response: AuthResponse):
    url: str = f"{BASE_URL}/api/notes"
    headers = {
        "sec-ch-ua-platform": "macOS",
        "Authorization": f"Bearer {auth_response.jwt_token}",
        "X-XSRF-TOKEN": csrf_response.token,
        "Referer": "http://localhost:3000/",
        "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Cookie": csrf_response.set_cookie
    }
    payload = {
        "content": "<p>asdf</p>"
    }
    response = send_debug_request("POST", url, headers, json=payload)
    if response.status_code == 200:
        return CreateNoteResponse.from_dict(response.json())
    else:
        print(f"Failed to create note. Status code: {response.status_code}")
        print("Response Text:", response.text)


if __name__ == "__main__":
    csrf_response = csrfToken()
    auth_response = sign_in("admin", "adminPass", csrf_response)
    create_note_response = send_notes_request(csrf_response, auth_response)
