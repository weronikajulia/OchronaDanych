import os, time
import jwt
from passlib.hash import argon2

PEPPER = os.getenv('PEPPER', 'some_pepper')
JWT_SECRET = os.getenv('JWT_SECRET', 'supersecret')
JWT_ALGO = "HS256"
JWT_EXPIRES = 3600

def hash_password(password: str) -> str:
    return argon2.using(rounds=4).hash(password + PEPPER)

def verify_password(password: str, hashed: str) -> bool:
    return argon2.verify(password + PEPPER, hashed)

def create_jwt(username: str) -> str:
    payload = {
        "sub": username,
        "exp": int(time.time()) + JWT_EXPIRES
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)
    return token

def decode_jwt(token: str):
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
