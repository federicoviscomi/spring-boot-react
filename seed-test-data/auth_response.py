from typing import List


class AuthResponse:
    def __init__(self, jwt_token: str, username: str, roles: List[str]):
        self.jwt_token = jwt_token
        self.username = username
        self.roles = roles

    @staticmethod
    def from_dict(data: dict) -> "AuthResponse":
        """
        Create an AuthResponse instance from a dictionary.
        """
        return AuthResponse(
            jwt_token=data.get("jwtToken", ""),
            username=data.get("username", ""),
            roles=data.get("roles", [])
        )

    def to_dict(self) -> dict:
        """
        Convert the AuthResponse instance to a dictionary.
        """
        return {
            "jwtToken": self.jwt_token,
            "username": self.username,
            "roles": self.roles,
        }

    def __repr__(self):
        return f"AuthResponse(jwt_token={self.jwt_token!r}, username={self.username!r}, roles={self.roles!r})"
