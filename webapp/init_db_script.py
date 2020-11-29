import os
import yaml
import base64
import bcrypt
import sqlalchemy
from common.config import AppConf


if __name__ == '__main__':
    # Remove old Sqlite file
    os.remove(AppConf.database_url.replace('sqlite:///', ''))

    from common.models import user, bicycle

    # Init connection
    engine = sqlalchemy.create_engine(AppConf.database_url, echo=True)

    # Load example
    example_db_dict = yaml.safe_load(open('./db.example.yaml', mode='r'))

    # Push record
    with engine.connect() as connection:
        for _, example_user in example_db_dict['user'].items():
            query = user.insert().values(
                name=example_user['name'],
                age=int(example_user['age']),
                email=example_user['email'],
                username=example_user['username'],
                hashed_password=bcrypt.hashpw(
                    example_user['unhashed_password'].encode('utf-8'),
                    bcrypt.gensalt()
                )
            )
            last_record_id = connection.execute(query)

        for _, example_user in example_db_dict['bicycle'].items():
            with open(example_user['image'], "rb") as img_file:
                image_base64 = base64.b64encode(img_file.read())
                query = bicycle.insert().values(
                    name=example_user['name'],
                    price=int(example_user['price']),
                    description=example_user['description'],
                    b64image=image_base64
                )
                last_record_id = connection.execute(query)

    # Test stdout
    query = user.select()
    list_user = list(engine.execute(query).fetchall())
    print('Number of user:', len(list_user))
    print(list_user)

    query = bicycle.select()
    list_user = list(engine.execute(query).fetchall())
    print('Number of bicycle:', len(list_user))
    print(list_user)
