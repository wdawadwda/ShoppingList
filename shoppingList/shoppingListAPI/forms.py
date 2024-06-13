from django import forms

class BillForm(forms.Form):
    bill = forms.FileField()
    date = forms.DateTimeField(required=False)
    bill_text = forms.CharField(required=False)
    ai_model = forms.CharField(required=False)

    def get_absolute_url(self):
        return self.bill.url
