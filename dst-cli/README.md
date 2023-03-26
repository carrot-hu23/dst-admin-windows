# dst-cli

## 安装
```
Pyinstaller -F main.py
```

for i, v in ipairs(TheNet:GetClientTable()) do  print(string.format("playerlist %s [%d] %s %s %s", 1675512945741, i-1, v.userid, v.name, v.prefab )) end


## 获取玩家指令
```
for i, v in ipairs(TheNet:GetClientTable()) do  print(string.format("%d %s %s %s %s", i-1, string.format('%03d', v.playerage), v.userid, v.name, v.prefab)) end
```



AllPlayers[1]:PushEvent('death')