from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import NoteOut
from ..security import decode_jwt

router = APIRouter()

def get_current_user(authorization: str = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Brak lub niepoprawny token")
    token = authorization.split(" ")[1]
    try:
        payload = decode_jwt(token)
    except:
        raise HTTPException(status_code=401, detail="Nieprawidłowy token")
    username = payload.get("sub")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Użytkownik nie istnieje")
    return user

@router.get("/notes", response_model=list[NoteOut])
def get_notes(current_user: User = Depends(get_current_user)):
    # Można pobrać notatki z bazy
    return [{"id": 1, "title": "Przykładowa notatka"}]
