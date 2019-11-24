$(document).ready(function() {
    var destaques = localStorage.getItem('destaques')

    if (destaques) {
        console.log('informações do cache');
        preencher(JSON.parse(destaques))
    } else {
        console.log('informações do JSON');
        // url = "http://localhost:8080/json/produtos.php?op=destaques"
        url = base_url + "request.php?url=" + encodeURIComponent('https://pwa.professorburnes.com.br/json/produtos.php?op=destaques');
        
        $('#msg').html(`
            <img src="images/load.gif" alt="Carregando"> Aguarde, carregando dados...
        `)
        $.get(url, {
            dataType: "json",
            headers: {
                'X-Requested-With': 'pwa.professorburnes.com.br',
                'Origin': 'pwa.professorburnes.com.br'
            }  
        }).done(function(dados) {
            console.log('guardando dados no cache');   
            localStorage.setItem('destaques', JSON.stringify(dados));
            preencher(dados);
        }).fail(function() {

        }).always(function() {
            $('#msg').html('');
        })
    }
})