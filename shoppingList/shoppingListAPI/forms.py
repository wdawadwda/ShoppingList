from django import forms

class BillForm(forms.Form):
    bill = forms.FileField()
    date = forms.DateTimeField()
    bill_text = forms.CharField()
    ai_model = forms.CharField()

    def get_absolute_url(self):
        return self.img.url
