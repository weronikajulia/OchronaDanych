from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..schemas import UserRegister, UserLogin
from ..database import get_db
from ..models import User
from ..security import hash_password, verify_password, create_jwt
from ..utils import is_account_locked, register_failed_login, reset_failed_logins, login_delay

router = APIRouter()

@router.post("/register", status_code=201)
def register_user(user_in: UserRegister, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_in.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Użytkownik już istnieje")
    new_user = User(username=user_in.username, password_hash=hash_password(user_in.password))
    db.add(new_user)
    db.commit()
    return {"msg": "Zarejestrowano pomyślnie"}

@router.post("/login")
async def login(user_in: UserLogin, db: Session = Depends(get_db)):
    await login_delay()
    user = db.query(User).filter(User.username == user_in.username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Niepoprawne dane logowania")

    if is_account_locked(user):
        raise HTTPException(status_code=403, detail="Konto zablokowane")

    if not verify_password(user_in.password, user.password_hash):
        register_failed_login(user, db)
        raise HTTPException(status_code=401, detail="Niepoprawne dane logowania")

    reset_failed_logins(user, db)
    token = create_jwt(user.username)
    return {"msg": "Zalogowano", "token": token}
