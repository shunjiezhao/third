from django.db import models
from django.contrib.auth.models import User

#继承
class Player(models.Model):
    # User 和 Player 一一对应
    user = models.OneToOneField(User, on_delete= models.CASCADE)

    def __str__(self):
        return str(self.user)