from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models


class CustomUser(AbstractUser):
  username_validator = UnicodeUsernameValidator()

  username = models.CharField(
    ("username"),
    max_length=150,
    unique=True,
    help_text=(
      "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
    ),
    validators=[username_validator],
    error_messages={
      "unique": ("A user with that username already exists."),
    },
  )
  email = models.EmailField(db_index=True, unique=True)
  user_theme = models.CharField(
    max_length=10,
    choices=[('light', 'Light'), ('dark', 'Dark'), ('auto', 'Auto')],
    default='auto'
  )
  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['email', 'is_staff']
  objects = UserManager()

  def __str__(self):
    return self.email


class UserThemeModel(models.Model):
    theme = models.CharField(max_length=50)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
      return self.user

