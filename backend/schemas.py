from pydantic import BaseModel, validator, constr
import re

class UserRegister(BaseModel):
    username: constr(strip_whitespace=True, min_length=3, max_length=50)
    password: constr(min_length=8, max_length=128)

    @validator('username')
    def no_spaces(cls, v):
        if ' ' in v:
            raise ValueError("Nazwa użytkownika nie może zawierać spacji")
        return v
    
    @validator('password')
    def strong_password(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError("Hasło musi zawierać co najmniej jedną wielką literę")
        if not re.search(r'[a-z]', v):
            raise ValueError("Hasło musi zawierać co najmniej jedną małą literę")
        if not re.search(r'\d', v):
            raise ValueError("Hasło musi zawierać co najmniej jedną cyfrę")
        if not re.search(r'[!@#$%^&*(),.?\":{}|<>]', v):
            raise ValueError("Hasło musi zawierać co najmniej jeden znak specjalny")
        return v

class UserLogin(BaseModel):
    username: str
    password: str

class NoteOut(BaseModel):
    id: int
    title: str
