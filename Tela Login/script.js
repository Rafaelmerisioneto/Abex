const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const pwdInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePwd');
    const remember = document.getElementById('remember');
    const submitBtn = document.getElementById('submitBtn');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formMessage = document.getElementById('formMessage');

    const MOCK_USER = { email: 'user@example.com', password: 'Password123' };

    function init() {
      const saved = localStorage.getItem('login.remember');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.email) emailInput.value = data.email;
          remember.checked = true;
        } catch(e){}
      }
    }
    init();

    toggleBtn.addEventListener('click', ()=>{
      const isPwd = pwdInput.type === 'password';
      pwdInput.type = isPwd ? 'text' : 'password';
      toggleBtn.textContent = isPwd ? 'Ocultar' : 'Mostrar';
    });

    function validate(){
      let ok = true;
      emailError.style.display = 'none';
      passwordError.style.display = 'none';
      emailError.textContent = '';
      passwordError.textContent = '';

      const email = emailInput.value.trim();
      const pwd = pwdInput.value;

      if (!email) {
        emailError.textContent = 'O email é obrigatório.';
        emailError.style.display = 'block';
        ok = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Insira um email válido.';
        emailError.style.display = 'block';
        ok = false;
      }

      if (!pwd) {
        passwordError.textContent = 'A senha é obrigatória.';
        passwordError.style.display = 'block';
        ok = false;
      } else if (pwd.length < 6) {
        passwordError.textContent = 'A senha deve ter ao menos 6 caracteres.';
        passwordError.style.display = 'block';
        ok = false;
      }

      return ok;
    }

    function mockAuthenticate(email, password){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          if (email === MOCK_USER.email && password === MOCK_USER.password) {
            resolve({ success:true, token: 'fake-token', name: 'Usuário Teste' });
          } else {
            resolve({ success:false, message: 'Email ou senha inválidos.' });
          }
        }, 700);
      });
    }

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      formMessage.textContent = '';
      formMessage.className = '';

      if (!validate()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Entrando...';

      const email = emailInput.value.trim();
      const pwd = pwdInput.value;

      const res = await mockAuthenticate(email, pwd);
      if (res.success) {
        formMessage.textContent = 'Login bem-sucedido!';
        formMessage.className = 'success';

        if (remember.checked) {
          localStorage.setItem('login.remember', JSON.stringify({ email }));
        } else {
          localStorage.removeItem('login.remember');
        }
        localStorage.setItem('auth.token', res.token);
      } else {
        formMessage.textContent = res.message;
        formMessage.className = 'error';
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Entrar';
    });