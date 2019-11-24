$(document).ready(function () {
    categoria = localStorage.getItem('categoria'+id)

    if (categoria) {
        dados = JSON.parse(categoria)
        preencher(dados)
    } else {
        url = base_url + "request.php?url=" + encodeURIComponent('https://pwa.professorburnes.com.br/json/categoria.php?op=categoria&id=' + id)

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
            localStorage.setItem('categoria'+id, JSON.stringify(dados));
            preencher(dados);
        }).fail(function() {

        }).always(function() {
            $('#msg').html('');
        })
    }
});