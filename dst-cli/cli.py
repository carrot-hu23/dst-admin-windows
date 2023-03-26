import uiautomation
import time
import uuid
import json

map = {}

def operate(name, command, times):
    if name is None:
        return ""
    # if window is None:
    #     window = uiautomation.WindowControl(searchDepth=1, Name=name, AutomationId='Console Window')
    global map
    if name not in map.keys():
        window = uiautomation.WindowControl(searchDepth=1, Name=name, AutomationId='Console Window')
        if window.Exists(1) is False:
            return None
        map[name] = window
    else:
        window = map[name]
        if window.Exists(1) is False:
            #print('#############')
            window = uiautomation.WindowControl(searchDepth=1, Name=name, AutomationId='Console Window')
            if window.Exists(1) is False:
                return None
        map[name] = window

    #window.Click()
    window.SendKeys('{Enter}')
    window.SendKeys('{Down}')
    window.SendKeys(command)

    window.SendKeys('{Enter}')

    time.sleep(times)

    text = window.DocumentControl(searchDepth=1).GetTextPattern().GetVisibleRanges()
    size = len(text)
    result = []
    for line in text:
        #print(line.GetText())
        result.append(line.GetText())
    return result

#json.dumps({'code': 401, 'msg': 'Not find window', 'data': None})

def getAllPlayersInfo(name):

    id = str(uuid.uuid4())
    command = "for i, v in ipairs(TheNet:GetClientTable()) do  print(string.format(\"%s %d %s %s %s %s\", "+"'"+id+"'"+",i-1, string.format('%03d', v.playerage), v.userid, v.name, v.prefab)) end"
    text = operate("Master", command=command, times=1)
    result = parsePlayerInfo(id, text=text)
    return json.dumps({'code': 200, 'type': 2, 'msg': 'get dst players info sunccess', 'data': result})

    # try:
    #     text = operate("Master", command=command)
    # except:
    #     return {'code': 500, 'type': 2, 'msg': 'get dst players info error', 'data': None}
    # result = parsePlayerInfo(id, text=text)
    # return {'code': 200, 'type': 2, 'msg': 'get dst players info sunccess', 'data': result}

def parsePlayerInfo(uuid,text):
    if text is None:
        return []
    result = []
    for line in text:
        if uuid in line and 'KU' in line and 'Host' not in line:
            str = line.split(' ')
            #print(str)
            data = {'key': str[2], 'day': str[3], 'ku': str[4], 'name': str[5], 'role': str[6]}
            result.append(data)
            #print(line)
    return result
# getAllPlayersInfo("")