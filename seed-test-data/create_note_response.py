from datetime import datetime


class CreateNoteResponse:
    def __init__(self, id: int, content: str, owner_username: str, created_at: str):
        self.id = id
        self.content = content
        self.owner_username = owner_username
        self.created_at = datetime.fromisoformat(created_at)

    def __repr__(self):
        return (
            f"CreateNoteResponse(id={self.id}, content={self.content}, "
            f"owner_username={self.owner_username}, created_at={self.created_at})"
        )

    @classmethod
    def from_dict(cls, data: dict) -> "CreateNoteResponse":
        """
        Factory method to create an instance of CreateNoteResponse from a dictionary.
        """
        return cls(
            id=data["id"],
            content=data["content"],
            owner_username=data["ownerUsername"],
            created_at=data["createdAt"]
        )
