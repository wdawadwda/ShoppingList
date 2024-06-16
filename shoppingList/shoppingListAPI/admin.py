from django.contrib import admin

from shoppingListAPI.models import *

admin.site.register(CustomUser)
class BillModelAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'bill', 'bill_text', 'ai_model')

admin.site.register(BillModel, BillModelAdmin)

