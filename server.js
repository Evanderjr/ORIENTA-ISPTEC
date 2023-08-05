const express = require('express');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = 3000;

// Configure o SendGrid com sua API Key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

app.use(express.json());
// Configuração para servir o arquivo index.html
app.use(express.static('public'));

// Iniciando o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:5000`);
});
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

app.post('/submit-test', async (req, res) => {
  const { name, email, answers } = req.body;

  userAnswers = answers;

  const result = calculateResults();
  const resultText = `${result.name}. ${result.description}\nCarreiras relacionadas: ${result.careers.join(', ')}`;

  const msg = {
    to: email,
    from: 'evanderjr10@gmail.com', // Substitua pelo seu e-mail de envio
    subject: 'Resultado do Teste Vocacional',
    text: `Obrigado por fazer o teste vocacional, ${name}! Seu resultado é:\n${resultText}`,
  };

  try {
    await sgMail.send(msg);
    res.json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao enviar o e-mail.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:5000`);
});
