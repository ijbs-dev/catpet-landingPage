# CatPET - Landing Page Moderna

Bem-vindo ao repositório da **CatPET**, uma landing page moderna desenvolvida para uma empresa ficticia (afim de estudos) que combina tecnologia e o amor por animais de estimação. Esta página foi criada para facilitar a conexão entre clientes e seus novos companheiros de maneira prática e inovadora.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Configuração do EmailJS](#configuração-do-emailjs)
- [Carregamento Dinâmico de Serviços e Depoimentos](#carregamento-dinâmico-de-serviços-e-depoimentos)
- [Seções da Página](#seções-da-página)
- [Customização](#customização)

## Visão Geral

A **CatPET** utiliza tecnologias modernas como **Tailwind CSS**, **Swiper.js** e **AOS.js** para criar uma experiência fluida e responsiva. A página contém seções para **sobre a empresa**, **serviços oferecidos**, **testemunhos de clientes**, e um **formulário de contato** integrado com **EmailJS** para facilitar a comunicação com os clientes.

## Tecnologias Utilizadas

- **HTML5**: Estruturação do conteúdo.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e eficiente.
- **Swiper.js**: Carrossel de imagens moderno e responsivo.
- **AOS.js**: Animações ao rolar a página.
- **EmailJS**: Envio de emails através do formulário de contato.
- **FontAwesome**: Ícones para redes sociais e outros elementos visuais.

## Funcionalidades

- **Design Responsivo**: A página se adapta perfeitamente a qualquer dispositivo, garantindo uma boa experiência em smartphones, tablets e desktops.
- **Slider/Carrossel**: Imagens rotativas automáticas no banner com navegação manual.
- **Animações Suaves**: Animações com AOS.js para melhorar a experiência de rolagem.
- **Formulário de Contato Funcional**: Envio de emails através de EmailJS, com validação básica de formulário.
- **Menu Fixo**: O menu de navegação permanece fixo no topo da página durante a rolagem.

## Estrutura do Projeto

O projeto segue uma estrutura de diretórios simples:

```
catpet-landing-page/
│
├── index.html              # Página principal
├── css/
│   └── style.css           # Arquivos CSS personalizados
├── js/
│   └── script.js           # Scripts JavaScript
├── images/
│   └── [imagens do projeto]# Imagens usadas na página
└── README.md               # Documentação do projeto
```

## Pré-requisitos

Para rodar este projeto localmente, você precisará de:

- Um navegador moderno (Google Chrome, Firefox, etc.).
- **Opcional**: Node.js e npm, caso queira modificar ou instalar pacotes como Tailwind CSS.

## Como Rodar o Projeto

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/catpet-landing-page.git
   ```

2. **Abrir o arquivo `index.html`** no navegador. 

   - **Dica**: Você pode usar uma extensão de servidor local para evitar problemas de caminhos relativos ou simplesmente abrir o arquivo clicando duas vezes no `index.html`.

## Configuração do EmailJS

### 1. Criar uma conta no EmailJS

- Acesse o site [EmailJS](https://www.emailjs.com/) e crie uma conta. O EmailJS permite a integração fácil de formulários de contato em websites sem a necessidade de um servidor backend.

### 2. Criar um Email Service e Template

Após criar sua conta, siga os passos abaixo para configurar o **Email Service** e o **Email Template**:

1. **Criar Email Service**:
   - No painel do EmailJS, vá até **Email Services** e clique em **Add new service**.
   - Selecione o provedor de email que deseja usar (como Gmail, Yahoo, etc.) e conecte sua conta de email.

2. **Criar Email Template**:
   - Vá até **Email Templates** no painel e clique em **Create new template**.
   - Configure o template com os campos que você espera receber do formulário, como `from_name`, `from_email`, `phone`, `message`, etc.
   - Utilize o seguinte código HTML para o corpo do email:

```html
<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Telefone:</strong> {{phone}}</p>
<p><strong>Mensagem:</strong></p>
<p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">
  {{message}}
</p>
<p>
  Att. {{from_name}}
</p>
```

   - Esse template estruturado exibe de maneira clara as informações enviadas pelo usuário.
   - Salve o template.

### 3. Obtenha as chaves necessárias

Depois de configurar o serviço e o template, você precisará das seguintes chaves para integrar o EmailJS com seu formulário:

- **Public Key**: Disponível no painel do EmailJS na área de **API Keys**.
- **Service ID**: O identificador do serviço de email que você configurou (ex: `service_xxx`).
- **Template ID**: O identificador do template de email que você criou (ex: `template_xxx`).

### 4. Integrar o EmailJS no código

No arquivo `js/script.js`, insira as chaves diretamente no código para integrar o EmailJS, sem a necessidade de variáveis de ambiente ou ferramentas como `npm`:

```javascript
// Inicializar o EmailJS com a chave pública diretamente
emailjs.init('your_public_key');  // Substitua 'your_public_key' pela sua Public Key do EmailJS

const btn = document.getElementById('button');
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    btn.value = 'Enviando...';

    // Definir Service ID e Template ID diretamente no código
    const serviceID = 'your_service_id';  // Substitua 'your_service_id' pelo seu Service ID
    const templateID = 'your_template_id';  // Substitua 'your_template_id' pelo seu Template ID

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Enviar';
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contact-form').reset();
        }, (err) => {
            btn.value = 'Enviar';
            alert(JSON.stringify(err));
        });
});
```

### 5. Testar o formulário diretamente no navegador

1. **Abrir o arquivo `index.html`**:
   - Vá até o diretório onde o projeto está salvo.
   - Clique duas vezes no arquivo `index.html` para abri-lo no navegador.
   
2. **Testar o formulário**:
   - Preencha os campos de contato no formulário e clique em "Enviar".
   - Se configurado corretamente, você verá uma mensagem de sucesso, e o email será enviado conforme o template configurado no EmailJS.

### 6. Caso o formulário não funcione: Use o Playground do EmailJS

Se o formulário não funcionar corretamente no seu ambiente local, você pode testar o envio de email usando o **Playground** do EmailJS. O **Playground** permite testar seus templates e configurações de email diretamente no painel do EmailJS, sem precisar usar o frontend. Siga os passos:

1. Acesse a área **Playground** no painel do EmailJS.
2. Escolha o **Email Service** e o **Email Template** que você deseja testar.
3. Preencha os campos necessários e clique em "Send Test".
4. Verifique se o email é enviado corretamente.

### 7. Dicas Importantes

- **Segurança**: Como as chaves estão diretamente no código, é importante ter cuidado ao disponibilizar este projeto publicamente. Embora o EmailJS utilize uma chave pública para o frontend, garanta que a conta do serviço de email está segura e que as permissões de envio estão limitadas de acordo com suas necessidades.
- **Limites gratuitos**: O EmailJS oferece um plano gratuito, mas com limites de envios mensais. Certifique-se de que o volume de emails do seu site está dentro desses limites ou considere planos pagos para aumentar os envios permitidos.

## Carregamento Dinâmico de Serviços e Depoimentos

### Serviços Carregados Dinamicamente

Na seção de **Serviços**, os dados sobre raças de gatos são carregados dinamicamente de uma API pública chamada **The Cat API**. O código JavaScript no arquivo `script.js` faz uma requisição `fetch` para a API e popula o carrossel de serviços na página.

Trecho de código responsável pelo carregamento dinâmico dos serviços:

```javascript
fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
        const servicesContainer = document.getElementById('services-container');
        const breedsWithImages = data.filter(breed => breed.reference_image_id);

        // Criar slides dinamicamente com os dados da API
        breedsWithImages.forEach(breed => {
            const imageUrl = `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`;
            servicesContainer.innerHTML += `
                <div class="swiper-slide bg-white p-6 rounded-lg shadow-md">
                    <img src="${imageUrl}" alt="${breed.name}" class="w-full h-40 object-cover rounded-md">
                    <h3 class="text-lg font-semibold mt-4">${breed.name}</h3>
                    <p class="text-gray-600 mt-2">${breed.temperament}</p>
                </div>
            `;
        });

        servicesSwiper.update();  // Atualiza o carrossel com os novos slides
    })
    .catch(error => {
        console.error('Erro ao carregar os serviços:', error);
        document.getElementById('services-container').innerHTML = `<p class="text-red-500">Erro ao carregar os serviços. Tente novamente mais tarde.</p>`;
    });
