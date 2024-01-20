h = 0
m = 0
print("请输入小时数与分钟数，空格隔开，空行结束：")
while i := input():
    param = i.strip().split()
    match len(param):
        # 一个参数是分钟
        case 1:
            m += int(param[0])
        case 2:
            h += int(param[0])
            m += int(param[1])
        case _:
            print(f"长度 {len(param)} 有误，请重新输入")

h += m // 60
m %= 60
print(f"{h}h{m}min")
