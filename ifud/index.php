<!DOCTYPE html>
<html lang="pt-br">
<head>
	<title>iFud</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<?php 
		$base_uri = sprintf('%s://%s:%s/ifud/', 
			$_SERVER['REQUEST_SCHEME'], 
			$_SERVER['SERVER_NAME'], 
			$_SERVER['SERVER_PORT']);
	?>

	<base href="<?= $base_uri ?>">
	<script>window.base_url = '<?= $base_uri ?>'; </script>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="css/materialize.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">

	<link rel="shortcut icon" sizes="48x48" href="images/icon-48.png">
	<link rel="shortcut icon" sizes="96x96" href="images/icon-96.png">
	<link rel="shortcut icon" sizes="114x114" href="images/icon-114.png">
	<link rel="shortcut icon" sizes="192x192" href="images/icon-192.png">

	<link rel="apple-touch-icon" size="72x72" href="images/apple-72.png">
	<link rel="apple-touch-icon" size="114x114" href="images/apple-114.png">

	<link rel="manifest" href="manifest.json">
</head>
<body>
	<div class="navbar-fixed">
		<ul id="menu-categorias" class="dropdown-content"></ul>

		<nav class="red darken-4">
			<div class="nav-wrapper">
				<a href="index.php" class="brand-logo">
					<img src="images/logo.png" alt="iFud" title="iFud" height="50px">
				</a>
				<a href="javascript:;" data-target="mobile" class="sidenav-trigger">
					<i class="material-icons">menu</i>
				</a>

				<ul id="nav-mobile" class="right hide-on-med-and-down">
					<li>
						<a href="index.php">Home</a>
					</li>
					<li>
						<a href="sobre">Sobre</a>
					</li>
					<li>
						<a href="javascript:;" class="dropdown-trigger" data-target="menu-categorias">
							Categorias
							<i class="material-icons right">arrow_drop_down
							</i>
						</a>
					</li>
					<li>
						<a href="javascript:;">
							<i class="material-icons">
								shopping_cart
							</i>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
	<ul id="mobile" class="sidenav">
		<li>
			<a href="index.php">Home</a>
		</li>
		<li>
			<a href="sobre">Sobre</a>
		</li>
		<li>
			<a href="javascript:;" class="dropdown-trigger" data-target="menu-categorias">
				Categorias
				<i class="material-icons right">arrow_drop_down
				</i>
			</a>
		</li>
		<li>
			<a href="javascript:;">
				<i class="material-icons">
					shopping_cart
				</i>
			</a>
		</li>
	</ul>

	<main class="container">
		<div id="msg"></div>
		<?php
			$pagina = "home";
			if ( isset ( $_GET["param"] ) ){
				$param = explode("/",$_GET["param"]);
				$pagina = $param[0];
				
				if ( isset ( $param[1] ) ){
					$id = trim ( $param[1] );
					echo "<script> 
						var id = $id; 
					</script>";
				}
			}
			//arquivo javascript da página
			$javascript = "js/".$pagina.".js";

			//verificar se a pagina existe
			$pagina = "pages/".$pagina.".php";
			if ( file_exists( $pagina ) ) 
				include $pagina;
			else
				include "pages/erro.php";
		?>
	</main>

	<footer class="page-footer red darken-4">
		<div class="container">
			<img src="images/logo.png" alt="iFud" title="iFud">
			<p>
				Av Brasil 200, Centro<br>
				Alto Paraíso - PR
			</p>
		</div>
		<div class="footer-copyright red darken-3">
			<div class="container">
				<p class="center-align">
					Desenvolvido por Tidinha System
				</p>
			</div>
		</div>
	</footer>

	<div id="modalCarrinho" class="modal">
		<div class="modal-content">
			<h4>Carrinho de compras</h4>
			<table class="striped">
				<thead>
					<tr>
						<td>Foto</td>
						<td>Produto</td>
						<td>Qtde</td>
						<td>Valor</td>
					</tr>
				</thead>
				<tbody></tbody>
				<tfoot></tfoot>
			</table>
		</div>
		<div class="modal-footer">
			<a href="javascript:;" class="modal-close btn btn-flat red darken-4">Cancelar</a>
			<a href="finalizar" class="modal-close btn btn-flat red darken-4">Finalizar</a>
		</div>
	</div>

	<script src="js/jquery-3.4.1.min.js"></script>
	<script src="js/materialize.min.js"></script>

	<script src="js/all.js"></script>
	<?php if (file_exists($javascript)): ?>
		<script src="<?=$javascript;?>"></script>
	<?php endif ?>


	<script>
		$(document).ready(function(){
			$('.modal').modal();
	
			//inicializar o menu
			 $('.sidenav').sidenav();
			    
			//dropdown do materialize
			$(".dropdown-trigger").dropdown();
		})
	</script>
</body>
</html>