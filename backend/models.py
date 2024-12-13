from .database import Base
from sqlalchemy import Column, Integer, String, DateTime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password_hash = Column(String(200), nullable=False)
    failed_logins = Column(Integer, default=0, nullable=False)
    locked_until = Column(DateTime, nullable=True)
