from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User
from .models import UserProfile

class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, required=True)
    age = forms.IntegerField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'age')

class UserProfileChangeForm(UserChangeForm):
    email = forms.EmailField(max_length=254, required=True)
    age = forms.IntegerField(required=True)

    class Meta:
        model = UserProfile
        fields = ('email', 'age')
        exclude = ('password',)