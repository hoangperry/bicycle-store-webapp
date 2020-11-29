import os
from collections import namedtuple


def dev_env():
    conf = dict()
    conf['database_url'] = os.environ.get('DATABASE_URL', 'sqlite:///./test.db')

    return conf


env = dev_env()
AppConf = namedtuple('AppConf', env.keys())(*env.values())
