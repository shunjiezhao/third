from django.urls import  path, include
from app.views.settings.login import signin
from app.views.settings.register import register
from app.views.settings.logout  import signout
from app.views.settings.getinfo import getinfo

urlpatterns = [
    path("login/", signin, name = "settings_login"),
    path("register/", register, name = "settings_register"),
    path("logout/", signout, name="settings_logout"),
    path("getinfo/", getinfo, name = "settings/getinfo"),
]