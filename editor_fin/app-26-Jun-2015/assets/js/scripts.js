'use strict'; // tells the interpreter to use the strict mode of javascript

$(document).ready(function() { // when the document is fully loaded, then execute the code inside...
	var latexMath = $('#editable-math'),
		latexSource = $('#latex-source'),
		svgOutput = $('#svg-output'),
		typingTimer = null, // this will be used to store the the returnd velue of the function setTimeout when it is called inside the `render()` function.
		doneTypingInterval = 500; // this will be used for rendering the SVG, it waits this many miliseconds after the user stops typing...

	function latexMathToLatexSource () {// funcao que joga o conteudo da caixa mathquill para a caixa de latex, convertendo-o
    	setTimeout(function() { //The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.
     		var latex = latexMath.mathquill('latex'); // converts the content inside the mathquill field to latex and stores in `latex`
      		latexSource.val(latex); // .val() is a jQuery method. Sets the texteare value to the latex code which corresponds to what is inside the mathquill field
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
		clearTimeout(typingTimer); // cancels the previous timer to get a new one
		typingTimer = setTimeout(function () { //Return Value:	A Number, representing the ID value of the timer that is set. Use this value with the clearTimeout() method to cancel the timer
			updateMath(latexSource.val());
		}, doneTypingInterval);
	}

	var updateMath = (function () {// funcao auxiliar para renderizar SVG no box

		var queue = MathJax.Hub.queue,
			math = null,
			box = null,

			hideBox = function () { // when this function is called the #box with SVG content gets hidden
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
			queue.Push(hideBox, ['Text', math, '\\displaystyle{'+latex+'}'], showBox);
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