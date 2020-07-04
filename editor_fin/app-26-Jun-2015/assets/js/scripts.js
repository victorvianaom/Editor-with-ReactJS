'use strict';

$(document).ready(function() {
	var latexMath = $('#editable-math'),
		latexSource = $('#latex-source'),
		svgOutput = $('#svg-output'),
		typingTimer = null,
		doneTypingInterval = 500;

	function latexMathToLatexSource () {// funcao que joga o conteudo da caixa mathquill para a caixa de latex, convertendo-o
    	setTimeout(function() {
     		var latex = latexMath.mathquill('latex');
      		latexSource.val(latex);
		}, 0);
	}

	function latexSourceToLatexMath () {// funcao que converte o codigo da caixa latex para a caixa mathquill
		var oldtext = latexSource.val();
    	setTimeout(function() {
      		var newtext = latexSource.val();
      		if(newtext !== oldtext) {
        		latexMath.mathquill('latex', newtext);
      		}
    	}, 0);
	}

	function render () {// renderiza no #box a imagem em SVG
		clearTimeout(typingTimer);
		typingTimer = setTimeout(function () {
			updateMath(latexSource.val());
		}, doneTypingInterval);
	}

	var updateMath = (function () {// funcao auxiliar para renderizar SVG no box

		var queue = MathJax.Hub.queue,
		math = null,
		box = null,

		hideBox = function () { // when this function is called the #box with SVG content will be hidden
			box.style.visibility = 'hidden';// SVG will be hidden
		},
		showBox = function () { // when this function is called the #box with SVG content will be shown on page
			box.style.visibility = 'visible'; // SVG appears
		};

		queue.Push(function () {
			math = MathJax.Hub.getAllJax('MathOutput')[0];
			box = document.getElementById('box'); // #box is the div where SVG is being rendered
			showBox();
		});

		return  function (latex) {
			queue.Push(hideBox, ['Text', math, '\\displaystyle{'+latex+'}'],
				showBox);
		};

	})();

	$('.syntax-tab > div').on('click', function (event) { // adiciona eventListeners a todos os botoes, e executa a seguinte funcao quando o botao e clicado
		var syntax = ($(event.currentTarget).attr('id'));
		latexMath.mathquill('write', syntax);
		latexMathToLatexSource();
		render();
	});

	$('#latex-source, #editable-math').on('keydown', render); // quando alguma tecla e pressionada tanto na caixa de texto do mathquill, quanto do latex, e chamada a funcao `render()` pra renderizar o SVG

	latexMath.bind('keydown keypress', latexMathToLatexSource).keydown().focus();
	latexSource.bind('keydown keypress', latexSourceToLatexMath);

});