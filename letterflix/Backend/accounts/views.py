from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from .forms import SignUpForm, UserProfileChangeForm
from .models import UserProfile
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        form_data = json.loads(request.body)
        form = SignUpForm(form_data)
        if form.is_valid():
            user = form.save(commit=False)
            age = form.cleaned_data['age']
            user.save()

            UserProfile.objects.create(user=user, age=age)

            return HttpResponse({'success': True, 'message': 'Cadastro bem-sucedido'})
        else:
            errors = {}
            for field, error in form.errors.items():
                errors[field] = error[0]
            return HttpResponse({'success': False, 'errors': errors})

    return HttpResponse("Método de solicitação não suportado.")

@csrf_exempt
def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=json.loads(request.body))
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            return HttpResponse("Login bem-sucedido. Redirecionando...")
        return HttpResponse("Login falhou. Tente novamente.")
    return HttpResponse("Método de solicitação não suportado.")

def logout(request):
    if request.method == 'POST':
        auth_logout(request)
        return redirect('login')  # Redirecione para a página inicial após o logout
    return render(request, 'accounts/logout.html')

@csrf_exempt
@login_required
def edit_profile(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        data = json.loads(request.body)
        fields_form = UserProfileChangeForm(data, instance=request.user)
        password_form = PasswordChangeForm(user=request.user, data=data)
        
        if fields_form.is_valid():
            fields_form.save()
        
        if password_form.is_valid():
            user = password_form.save()
            update_session_auth_hash(request, user)

        return HttpResponse({'success': True, 'message': 'Perfil atualizado com sucesso'})
    else:
        fields_form = UserProfileChangeForm(instance=request.user)
        password_form = PasswordChangeForm(user=request.user)
    
    return render(request, 'accounts/edit_profile.html', {'fields_form': fields_form, 'password_form': password_form})