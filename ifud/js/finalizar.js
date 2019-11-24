$(document).ready(function () {
    carrinho = JSON.parse(localStorage.getItem('carrinho'))
    if (!carrinho) {
        $('#msg').html('<p class="center-align">Seu carrinho está vazio</p>')
    } else {
        total = 0;

        $.each(carrinho, function (key, val) {
            vvalor = formatarValor(parseFloat(val.valor), 'us')
            valor = formatarValor(parseFloat(val.valor), 'br')
            total = parseFloat(total) + parseFloat(val.valor);

            $('#modalCarrinho tbody').html('');

            $('#carrinho tbody').append(`
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

            vtotal = formatarValor(parseFloat(total), 'us') // formatado p/ pagseguro
            total = formatarValor(parseFloat(total), 'br');
            $('#carrinho tbody').append(`
                <tr>
                    <td colspan="3">Total:</td>
                    <td colspan="3">${total}</td>
                </tr>
            `)

            pagseguroKey = parseInt(key) + 1
            $('#produtos').append(`
                <input name="itemId${pagseguroKey}" type="hidden" value="${val.id}">  
                <input name="itemDescription${pagseguroKey}" type="hidden" value="${val.produto}">  
                <input name="itemAmount${pagseguroKey}" type="hidden" value="${vvalor}">  
                <input name="itemQuantity${pagseguroKey}" type="hidden" value="${val.qtde}">  
                <input name="itemWeight${pagseguroKey}" type="hidden" value="1000">  
            `)
        });
    }
});