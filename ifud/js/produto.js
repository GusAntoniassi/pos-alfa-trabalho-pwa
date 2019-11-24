$(document).ready(function () {
    produto = localStorage.getItem('produto' + id);

    if (produto) {
        console.log('pegando produto do cache');
        dados = JSON.parse(produto);

        preencherProduto(dados);
    } else {

        $('#msg').html(`
            <img src="images/load.gif" alt="Carregando"> Aguarde, carregando dados...
        `)
        buscarProduto().done(function (produto) {
            console.log('guardando produto no cache');
            localStorage.setItem('produto' + id, JSON.stringify(produto));
            preencherProduto(produto);
        }).fail(function () {

        }).always(function () {
            $('#msg').html('');
        })
    }

});

function buscarProduto() {
    url = base_url + "request.php?url=" + encodeURIComponent('https://pwa.professorburnes.com.br/json/produtos.php?op=produto&id=' + id)

    return $.get({
        url: url,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', 'pwa.professorburnes.com.br');
        },
    })
}

//funcao para mostrar o produto na tela
function preencherProduto(dados) {
    $.each(dados, function (key, val) {
        $("h1").html(val.produto);

        valor = formatarValor(parseFloat(val.valor), "br");

        $(".produto").html(`
			<img src="${val.foto}" alt="${val.produto}" class="responsive-img">
			<h2>${val.produto}</h2>
			<p>${val.ingredientes}</p>
			<p class="valor">${valor}</p>
			<button type="button" class="btn red darken-4" onclick="adicionar(${val.id})">Adicionar ao Pedido</button>
		`);
        //retirar a mensagem de aguardando
        $("#msg").html("");
    });
}

// add produto no carrinho

function adicionar(id) {
    dados = JSON.parse(localStorage.getItem("produto" + id));

    $(document).scrollTop();
    $('#msg').html(`<img src="images/load.gif" alt="Carregando">Aguarde, carregando...`);

    if (!dados) {
        buscarProduto().done(function (produto) {
            localStorage.setItem('produto' + id, JSON.stringify(produto));
        }).always(function () {
            $('#msg').html('');
        })
    }

    carrinho = JSON.parse(localStorage.getItem("carrinho"));

    if (!carrinho) {
        carrinho = [];
    }

    $.each(dados, function (key, val) {
        var {q, index} = buscaItem(carrinho, val.id)

        if (q == 0) {
            console.log('Não existe item no carrinho');
            // criar o item
            item = {
                id: val.id,
                produto: val.produto,
                valor: val.valor,
                foto: val.foto,
                qtde: 1
            }
            carrinho.push(item);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        } else {
            console.log(carrinho[index]);
            carrinho[index].qtde += 1;
            carrinho[index].valor = val.valor * carrinho[index].qtde;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
    });

    preencherCarrinho(carrinho);

    $('#modalCarrinho').modal('open');
}

function buscaItem(carrinho, id) {
    var q = 0;
    var index = null;

    $.each(carrinho, function (key, val) {
        if (val.id == id) {
            q++;
            index = key;
        };
    });

    return {q, index};
}

function preencherCarrinho(dados) {
    total = 0;
    
    $('#modalCarrinho tbody').html('');

    if (!dados || !dados.length) {
        $('#modalCarrinho table').html('<hr><p>O seu carrinho está vazio</p>');
        return;
    }
 
    $.each(dados, function (key, val) { 
         valor = formatarValor(parseFloat(val.valor), 'br')
         total = parseFloat(total) + parseFloat(val.valor);


         $('#modalCarrinho tbody').append(`
            <tr class="linha${key}">
                <td><img src="${val.foto}" alt="${val.produto}" width="30px"></td>
                <td>${val.produto}</td>
                <td>${val.qtde}</td>
                <td>${valor}</td>
                <td><a href="javascript:remover(${key})"
                    class="btn red">
                    <i class="material-icons">clear</i>
                </td>
            </tr>
            `)
    });

    total = formatarValor(parseFloat(total), 'br');
    $('#modalCarrinho tbody').append(`
        <tr>
            <td colspan="3">Total:</td>
            <td colspan="3" id="carrinho-total">${total}</td>
        </tr>
    `)
}

function remover(id) { 
    if (confirm('Deseja mesmo remover?')) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'))
        carrinho.splice(id, 1)
        localStorage.setItem('carrinho', JSON.stringify(carrinho))

        preencherCarrinho(carrinho);
    }
 }