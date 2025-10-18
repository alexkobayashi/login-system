// CONFIGURE SUAS CREDENCIAIS AQUI
const SUPABASE_URL = 'https://ppawtpathweyfkekaykq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYXd0cGF0aHdleWZrZWtheWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MDk3MTQsImV4cCI6MjA3NjM4NTcxNH0.CmUXhoV19q8yaW_-qWsdIIJ7eHI1vnSOwk9s--5gm9o';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função para mostrar mensagens
function showMessage(message, isError = false) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.color = isError ? '#e74c3c' : '#27ae60';
    }
}

// Página de Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            showMessage('Erro: ' + error.message, true);
        } else {
            showMessage('Login realizado com sucesso!');
            setTimeout(() => window.location.href = 'dabrd.html', 1000);
        }
    });
}

// Página de Cadastro
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            showMessage('Erro: ' + error.message, true);
        } else {
            showMessage('Cadastro realizado! Verifique seu e-mail.');
        }
    });
}

// Dashboard - Verificar se está logado
if (window.location.pathname.includes('dabrd.html')) {
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('userEmail').textContent = session.user.email;
        }
    });
}

// Função de Logout
async function handleLogout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            showMessage('Erro ao fazer logout: ' + error.message, true);
        } else {
            showMessage('Logout realizado com sucesso!');
            setTimeout(() => window.location.href = 'index.html', 1000);
        }
    } catch (error) {
        showMessage('Erro inesperado ao fazer logout', true);
    }
}

// Adicionar evento de logout ao botão quando existir
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}