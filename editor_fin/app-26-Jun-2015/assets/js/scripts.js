'use strict'; // tells the interpreter to use the strict mode of javascript
// just a brief note: $() is the jQuery way of doing `query select` from DOM elements
$(document).ready(function() { // when the document is fully loaded, then execute the code inside...
	var latexMath = $('#editable-math'),
		latexSource = $('#latex-source'),
		svgOutput = $('#svg-output'),
		typingTimer = null, // this will be used to store the the returnd velue of the function setTimeout when it is called inside the `render()` function.
		doneTypingInterval = 500; // this will be used for rendering the SVG, it waits this many miliseconds after the user stops typing...

	function latexMathToLatexSource () {// this function converts the content inside mathquill field to latex, and put it in the latex field
    	setTimeout(function() { //The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.
     		var latex = latexMath.mathquill('latex'); // converts the content inside the mathquill field to latex and stores in `latex`
      		latexSource.val(latex); // .val() is a jQuery method. Sets the `texteare` value to the latex code which corresponds to what is inside the mathquill field
		}, 0);
	}

	function latexSourceToLatexMath () {// this function do the reverse operation of the previous function (Latex -> Mathquill)
		var oldtext = latexSource.val();
    	setTimeout(function() {
      		var newtext = latexSource.val();
      		if(newtext !== oldtext) {
        		latexMath.mathquill('latex', newtext); // converting latex -> Mathquill and rendering in the mathquill field
      		}
    	}, 0);
	}

	function render () {// renderiza no #box a imagem em SVG
		clearTimeout(typingTimer); // cancels the previous timer to get a new one
		typingTimer = setTimeout(function () { //Return Value:	A Number, representing the ID value of the timer that is set. Use this value with the clearTimeout() method to cancel the timer
			updateMath(latexSource.val());
		}, doneTypingInterval);
	}

	// A little thing I noticed, is that in this version of the code, MathJax is being used only 
	// for the purpose of SVG rendering, as you will see bellow...

	var updateMath = (function () {// funcao auxiliar para renderizar SVG no box

		var queue = MathJax.Hub.queue, //[...FIX...] I'll read the DOCS and try to understand better thins Queue thing...
			math = null,
			box = null,

			hideBox = function () { // when this function is called the #box with SVG content gets hidden
				box.style.visibility = 'hidden';// SVG will be hidden
			},
			showBox = function () { // when this function is called the #box with SVG content will be shown on page
				box.style.visibility = 'visible'; // SVG appears
			};

		queue.Push(function () { //[...FIX...] this is in the Queue DOCS
			math = MathJax.Hub.getAllJax('MathOutput')[0];//[...FIX...] this is another thing I should undertand better by reading the DOCS...
			box = document.getElementById('box'); // #box is the div where SVG is being rendered
			showBox(); // shows the box with SVG...
		});

		return  function (latex) {//[...FIX...] I didn`t get exactly what this thing does, I just know that it is rendering the SVG in some way...
			queue.Push(hideBox, ['Text', math, '\\displaystyle{'+latex+'}'], showBox); //[...FIX...] the Push method is in the Queue DOCS
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

/*
MathQuill functions used:
Esses metodos estao ultrapassados, a nova api usa outros [...FIX... procurar quais os novos metodos]
12	var latex = latexMath.mathquill('latex');
22	latexMath.mathquill('latex', newtext);
64	latexMath.mathquill('write', syntax);

MathJax functions used:
39	var queue = MathJax.Hub.queue,
51	math = MathJax.Hub.getAllJax('MathOutput')[0];
50	queue.Push(function () {
57	queue.Push(hideBox, ['Text', math, '\\displaystyle{'+latex+'}'], showBox);
*/
