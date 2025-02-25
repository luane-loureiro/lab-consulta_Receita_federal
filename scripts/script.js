//------- Objeto com as mensagens de erro ------//
const mensagens = {
    input: {
        valueMissing: 'O campo não pode estar vazio.',
        tooShort: 'O campo não tem caracteres suficientes.',
        cnpjInvalido: 'O CNPJ digitado não é válido.',
        cnpjFormatoInvalido: 'CNPJ não pode conter letras ou caracteres especiais.',
        razaoInvalida: "A Razão Social deve ter pelo menos 5 caracteres e não conter apenas números.",
        caracteresInvalidos: 'O campo não pode conter caracteres especiais.'
    }
};

// ----- Validação do CNPJ ----- //
function validarCNPJ(valor) {
    valor = valor.replace(/[^\d]+/g, '');

    if (valor.length !== 14) return false;
    if (/^(\d)\1+$/.test(valor)) return false;

    let tamanho = valor.length - 2;
    let numeros = valor.substring(0, tamanho);
    let digitos = valor.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho += 1;
    numeros = valor.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado == digitos.charAt(1);
}

// ----- Validação da Razão Social ----- //
function validarRazaoSocial(valor) {
    return valor.length >= 5 && !/^\d+$/.test(valor);
}

// ----- Validação de caracteres especiais ----- //
function contemCaracteresEspeciais(valor) {
    // Permite apenas letras, números e espaços
    return /[^a-zA-Z0-9\s]/.test(valor);
}

// ----- Função para exibir mensagens de erro ---- //
function exibirErros(campo, mensagem) {
    const mensagemErroElemento = campo.parentNode.querySelector(".mensagem-erro");
    mensagemErroElemento.innerText = mensagem || '';
}

// ----- Atualiza o estado do botão submit ----- //
function atualizarEstadoSubmit(campo) {
    const submitButton = document.getElementById("submitButton");
    const valor = campo.value.trim();

    let mensagemErro = '';

    if (!valor) {
        mensagemErro = mensagens.input.valueMissing;
    } else if (contemCaracteresEspeciais(valor)) {
        mensagemErro = mensagens.input.caracteresInvalidos;
    } else if (/^\d+$/.test(valor)) {
        if (!validarCNPJ(valor)) {
            mensagemErro = mensagens.input.cnpjInvalido;
        }
    } else {
        if (!validarRazaoSocial(valor)) {
            mensagemErro = mensagens.input.razaoInvalida;
        }
    }

    exibirErros(campo, mensagemErro);
    submitButton.disabled = !!mensagemErro;
}

// ----- Eventos e Integração ---- //
document.addEventListener("DOMContentLoaded", function () {
    const campoInput = document.getElementById("consulta");  // Usando o ID correto
    const submitButton = document.getElementById("submitButton");

    campoInput.addEventListener("input", function () {
        atualizarEstadoSubmit(campoInput);
    });

    document.getElementById("consulta-Form").addEventListener("submit", function (e) {
        e.preventDefault();

        if (!submitButton.disabled) {
            const valor = campoInput.value.trim();

            // Verifica se é CNPJ ou Razão Social
            const tipoConsulta = /^\d+$/.test(valor) ? "CNPJ" : "Razão Social";

            // Exibe no console o tipo de consulta e o valor digitado
            alert(`Tipo de consulta: ${tipoConsulta}`);
            alert(`Valor digitado: ${valor}`);

            const listaResposta = {
                tipo: tipoConsulta,
                valor: valor
            };

            localStorage.setItem("consulta", JSON.stringify(listaResposta));
            window.location.href = './Index.html';
        }
    });
});
