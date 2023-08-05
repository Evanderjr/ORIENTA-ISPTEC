const userContainer = document.getElementById('user-container');
const btnNext = document.getElementById('btn-next');
const form = document.querySelector('form');

const careerTypes = {
    A: {
        name: 'Tipo A',
        description: 'A principal característica do tipo A é o movimento. Gostam de novidade, apresentam destreza física e boa expressão corporal. Se forem mais propensos ao raciocínio lógico, terão mais êxito em profissões que requeiram precisão e acuidade. Se forem mais inclinados ao sentimento e a emoção, as profissões relacionadas ao trato com pessoas são as mais indicadas. Pessoas do tipo A não gostam de rotina e veem o trabalho como uma grande fonte de prazer.',
        careers: ['Desportista', 'Chef de cozinha', 'Jornalista', 'Dermatologista', 'Personal trainer', 'Relações públicas']
    },
    B: {
        name: 'Tipo B',
        description: 'Comando e responsabilidade são duas palavras que definem as pessoas do tipo B. Elas gostam de lidar com fatos, quantidades, análises, organização e planeamento. Trabalham duro e preferem profissões que lhes proporcionem status e possibilidade de crescimento. São as mais presentes no mundo corporativo.',
        careers: ['Administrador de empresas', 'Advogado', 'Engenheiro químico/mecânico', 'Assistente social', 'Delegado']
    },
    C: {
        name: 'Tipo C',
        description: 'Facilmente reconhecíveis por seu entusiasmo e interesse nas relações humanas, as pessoas do tipo C têm na intuição o seu ponto forte. Muitas endereçam seu esforço e talento para o desenvolvimento intelectual de alunos e discípulos e o conforto psicológico de pacientes e colegas de trabalho. No grupo C, estão as responsabilidades mais laureadas com o Nobel da Paz e de literatura.',
        careers: ['Professor', 'Psicólogo', 'Psiquiatra', 'Pedagogo', 'Tradutor', 'Sociólogo', 'Escritor']
    },
    D: {
        name: 'Tipo D',
        description: 'São intuitivos como os C, mas, em vez de se preocupar com pessoas, costumam focar seus interesses em grandes áreas do conhecimento, como ciência e tecnologia. Apresentam notável capacidade para identificar problemas concretos e resolvê-los, bem como para o raciocínio abstrato.',
        careers: ['Analista de sistemas', 'Arquiteto', 'Criador de software', 'Designer industrial', 'Engenheiro', 'Físico', 'Matemático', 'Químico', 'Pesquisador', 'Economista']
    }
};

let userAnswers = {};

async function fetchRandomUser() {
    try {
        const response = await fetch('http://localhost:3000/random-user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter usuário aleatório:', error);
        return null;
    }
}

function displayUser(user) {
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `
        <p><strong>Nome:</strong> ${user.name.first} ${user.name.last}</p>
        <p><strong>Gênero:</strong> ${user.gender}</p>
        <p><strong>E-mail:</strong> ${user.email}</p>
        <p><strong>País:</strong> ${user.location.country}</p>
        <hr>
    `;
    userContainer.appendChild(userDiv);
}

function calculateResults() {
    let typeScores = { A: 0, B: 0, C: 0, D: 0 };

    for (let i = 1; i <= 21; i++) {
        const answer = userAnswers['q' + i];
        if (answer) {
            typeScores[answer]++;
        }
    }

    const highestType = Object.keys(typeScores).reduce((a, b) => (typeScores[a] > typeScores[b] ? a : b));

    return careerTypes[highestType];
}

async function loadRandomUser() {
    const randomUser = await fetchRandomUser();
    if (randomUser) {
        displayUser(randomUser);
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtenha as respostas do usuário
    for (let i = 1; i <= 21; i++) {
        const answer = form.elements['q' + i].value;
        if (answer) {
            userAnswers['q' + i] = answer;
        }
    }

    // Calcula os resultados e exibe
    const result = calculateResults();
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `
        <h2>Resultado:</h2>
        <p><strong>Tipo:</strong> ${result.name}</p>
        <p>${result.description}</p>
        <p><strong>Carreiras relacionadas:</strong></p>
        <ul>
            ${result.careers.map(career => `<li>${career}</li>`).join('')}
        </ul>
    `;

    userContainer.appendChild(resultDiv);

    // Enviar email com os resultados (usando nodemailer)
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'marlene.kihn@ethereal.email',
            pass: 'nXAsbNeMfYCrynrzWR'
        }
    });

    const mailOptions = {
        from: 'evanderjr10@gmail.com',
        to: randomUser.email, // email do usuário aleatório obtido
        subject: 'Resultado do Teste Vocacional',
        text: `Obrigado por fazer o teste vocacional, ${randomUser.name.first}! Seu resultado é:\n\nTipo: ${result.name}\nDescrição: ${result.description}\nCarreiras Relacionadas:\n${result.careers.join('\n')}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
        } else {
            console.log('Email enviado:', info.response);
        }
    });
});

btnNext.addEventListener('click', () => {
    // Limpa o conteúdo atual do usuário antes de carregar o próximo
    userContainer.innerHTML = '';
    loadRandomUser();
});

// Carrega o primeiro usuário ao carregar a página
loadRandomUser();