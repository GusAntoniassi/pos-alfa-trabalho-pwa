function formatarValor(valor, formato) {
    if (formato == 'br') {
        valor = valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    } else {
        valor = valor.toLocaleString("en-US", {
            minimumFractionDigits: 2
        })

    }

    return valor;
}

function preencher(dados) {
    console.log('dados', dados);
    $.each(dados, function (key, val) {
        valor = formatarValor(parseFloat(val.valor), 'br');

        $('#produtos').append(`
            <div class="col s12 m6 center-align">
            <div class="card">
                <img src="${val.foto}" alt="${val.produto}" class="responsive-img">
                <h2>${val.produto}</h2>
                <p class="valor">${valor}</p>
                <a href="produto/${val.id}" class="btn red">Detalhes</a>
            </div>
            </div>
        `)

        $('#msg').html('');
    })

}

$(document).ready(function () {
    categoria = localStorage.getItem('categoria')

    if (categoria) {
        dados = JSON.parse(categoria)
        preencherCategorias(dados)
    } else {
        url = base_url + "request.php?url=" + encodeURIComponent('https://pwa.professorburnes.com.br/json/categoria.php?op=categorias')

        $('#msg').html(`
            <img src="images/load.gif" alt="Carregando"> Aguarde, carregando dados...
        `)
        $.get({
            url: url,
            dataType: "json",
            beforeSend: function(xhr){
                xhr.setRequestHeader('X-Requested-With', 'pwa.professorburnes.com.br');
            },
        }).done(function(dados) {
            console.log('guardando categoria no cache');   
            localStorage.setItem('categoria', JSON.stringify(dados));
            preencherCategorias(dados);
        }).fail(function() {

        }).always(function() {
            $('#msg').html('');
        })
    }
});

function preencherCategorias(dados) {
    $.each(dados, function (key, val) { 
        console.log('val', val);
        $('#menu-categorias').append(`
        <li>
            <a href="categoria/${val.id}">
                ${val.categoria}
            </a>
        </li>
        `)
    });
}

// service worker
// verificar se o navegador possui suporte a sw
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {  
        console.log('Service worker registrado no escopo: ', registration.scope);
    }, function(err) {
        console.log('Erro ao registrar: ', error);
    })
} else {
    console.log('O navegador não tem suporte a service worker');
}

// mostrar banner de instalação app 2 home (a2h)
let deferredPrompt;
const addBtn = $('#instalar')[0];

window.addEventListener('beforeinstallprompt', (e) => {
    if (!addBtn) { return; }
    
    console.log('prmpt de instlç');
    e.preventDefault();
    deferredPrompt = e;
    addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(choiceResult => {
            if (!choiceResult.outcome === 'accepted') {
                addBtn.style.display = 'block';
                return;
            }

            console.log(choiceResult.outcome);
        })
    });
})

window.addEventListener('appinstalled', (e) => {
    console.log('Aplicativo instalado');
})
