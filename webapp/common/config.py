import os
from collections import namedtuple


def dev_env():
    conf = dict()
    conf['api_port'] = os.environ.get('API_PORT', 7070)

    return conf


env = dev_env()
AppConf = namedtuple('AppConf', env.keys())()
