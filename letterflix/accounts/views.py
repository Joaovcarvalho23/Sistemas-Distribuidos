from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required

@login_required  # Isso garante que o usuário esteja autenticado para acessar essa página
def dashboard(request):
    return render(request, 'accounts/dashboard.html')

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('login')  # Redirecionar para a página de login após o cadastro
    else:
        form = UserCreationForm()
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
