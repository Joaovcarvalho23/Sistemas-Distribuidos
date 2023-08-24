from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from .forms import SignUpForm, UserProfileChangeForm
from .models import UserProfile

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
            return redirect('dashboard')  # Redirecionar para a página de boas-vindas após o login
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})

def logout(request):
    if request.method == 'POST':
        auth_logout(request)
        return redirect('login')  # Redirecione para a página inicial após o logout
    return render(request, 'accounts/logout.html')

@login_required
def edit_profile(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        form = UserProfileChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('accounts:dashboard')
    else:
        form = UserProfileChangeForm(instance=request.user)
    
    return render(request, 'accounts/edit_profile.html', {'form': form})