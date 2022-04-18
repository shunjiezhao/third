
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from app.utils.getUserInfo import getUserInfo
def signin(request):
    data = request.GET
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username = username, password = password)
    if not user:
        return  JsonResponse({
            'result' : "用户名或密码不正确",
        })
    login(request, user)
    getUserInfo(request, username)
    return JsonResponse({
        'result': "success",
    })