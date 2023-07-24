// Capturando o elemento do botão "Enviar"
const submitButton = document.getElementById("submit-button");

// Adicionando um ouvinte de eventos para o clique no botão
submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtendo os valores dos campos de entrada
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    // Criando o objeto com os dados do formulário
    const formData = {
        name: name,
        address: address,
        age: age,
        phone: phone,
        email: email,
    };

    // Enviando os dados para a API (simulação - substitua pela sua API real)
    saveFormData(formData);
});

// Função para enviar os dados do formulário para a API (simulação)
function saveFormData(formData) {
    // Simulação de chamada para a API - você deve substituir este trecho pelo código real para enviar os dados para a sua API
    console.log("Enviando dados para a API:", formData);

    // Exemplo de resposta da API (simulação)
    const response = {
        status: "success",
        message: "Dados do formulário enviados com sucesso!",
    };

    // Exibindo a resposta da API (simulação)
    showMessage(response.message);
}

// Função para exibir a mensagem na tela
function showMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = message;

    // Anexa a mensagem após o formulário
    const form = document.querySelector("form");
    form.insertAdjacentElement("afterend", messageDiv);

    // Remove a mensagem após 3 segundos (opcional)
    setTimeout(function () {
        messageDiv.remove();
    }, 3000);
}
