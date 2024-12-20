from typing import Dict


class CsrfResponse:
    def __init__(self, token: str, parameter_name: str, header_name: str, set_cookie: str):
        self.token = token
        self.parameter_name = parameter_name
        self.header_name = header_name
        self.set_cookie = set_cookie

    @classmethod
    def from_dict(cls, data: Dict[str, str], set_cookie: str) -> "CsrfResponse":
        """
        Class method to create an instance of the class from a dictionary.
        """
        return cls(
            token=data.get('token', ''),
            parameter_name=data.get('parameterName', ''),
            header_name=data.get('headerName', ''),
            set_cookie=set_cookie
        )

    def __repr__(self) -> str:
        return f"CsrfResponse(token={self.token}, parameter_name={self.parameter_name}, header_name={self.header_name}, set_cookie={self.set_cookie})"
