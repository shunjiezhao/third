import os.path

from django.shortcuts import render
from django.conf import  settings

# 返回web.html的模版
def index(request):
    Dir = "%s\\app\\templates\\web.html"%settings.BASE_DIR
    return render(request, Dir)