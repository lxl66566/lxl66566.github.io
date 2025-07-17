---
date: 2025-07-07
icon: code
category:
  - 编程
tag:
  - 编程语言
---

# lua

其实我一直都不喜欢 lua，感觉很多设计都是一坨屎，参见 [lua 有多难用](../gossip/fuckxxx.md#lua-有多难用)。但是现在是工作，不得不学了。

## 安装

- 解释器：lua 或 luajit
- Vscode 插件：
  - lsp: _Lua - sumneko_
  - Formatter: _Lua - sumneko_（优先）或 _Stylua_
- 包管理器：luarocks，用法和 scoop 相似

配置：

- luarocks 默认将包安装到全局。想要使用其安装的 lua 包，你还需要额外设置一些环境变量：执行 `luarocks path --bin`，并将 `LUA_PATH`, `LUA_CPATH`, `PATH` 三个环境变量设为输出的值。
- _Lua - sumneko_：sumneko 是神。
  - 开启所有能开的 type/hint：
    ```json
    "Lua.hint.enable": true,
    "Lua.hint.arrayIndex": "Enable",
    "Lua.hint.await": true,
    "Lua.hint.setType": true,
    "Lua.hint.paramName": "All",
    "Lua.hint.paramType": true,
    "Lua.hint.awaitPropagate": true,
    "Lua.type.checkTableShape": true,
    "Lua.type.inferParamType": true,
    "Lua.type.weakNilCheck": false,
    "Lua.type.weakUnionCheck": false,
    ```
    可惜的是这里面不支持 if 语句的表达式进行 inlay hint，我觉得这还是比较重要的，因为 lua 比较算符会执行隐式转换。
  - 如果你在用其他提供 lua 库的框架（例如 OpenResty），可以[安装插件](https://github.com/LuaLS/lua-language-server/wiki/Addons)，以提供更好的 type hint。最简单的插件安装是 `Ctrl + P` 打开 `Lua: Open Addon Manager`，然后点点点即可。
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
- 模块化：在某个 lua 文件里最后使用 `return xxx` 即可暴露变量（可以暴露 local）。然后在其他文件里 `local mod = require("folder.filename")` 即可，不要包含 `.lua` 后缀。
  - 一般常用的模块写法习惯如下（主要取决于团队）：
    ```lua
    local _M = {version = 0.1}
    function _M.xxx()
      ...
    end
    return _M
    ```
- 赋值：lua 默认使用引用赋值。所以就不得不提浅拷贝和深拷贝的概念，在 lua 中要怎么做呢？答：没有这些函数，要自己写。

### 数据类型

string, function, boolean, number, nil, table

- string：
  - lua string 包含了长度信息，获取长度是 O1 的。
  - 字符串不可变。
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
  - 正因为底层是 table，所以下标越界不会报错而是给出 nil。
  - table 初始化可以使用 `local a = { b = 5, }`，但是如果 key 不是一个合法的变量字符串就需要用 `["asd,123"]` 这种形式，中括号 + 引号。
  - `ipairs(x)` 和 `pairs(x)` 用于取 table 的迭代器。`ipairs` 专用于迭代数组 table，会忽略所有非 number 的 key。而 `pairs` 是迭代所有 kv，顺序不定，而且比较慢。
  - `table.unpack(some_table, start, end)` 用于解包一个 array table，可以给函数参数或变量赋值。start, end 是 optional，如果不指定就到碰到的第一个 nil 为止。而 `table.pack` 是反向，还会多加一个 `n=length` 的 kv。
  - `table.insert(x, [pos ,] value)` 用于插入，`table.remove(x [, pos])` 用于删除， `table.concat(x, " ")` 用于字符串连接（只拼值，跳过 kv 对）。
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
- 迭代器：请使用 [luafun](https://github.com/luafun/luafun) 三方库。luafun 提供了函数式和对象式的迭代器类型，方便使用。

### fs 与文件操作

文件 io：

```lua
infile = io.open("input.txt", "r")
for line in infile:lines() do
   print(line)
end
infile:close()
local outfile, err = io.open("output.txt", "w") -- 可以加错误处理
if not outfile then
  outfile:write("\n")
end
outfile:close()
```

fs：使用 luafilesystem 库。

## 高级

- `setmetatable(var1, {__add = myfunc})` 可以重写内置的方法
  - 在所有方法里，`__index` 又是最常用的一个，这就相当于用 `var1.xxx` 时就会拿到 key 为 xxx 的 value。
  - 让 table 变为 readonly 可以加一个 `__newindex = function() error("no modification allowed") end`。
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
- 反射：用 debug 库，不过会影响性能。
- 协程：lua 的协程依赖于 `coroutine.create`, `coroutine.resume`, `coroutine.yield`，yield 就相当于是 await 点交出控制权一样。
  - 协程是单线程的，任何时候不会有两个协程同时执行。
  - lua 5.2 支持 yield C 函数，5.4 引入协程取消机制。
  - 没有自带的一个 async 运行时，需要自己手写调度器。如果在用 openresty 等，也可以使用这些框架里的成熟调度器，`ngx.thread.spawn` 和 `ngx.thread.wait` 好用多了。
- 没有 RAII，所以各种 cosocket 都要手动关，否则就泄漏。
- 错误处理：正常来说使用 `pcall(func, ...args)` 进行包装，相当于一个 try-catch。或者直接使用 safe 库，不要抛出错误而是正常返回错误，例如 `cjson.safe`。
- 很多实践中会在 lua 文件最上方声明很多 local 函数，这个做法的目的是将 \_G 表中的函数变为局部变量，以达到更快的调用，也可以防止不小心修改了全局变量。

### gc

lua 5.4 之前使用的是增量 gc，使用较为细化的标记-清除过程。5.4 添加了分代特性，减少了老年代的扫描频次。

释放数据的标准做法是将其设为 nil，以便在下一次 gc 将其清理。

lua 可以通过下面的方式设置弱引用表，弱引用的部分不持有所有权：

```lua
-- __mode = "k", "v" 或 "kv"，代表哪部份是弱引用
local weakTable = setmetatable({}, {__mode = "k"})
```

根据这些 gc 机制，可以针对性注意，提升性能：

- 避免在循环或频繁调用的函数中创建闭包或表
- 及时释放

### ffi

lua 的 ffi 开销比想象的要小。lua 不同类型的开销如下：

- number：几乎为 0
- string：传入几乎为 0，接收需要一次拷贝
- table：不能直接传，需要手动构建成 C struct。该构建阶段有开销。

## typing

lua 的一大缺点是没有 type system。类似 js 的 typed 加强版 ts，lua 也有 typed 加强版，不过比较杂，从早期已经久不维护的 [typedlua](https://github.com/andremm/typedlua) 和一些 fork 到新的 [teal](https://github.com/teal-language/tl) 都有。这些 typed 版本都受 ts 启发，语法比较相似。

## external

1. [理解 Lua 的闭包机制](https://zhuanlan.zhihu.com/p/494191824)
