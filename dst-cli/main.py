import cli
import sys
import json

print('Welcome to dst-cli [version 0.1.0]')
print('command: [title, command]')
print('input `byte` to quite')
print('input `all_players()` to get players information \n')

while True:
    #message = sys.stdin.readline()
    message = input()
    #titile c_save()
    if 'byte' in message:
        break
    c = message.split(" ")
    if len(c) < 2:
        print(json.dumps({'code': 400, 'type': 0, 'msg': 'input format error'}))
        continue
    name, command = c[0], c[1].strip()
    if command == "all_players()":
        res = cli.getAllPlayersInfo(name=name)
        #sys.stdout.write(res)
        print(res)
    else:
        res = cli.operate(name=name, command=command,times=3)
        if res is None:
            print(json.dumps({'code': 500, 'type': 0, 'msg': 'can not find window', 'data': None},ensure_ascii=False))
        else:
            print(json.dumps({'code': 200, 'type': 0, 'msg': 'other data', 'data': res}, ensure_ascii=False))

