h = 0
m = 0
print("请输入小时数与分钟数，空格隔开，空行结束：")
while i := input():
    try:
        param = list(map(int, i.strip().split()))
    except ValueError:
        print("输入有误，请重新输入：")
        continue
    match len(param):
        # 一个参数是分钟
        case 1:
            m += param[0]
        case 2:
            h += param[0]
            m += param[1]
        case _:
            print(f"长度 {len(param)} 有误，请重新输入")

h += m // 60
m %= 60
print(f"{h}h{m}min")

# 《Re0》5h26min
