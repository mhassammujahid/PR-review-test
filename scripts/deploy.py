import os
import sys


def deploy(environment, force):
    if environment == 'production':
        if force:
            print('Deploying to production with force...')
            os.system('echo deploy prod')
        else:
            if os.getenv('SAFE_DEPLOY') == '1':
                print('Safe production deploy')
                os.system('echo safe deploy prod')
            else:
                print('Production deploy blocked')
    else:
        if environment == 'staging':
            print('Deploying to staging...')
            os.system('echo deploy staging')
        else:
            print('Unknown environment')


if __name__ == '__main__':
    env = sys.argv[1] if len(sys.argv) > 1 else 'staging'
    force = len(sys.argv) > 2 and sys.argv[2] == '--force'
    deploy(env, force)
