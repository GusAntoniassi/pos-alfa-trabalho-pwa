<h1 class="center-align">Finalizar Pedido</h1>
<p>Produtos:</p>
<table class="striped" id="carrinho">
	<thead>
		<tr>
			<td>Foto</td>
			<td>Produto</td>
			<td>Qtde</td>
			<td>Valor</td>
		</tr>
	</thead>
	<tbody>

	</tbody>
</table>

<!-- Declaração do formulário -->  
<form method="post" target="pagseguro"  
action="https://pagseguro.uol.com.br/v2/checkout/payment.html">  
          
        <!-- Campos obrigatórios -->  
        <input name="receiverEmail" type="hidden" value="gus.antoniassi@gmail.com">  
        <input name="currency" type="hidden" value="BRL"> 

        <div id="produtos"></div> 

        <!-- Dados do comprador (opcionais) -->  
        <input name="senderName" type="text" placeholder="Digite seu nome" required>   
        <input name="senderEmail" type="text" placeholder="Digite seu e-mail" required>  
  
       <button type="submit" class="btn red darken-4">
       	Efetuar Pagamento
       </button>          
</form>