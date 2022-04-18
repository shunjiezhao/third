#! /bin/bash


# 用来 **合并** 我们的 js 文件
JS_PATH=/c/Users/Azzzzz/projext/app/static/js/
JS_PATH_DIST=${JS_PATH}dist/
JS_PATH_SRC=${JS_PATH}src/


find ${JS_PATH_SRC} -type f -name '*.js' | sort | xargs cat > ${JS_PATH_DIST}game.js

