from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from app.models.player.player import Player
from app.utils.getUserInfo import getUserInfo

def register(request):
    data = request.GET
    username = data.get('username')
    password = data.get('password')
    password_confirm = data.get('password_confirm')
    if not username or not password or not password_confirm:
        return JsonResponse({
            'result': "用户名或密码不能为空",
        })
    if password != password_confirm:
        return JsonResponse({
            'result' : "密码不一致",
        })
    if User.objects.filter(username = username).exists():
        return JsonResponse({
            'result': "用户名已存在",
        })
    user = User(username = username)
    user.set_password(password)
    user.save()
    getUserInfo(request, username)
    Player.objects.create(user = user)
    login(request, user)
    return JsonResponse({
        'result': "success",
    })
