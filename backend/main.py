from fastapi import FastAPI
from .database import Base, engine
from .routers import auth, notes

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth.router, prefix="/api")
app.include_router(notes.router, prefix="/api")
