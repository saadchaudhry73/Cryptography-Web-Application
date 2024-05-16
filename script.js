
  
       // Cypher Code        
const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keys = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM";

// Function to Encrypt plaintext  

        function encrypt(){
        const inputText = document.getElementById("inputText").value;
        let outputText = "";
        
        for (let i = 0; i < inputText.length; i++){
        const char = inputText[i];
        const index = a.indexOf(char);
        if (index !== -1){
            outputText += keys[index];
        } else{
        outputText += char;
        }
    }
        document.getElementById("outputText").value = outputText;
}

// Function to Decrypt plaintext  
     
    function decrypt(){
        const inputText = document.getElementById("outputText").value;
        let outputText = " ";
        
        for (let i = 0; i < inputText.length; i++){
        const char = inputText[i];
        const index = keys.indexOf(char);
        if (index !== -1){
            outputText += a[index];
        } else {
        outputText += char;
    }
        document.getElementById("outputText").value = outputText;
}
    }


    // Morse Code 
	const MORSE_CODES = {
		"A": ".-",
		"B": "-...",
		"C": "-.-.",
		"D": "-..",
		"E": ".",
		"F": "..-.",
		"G": "--.",
		"H": "....",
		"I": "..",
		"J": ".---",
		"K": "-.-",
		"L": ".-..",
		"M": "--",
		"N": "-.",
		"O": "---",
		"P": ".--.",
		"Q": "--.-",
		"R": ".-.",
		"S": "...",
		"T": "-",
		"U": "..-",
		"V": "...-",
		"W": ".--",
		"X": "-..-",
		"Y": "-.--",
		"Z": "--..",
		"1": ".----",
		"2": "..---",
		"3": "...--",
		"4": "....-",
		"5": ".....",
		"6": "-....",
		"7": "--...",
		"8": "---..",
		"9": "----.",
		"0": "-----",
		".": ".-.-.-",
		",": "--..--",
		"?": "..--..",
		"'": ".----.",
		"/": "-..-.",
		"(": "-.--.",
		")": "-.--.-",
		"&": ".-...",
		":": "---...",
		";": "-.-.-.",
		"=": "-...-",
		"+": ".-.-.",
		"-": "-....-",
		"_": "..--.-",
		"\"": ".-..-.",
		"$": "...-..-",
		"!": "-.-.--",
		"@": ".--.-."
	};
	function play_char(gain, dot, time, character) {
		for (let i = 0; i < character.length; i++) {
			switch (character[i]) {
			case '.':
				gain.gain.setValueAtTime(1.0, time);
				time += 5 * dot;
				gain.gain.setValueAtTime(0.0, time);
				break;
			case '-':
				gain.gain.setValueAtTime(1.0, time);
				time += 10 * dot;
				gain.gain.setValueAtTime(0.0, time);
				break;
			}
			time += dot;
		}
		return time;
	}
	function play(text) {
		let context = new (window.AudioContext || window.webkitAudioContext)();
		let oscillator = context.createOscillator();
		let gain = context.createGain();
		const text_out = document.querySelector("#morse-out");
		text_out.value = "";
		gain.gain.value = 0;
		oscillator.frequency.value = 750;
		oscillator.connect(gain);
		let rate = 20;
		let dot = 1.2 / rate;
		oscillator.start(0);
		gain.connect(context.destination);
		let time = context.currentTime;
		text = text.toUpperCase();
		for (let i = 0; i < text.length; i++) {
			if (text[i] === ' ') {
				time += 3 * dot;
				text_out.value += " /";
			} else if (MORSE_CODES[text[i]] !== undefined) {
				time = play_char(gain, dot, time, MORSE_CODES[text[i]]);
				time += 2 * dot;
				text_out.value += MORSE_CODES[text[i]];
			}
		}
		return time;
	}
	document.addEventListener('DOMContentLoaded', function(event) {
		const btn_execute = document.querySelector("#speak-morse");
		btn_execute.addEventListener("click", ()=>{
			const text = document.querySelector("#morse-text");
			play(text.value);
		}
		);
	});
	