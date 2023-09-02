from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from .forms import SignUpForm, UserProfileChangeForm
from .models import UserProfile
from django.http import JsonResponse

@login_required  # Isso garante que o usuário esteja autenticado para acessar essa página
def dashboard(request):
    return render(request, 'accounts/dashboard.html')

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)  # Não salve o usuário ainda
            age = form.cleaned_data['age']  # Obtenha a idade do formulário
            user.save()

            # Agora que o usuário foi salvo, crie o UserProfile associado com a idade
            UserProfile.objects.create(user=user, age=age)

            return redirect('dashboard')  # Redirecione para a página do usuário após o cadastro
    else:
        form = SignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            # Você pode enviar uma resposta JSON para o Frontend
            return JsonResponse({'success': True, 'message': 'Login bem-sucedido'})
        else:
            # Se o formulário não for válido, envie uma resposta JSON com os erros
            return JsonResponse({'success': False, 'errors': form.errors})

def logout(request):
    if request.method == 'POST':
        auth_logout(request)
        return redirect('login')  # Redirecione para a página inicial após o logout
    return render(request, 'accounts/logout.html')

@login_required
def edit_profile(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        fields_form = UserProfileChangeForm(request.POST, instance=request.user)
        password_form = PasswordChangeForm(user=request.user, data=request.POST)
        
        if fields_form.is_valid():
            fields_form.save()
        
        if password_form.is_valid():
            user = password_form.save()
            update_session_auth_hash(request, user)

        return redirect('accounts:dashboard')
    else:
        fields_form = UserProfileChangeForm(instance=request.user)
        password_form = PasswordChangeForm(user=request.user)
    
    return render(request, 'accounts/edit_profile.html', {'fields_form': fields_form, 'password_form': password_form})