# program minimize
I'm very sensitive to file size. And 20230428 I found a nice guy to minimize my released executable files:

[UPX](https://github.com/upx/upx), The Ultimate Packer for eXecutables. (copy from its readme, ~~strange capitals~~)
## install
use [scoop](../farraginous/recommend_packages.md#scoop), `scoop install upx`.
## usage
`upx --best --lzma <yourfile.exe>`

or you want to minimize the whole package folder including dlls, replace `<yourfile.exe>` with `<yourfolder>/*`