---
date: 2025-07-07
icon: code
category:
  - 编程
tag:
  - 编程语言
---

# lua

其实我一直不喜欢 lua，感觉很多设计都是一坨屎。但是现在是工作，不得不学了。

## 安装

- 解释器：lua 或 luajit
- Vscode 插件：
  - lsp: _Lua - sumneko_
  - Formatter: _Stylua_
- 包管理器：luarocks，用法和 scoop 相似

其他设置：

- _Stylua_ 默认使用 tab 作为缩进。要把它改成空格，[需要](https://github.com/JohnnyMorganz/StyLua#configuring-runtime-syntax-selection)在项目下创建 `.stylua.toml`，并写入 `indent_type = "Spaces"`。

## 基础

- array table 下标从 1 开始！！！
- 不等：`~=`
- 数据定义：不加 local 默认是全局变量。
- 数据优先级：后面覆盖前面，局部覆盖全局
- 条件 if-then-elseif-else-end
- 循环：`for i = 1,5 do ... end`，`for i, v in xxx do ... end`，`repeat ... until xxx`，`while do ... end`
- goto：通过 `::somelabel::` 打标签，然后 `goto somelabel`。
- 作用域：local 是局部变量关键字。创建的变量的生命周期和作用域仅限于它所在的那个代码块。
  - 在交互式 lua 环境中，每一行语句（> 开头）都是一个代码块。也就是说在这些交互式环境中使用 local 定义的变量在后续是访问不了的，因为其生命周期已经结束。
- 模块化：在某个 lua 文件里最后使用 `return xxx` 即可暴露变量（可以暴露 local）。然后在其他文件里 `local mod = require("filename")` 即可，不要包含 `.lua` 后缀。
  - 一般常用的模块写法习惯如下（主要取决于团队）：
    ```lua
    local _M = {version = 0.1}
    function _M.xxx()
      ...
    end
    return _M
    ```

### 数据类型

string, function, boolean, number, nil, table

- string：
  - `[[ xxx ]]` 为 raw string，更高级的还有 `[=[ [[ xxx ]] ]=]`
  - split:
    ```lua
    function split(str, sep)
      if sep == nil then
        sep = "%s" -- 默认以空白字符分割
      end
      local result = {}
      -- 模式 '[^'..sep..']+' 匹配一个或多个非分隔符的字符
      for part in string.gmatch(str, "([^" .. sep .. "]+)") do
        table.insert(result, part)
      end
      return result
    end
    ```
    当然，如果需要更进一步控制 split 的次数，那就需要手动 find 了。
  - slice: `string.sub`
- table 就是 key-value pairs，里面的值可以没有 key，没 key 的默认从 number 1 开始，类似 Object + Array 结合体。后续将 kv 的 table 称为 map table，数组称为 array table。
  - `ipairs(x)` 和 `pairs(x)` 用于取 table 的迭代器。`ipairs` 专用于迭代数组 table，会忽略所有非 number 的 key。而 `pairs` 是迭代所有 kv，顺序不定，而且比较慢。
  - `table.unpack(some_table, start, end)` 用于解包一个 array table，可以给函数参数或变量赋值。start, end 是 optional，如果不指定就到碰到的第一个 nil 为止。而 `table.pack` 是反向，还会多加一个 `n=length` 的 kv。
  - `table.insert(x, [pos ,] value)` 用于插入，`table.remove(x [, pos])` 用于删除， `table.concat(x, " ")` 用于字符串连接。
    - lua 的 string 是 immutable 的，通过这样可以动态构造 string。
  - slice：lua 没有 table 取 slice 的方法，需要自己循环 insert。
  - 通过 `#` 获取 table/string 长度。对于含有 nil 的 table，获取的长度是[未定义的](https://www.runoob.com/w3cnote/lua-table-length.html)！
    - 所以不要在 lua 的 array table 中使用 nil 值！因为 map table 需要用 `tab.key = nil` 来删除一个 kv 对，所以经常在 array table 也这样做了，这是不行的！
  - 判断是否为空：`t == nil or next(t) == nil`。注意一般来说都要先检查 nil。
- function：
  - 默认除了 table 以外都是值传递
  - 传入参数过多忽略，过少用 nil 填
  - 可以用 ... 传不定长参数，用 `local x = {...}` 拿到一个 array table。
  - 函数必须放在调用的代码之前
- 显式类型转换只有 `tostring(x)` 和 `tonumber(x)`。如果要转为 bool 需要用 `not not x`。
  - 除了 nil（和 false 本身）转为 bool 会被转为 false，其他值都会转为 true。
  - table 调用 `tostring(x)` 的结果是它的地址
- 隐式转换：
  1. 算数运算中，字符串，bool 和 nil 会转为数字
  2. 字符串连接符 `..`，数字和 nil 会转为字符串

### 文件操作

```lua
file = io.open("test.txt", "r")
for line in file:lines() do
   print(line)
end
file:close()
```

## 高级

- `setmetatable(var1, {__add = myfunc})` 可以重写内置的方法
  - 在所有方法里，`__index` 又是最常用的一个，这就相当于用 `var1.xxx` 时就会拿到 key 为 xxx 的 value。
- 面向对象：高级的 table
  ```lua
  local MyClass = {}
  local mt = { __index = MyClass }
  function MyClass.deposit(self, v)
    ...
  end
  function MyClass.withdraw(self, v)
    ...
  end
  function MyClass.new(self, balance)
    balance = balance or 0
    return setmetatable({ balance = balance }, mt)
  end
  ```
  - 对于实例，使用 `.` 则只是获取 static 的函数本身，而可以用 `:` 代表调用其成员函数，这是一个语法糖。
    - 但是内置类型的函数，例如 `table.remove` 不能直接用 `t:remove` 这样调用！究其原因，table 不是类，而是一个内置库。如果需要用 `:`，要设置元表：`setmetatable(t, { __index = table })`。

## typing

lua 的一大缺点是没有 type system。类似 js 的 typed 加强版 ts，lua 也有 typed 加强版，不过比较杂，从早期已经久不维护的 [typedlua](https://github.com/andremm/typedlua) 和一些 fork 到新的 [teal](https://github.com/teal-language/tl) 都有。这些 typed 版本都受 ts 启发，语法比较相似。

## external

1. [理解 Lua 的闭包机制](https://zhuanlan.zhihu.com/p/494191824)
