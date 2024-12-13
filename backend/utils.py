import asyncio
from datetime import datetime, timedelta

async def login_delay():
    await asyncio.sleep(1)

def is_account_locked(user):
    if user.locked_until and user.locked_until > datetime.utcnow():
        return True
    return False

def register_failed_login(user, db, max_attempts=5, lock_time=300):
    user.failed_logins += 1
    if user.failed_logins >= max_attempts:
        user.locked_until = datetime.utcnow() + timedelta(seconds=lock_time)
        user.failed_logins = 0
    db.commit()

def reset_failed_logins(user, db):
    user.failed_logins = 0
    user.locked_until = None
    db.commit()
