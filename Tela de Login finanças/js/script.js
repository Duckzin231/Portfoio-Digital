document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.querySelector(".btn-register");
    const loginButton = document.querySelector(".btn-login");

    // Função para registrar um novo usuário
    if (registerButton) {
        registerButton.addEventListener("click", function (event) {
            event.preventDefault();
            const nome = document.querySelector("input[name='nome']").value.trim();
            const email = document.querySelector("input[name='email']").value.trim();
            const usuario = document.querySelector("input[name='usuario']").value.trim();
            const senha = document.querySelector("input[name='senha']").value.trim();
            const confirmarSenha = document.querySelector("input[name='confirmar-senha']").value.trim();

            if (!nome || !email || !usuario || !senha || !confirmarSenha) {
                alert("Todos os campos são obrigatórios!");
                return;
            }

            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem!");
                return;
            }

            if (senha.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres.");
                return;
            }

            // Verifica se o usuário já existe no LocalStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(user => user.usuario === usuario || user.email === email)) {
                alert("Usuário ou e-mail já cadastrados!");
                return;
            }

            // Armazena o novo usuário no LocalStorage
            users.push({ nome, email, usuario, senha });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Cadastro realizado com sucesso! Agora faça o login.");
            window.location.href = "index.html"; // Redireciona para a tela de login
        });
    }

    // Função para fazer login
    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            event.preventDefault();
            const usuario = document.querySelector("input[name='usuario']").value.trim();
            const senha = document.querySelector("input[name='senha']").value.trim();

            if (!usuario || !senha) {
                alert("Preencha todos os campos!");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.usuario === usuario && user.senha === senha);

            if (user) {
                alert("Login bem-sucedido! Redirecionando...");
                localStorage.setItem("loggedUser", JSON.stringify(user));
                window.location.href = "dashboard.html"; // Redireciona para o painel do usuário
            } else {
                alert("Usuário ou senha incorretos!");
            }
        });
    }
});
