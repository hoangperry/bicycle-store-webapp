import bcrypt


def hash_password(pwd_text):
    return bcrypt.hashpw(pwd_text, bcrypt.gensalt())


def check_password(password, hashed):
    return bcrypt.checkpw(password, hashed)
