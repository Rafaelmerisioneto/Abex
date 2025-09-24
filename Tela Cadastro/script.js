const tipoDoc = document.getElementById("tipoDoc");
const docField = document.getElementById("docField");
const cepInput = document.getElementById("cep");
const semEndereco = document.getElementById("semEndereco");
const enderecoContainer = document.getElementById("enderecoContainer");

// Função para aplicar máscara
function aplicarMascara(valor, tipo) {
  valor = valor.replace(/\D/g, ""); // remove tudo que não é número

  if (tipo === "cpf") {
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else if (tipo === "cnpj") {
    valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
  } else if (tipo === "cep") {
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  }

  return valor;
}

// Atualiza campo CPF/CNPJ
tipoDoc.addEventListener("change", () => {
  if (tipoDoc.value === "cpf") {
    docField.innerHTML = `
      <label for="cpf">CPF:</label>
      <input type="text" id="cpf" name="cpf" maxlength="14" placeholder="000.000.000-00" required>
    `;
    const cpfInput = document.getElementById("cpf");
    cpfInput.addEventListener("input", () => {
      cpfInput.value = aplicarMascara(cpfInput.value, "cpf");
    });
  } else if (tipoDoc.value === "cnpj") {
    docField.innerHTML = `
      <label for="cnpj">CNPJ:</label>
      <input type="text" id="cnpj" name="cnpj" maxlength="18" placeholder="00.000.000/0000-00" required>
    `;
    const cnpjInput = document.getElementById("cnpj");
    cnpjInput.addEventListener("input", () => {
      cnpjInput.value = aplicarMascara(cnpjInput.value, "cnpj");
    });
  } else {
    docField.innerHTML = "";
  }
});

// Máscara no campo CEP
cepInput.addEventListener("input", () => {
  cepInput.value = aplicarMascara(cepInput.value, "cep");
});

// Checkbox para desabilitar endereço
semEndereco.addEventListener("change", () => {
  if (semEndereco.checked) {
    enderecoContainer.classList.add("desabilitado");
    enderecoContainer.querySelectorAll("input, select").forEach(el => el.disabled = true);
  } else {
    enderecoContainer.classList.remove("desabilitado");
    enderecoContainer.querySelectorAll("input, select").forEach(el => el.disabled = false);
  }
});

// Simulação de envio
document.getElementById("cadastroForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Usuário cadastrado com sucesso!");
});
