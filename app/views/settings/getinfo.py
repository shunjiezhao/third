from django.http import JsonResponse
from app.models.player.player import Player

def getinfo_web(request):
    try:
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({
                'result' : "login false",
            })
        else:
            player = Player.objects.get(user = user)
            return JsonResponse({
                'result': "success",
                'username': user.username,
            })
    except Exception:
        return JsonResponse({
            'result': "login false,because this player has been delete"
        })

def getinfo(request):
    return getinfo_web(request)
