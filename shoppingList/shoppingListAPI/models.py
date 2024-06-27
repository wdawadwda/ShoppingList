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

class BillModel(models.Model):
    bill = models.FileField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
    bill_text = models.JSONField(blank=True, null=True)
    ai_model = models.CharField(max_length=30, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
      return str(self.user)

# class CategoriesModel(models.Model):
#   name_ru = models.CharField(max_length=50, blank=False, null=False)
#   name_en = models.CharField(max_length=50, blank=False, null=False)
#   default = models.BooleanField()

class CustomProductModel(models.Model):
  barcode = models.CharField(max_length=50, blank=True, null=True)
  name_en = models.CharField(max_length=150, blank=True, null=True)
  name_ru = models.CharField(max_length=150, blank=True, null=True)
  unit = models.CharField(max_length=20, choices=[('kg', 'Kg'), ('piece', 'Piece'), ('g', 'G')])
  svgKey = models.CharField(max_length=20, blank=False, null=False)
  category_ru = models.CharField(max_length=20, blank=True, null=True)
  category_en = models.CharField(max_length=20, blank=True, null=True)
  isPushed = models.BooleanField(default=False)

class ProductsListDataModel(models.Model):
  """
  export interface ProductsListData {
    id: number | string | null;
    name: string;
    products: ProductInList[] | [];
  }
  """
  name = models.CharField(max_length=50, unique=True, blank=False, null=False)
  products = models.JSONField(blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(blank=True, null=True)
  owner_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owned_lists')
  owner_permissions_read = models.BooleanField(default=True)
  owner_permissions_write = models.BooleanField(default=True)
  owner_permissions_admin = models.BooleanField(default=True)
  shared_with_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='shared_lists', blank=True, null=True)
  shared_with_permissions_read = models.BooleanField(blank=True, null=True)
  shared_with_permissions_write = models.BooleanField(blank=True, null=True)
  shared_with_permissions_admin = models.BooleanField(blank=True, null=True)


