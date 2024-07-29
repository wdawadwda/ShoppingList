from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models

class CustomUser(AbstractUser):
  username_validator = UnicodeUsernameValidator()

  username = models.CharField(
    ("username"),
    max_length=150,
    help_text=(
      "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
    ),
    validators=[username_validator],
    # error_messages={
    #   "unique": ("A user with that username already exists."),
    # },
  )
  email = models.EmailField(db_index=True, unique=True)
  user_theme = models.CharField(
    max_length=10,
    choices=[('light', 'Light'), ('dark', 'Dark'), ('auto', 'Auto')],
    default='auto'
  )
  ready_to_accept_lists = models.BooleanField(blank=False, null=False, default=True)
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']
  objects = UserManager()

  def __str__(self):
    return f"{self.id}. {self.email}"

class BillModel(models.Model):
    bill = models.FileField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
    bill_text = models.JSONField(blank=True, null=True)
    ai_model = models.CharField(max_length=30, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
      return str(self.user)

class CustomProductModel(models.Model):
  name_en = models.CharField(max_length=150, blank=True, null=True)
  name_ru = models.CharField(max_length=150, blank=True, null=True)
  category_ru = models.CharField(max_length=20, blank=True, null=True)
  category_en = models.CharField(max_length=20, blank=True, null=True)
  quantity = models.CharField(max_length=10, blank=True, null=True)
  svgKey = models.CharField(max_length=20, blank=True, null=True)
  isPushed = models.BooleanField(default=False)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

  def __str__(self):
    return f"{self.id}. {self.name_ru}"

class ProductsListDataModel(models.Model):

  name = models.CharField(max_length=50, unique=False, blank=False, null=False)
  products = models.JSONField(blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(blank=True, null=True)
  owner_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owned_lists')
  owner_name = models.CharField(max_length=100, unique=False, blank=True, null=True)
  shared_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='shared_lists', blank=True, null=True)
  shared_name = models.CharField(max_length=100, unique=False, blank=True, null=True)
  is_shared = models.BooleanField(default=False)
  shared_type = models.CharField(
    max_length=10,
    choices=[('write', 'Write'), ('read', 'Read')],
    null=True
  )

  def __str__(self):
    return f"{self.id}. {self.name}"