```

Esse código faz o seguinte:

- Usa `fetch` para obter uma lista de raças de gatos da **The Cat API**.
- Filtra as raças que possuem uma imagem (`breed.reference_image_id`).
- Gera dinamicamente os slides no carrossel de serviços com as imagens e informações de temperamento das raças.
- Caso ocorra um erro na requisição, é exibida uma mensagem de erro.

### Depoimentos Carregados Dinamicamente

A seção de **Depoimentos** também é carregada dinamicamente, mas desta vez usando a API **JSONPlaceholder**, uma API pública para simular dados. Os depoimentos de usuários são gerados automaticamente.

Trecho de código responsável pelo carregamento dinâmico dos depoimentos:

```javascript
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        const testimonialsContainer = document.getElementById('testimonials-container');

        // Criar slides dinamicamente com os dados da API
        data.forEach((user, index) => {
            const imageUrl = `https://picsum.photos/200?random=${index + 1}`;
            testimonialsContainer.innerHTML += `
                <div class="swiper-slide bg-white p-6 rounded-lg shadow-md">
                    <img src="${imageUrl}" alt="Imagem de ${user.name}" class="w-16 h-16 rounded-full object-cover">
                    <h3 class="text-lg font-semibold mt-4">${user.name}</h3>
                    <p class="text-gray-600 mt-2">${user.company.catchPhrase}</p>
                </div>
            `;
        });

        testimonialsSwiper.update();  // Atualiza o carrossel com os novos slides
    })
    .catch(error => {
        console.error('Erro ao carregar os depoimentos:', error);
        document.getElementById('testimonials-container').innerHTML = `<p class="text-red-500">Erro ao carregar os depoimentos. Tente novamente mais tarde.</p>`;
    });
```

Esse código faz o seguinte:

- Usa `fetch` para obter dados de usuários fictícios da API **JSONPlaceholder**.
- Para cada usuário, gera dinamicamente um slide com a imagem e o nome do usuário, além de uma frase do perfil de sua empresa.
- Atualiza o carrossel de depoimentos com os novos dados obtidos.
- Caso ocorra um erro, uma mensagem de erro é exibida na seção.


## Seções da Página

- **Header Fixo**: Contém o logotipo e o menu de navegação que permanece fixo ao rolar a página.
- **Banner Slider**: Apresenta um carrossel de imagens destacando os principais produtos e serviços.
- **Sobre Nós**: Breve apresentação da empresa e seu propósito.
- **Serviços**: Carrossel que destaca os principais serviços oferecidos.
- **Testemunhos**: Seção com depoimentos de clientes satisfeitos.
- **Entre em Contato**: Formulário para enviar mensagens diretamente à empresa, com integração ao EmailJS.

## Customização

Para personalizar o conteúdo:

- **Imagens**: Substitua as imagens no diretório `images/`.
- **Texto**: Modifique o conteúdo diretamente no arquivo `index.html`.
- **Estilo**: Para alterar estilos, você pode editar o arquivo CSS ou modificar as classes utilitárias do **Tailwind CSS** diretamente no HTML.

