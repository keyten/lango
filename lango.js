const nouns = {
	fille: (options) => {
		// fille
		// filles
		// une fille
		// le fille
		// les filles
	}
};

const verbs = {
	parler: (options) => {
		// parler
		// parle
		// ...
	}
};

function getRandomSentence(){
	return {
		text: 'Je ne parler pas Français'
	};
}

/*

const sentences = {};

// Je ne parle pas Francais
// Il mange les pommes
// Les filles courent
sentences['present'] = (subj, verb, obj) => {
	return `${subj()} ${verb(subj.face())} ${verb.preposition(obj)} ${obj()}`;
};

function Noun(){
	const noun = function(){};

	noun.face = () => {
		;
	};

	return noun;
}

function Verb(){
	;
}


function randPresentSentence(){
	const subj = new Noun('je', false);
	const verb = new Verb('parler', true, false);
	const obj = new Noun('francais', false);
	return sentences['present'](subj, verb, obj);
} */
