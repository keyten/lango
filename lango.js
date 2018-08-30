const rating = {
	'[noun, fille]': -0.3
};

const nouns = {};

['je', 'tu', 'il', 'elle', 'vous', 'nous', 'ils', 'elles'].forEach((word) => {
	nouns[word] = (options) => {
		if (word[word.length - 1] === 's') {
			options.plural = true;
		}
		options.pronoun = word;

		return word;
	};
});

`

homme garçon frère livre chien cheval chat
oiseau poisson lièvre renard

`.trim().replace(/\s+/g, ' ').split(' ').forEach((word) => {
	nouns[word] = ({defined, plural}) => {
		var article = nounArticle(word, 'm', defined, plural);
		return `${article}${plural ? makePlural(word) : word}`;
	};
});

`
femme fille sœur vache tortue

`.trim().replace(/\s+/g, ' ').split(' ').forEach((word) => {
	nouns[word] = ({defined, plural}) => {
		var article = nounArticle(word, 'f', defined, plural);
		return `${article}${plural ? makePlural(word) : word}`;
	};
});


function nounArticle(word, sex, defined, plural){
	if(defined && isLetterVowel(word[0])){
		return "l'";
	}

	if(defined){
		return plural ? 'les ' : (sex === 'm' ? 'le ' : 'la ');
	} else {
		return plural ? 'des ' : (sex === 'm' ? 'un ' : 'une ');
	}
}

function makePlural(word){
	return word + 's';
}

function isLetterVowel(letter){
	return [
		'a',
		'e',
		'i',
		'o',
		'u',
		'y',
		'è',
		'é',
		'ê',
		'ë',
		'œ'
	].indexOf(letter) > -1;
}

const verbs = {};

const verbTemplate = {
	'parler': {
		'[présent, je]': 'parle',
		'[présent, tu]': 'parles',
		'[présent, il]': 'parle',
		'[présent, elle]': 'parle',
		'[présent, nous]': 'parlons',
		'[présent, vous]': 'parlez',
		'[présent, ils]': 'parlent',
		'[présent, elles]': 'parlent'
	},

	'être': {
		'[présent, je]': 'suis',
		'[présent, tu]': 'es',
		'[présent, il]': 'es',
		'[présent, elle]': 'es',
		'[présent, nous]': 'sommes',
		'[présent, vous]': 'êtes',
		'[présent, ils]': 'sont',
		'[présent, elles]': 'sont'
	},

	'avoir': {
		'[présent, je]': 'ai',
		'[présent, tu]': 'as',
		'[présent, il]': 'a',
		'[présent, elle]': 'a',
		'[présent, nous]': 'avons',
		'[présent, vous]': 'avez',
		'[présent, ils]': 'ont',
		'[présent, elles]': 'ont'
	},

	'faire': {
		'[présent, je]': 'fais',
		'[présent, tu]': 'fais',
		'[présent, il]': 'fait',
		'[présent, elle]': 'fait',
		'[présent, nous]': 'faisons',
		'[présent, vous]': 'faites',
		'[présent, ils]': 'font',
		'[présent, elles]': 'font'
	},

	'aller': {
		'[présent, je]': 'vais',
		'[présent, tu]': 'vas',
		'[présent, il]': 'va',
		'[présent, elle]': 'va',
		'[présent, nous]': 'allons',
		'[présent, vous]': 'allez',
		'[présent, ils]': 'vont',
		'[présent, elles]': 'vont'
	},

	'pouvoir': {
		'[présent, je]': 'peux',
		'[présent, tu]': 'peux',
		'[présent, il]': 'peut',
		'[présent, elle]': 'peut',
		'[présent, nous]': 'pouvons',
		'[présent, vous]': 'pouvez',
		'[présent, ils]': 'peuvent',
		'[présent, elles]': 'peuvent'
	},

	'savoir': {
		'[présent, je]': 'sais',
		'[présent, tu]': 'sais',
		'[présent, il]': 'sait',
		'[présent, elle]': 'sait',
		'[présent, nous]': 'savons',
		'[présent, vous]': 'savez',
		'[présent, ils]': 'savent',
		'[présent, elles]': 'savent'
	},

	'dire': {
		'[présent, je]': 'dis',
		'[présent, tu]': 'dis',
		'[présent, il]': 'dit',
		'[présent, elle]': 'dit',
		'[présent, nous]': 'disons',
		'[présent, vous]': 'dites',
		'[présent, ils]': 'disent',
		'[présent, elles]': 'disent'
	},

	'vouloir': {
		'[présent, je]': 'veux',
		'[présent, tu]': 'veux',
		'[présent, il]': 'veut',
		'[présent, elle]': 'veut',
		'[présent, nous]': 'voulons',
		'[présent, vous]': 'voulez',
		'[présent, ils]': 'veulent',
		'[présent, elles]': 'veulent'
	},

	'lire': {
		'[présent, je]': 'lis',
		'[présent, tu]': 'lis',
		'[présent, il]': 'lit',
		'[présent, elle]': 'lit',
		'[présent, nous]': 'lisons',
		'[présent, vous]': 'lisez',
		'[présent, ils]': 'lisent',
		'[présent, elles]': 'lisent'
	},

	'aimer': {
		'[présent, je]': 'aime',
		'[présent, tu]': 'aimes',
		'[présent, il]': 'aime',
		'[présent, elle]': 'aime',
		'[présent, nous]': 'aimons',
		'[présent, vous]': 'aimez',
		'[présent, ils]': 'aiment',
		'[présent, elles]': 'aiment'
	}
};

Object.keys(verbTemplate).forEach(verb => {
	const forms = verbTemplate[verb];
	verbs[verb] = (time, negation, subject) => {
		const form = getForm(time, subject, forms);
		if(negation){
			if(isLetterVowel(form[0])){
				return `n'${form} pas`
			}
			return `ne ${form} pas`;
		}

		return form;
	};
})

function getForm(time, subject, forms){
	var pronoun = subject.pronoun;
	if(!pronoun){
		pronoun = subject.plural ? 'ils': 'il';
	}

	return forms[`[${time}, ${pronoun}]`];
}

const generators = {
	// Indicatif
	'présent': ({subject, object, verb}, options) => {
		var text = `${subject(
			options.subject
		)} ${verb(
			'présent',
			options.verb.negation,
			options.subject
		)} ${object(
			options.object.defined,
			options.object.plural
		)}`;

		return {
			text: text[0].toUpperCase() + text.slice(1)
		};
	},

	'présent progressif': () => {},
	'futur simple': () => {},
	'futur antérieur': () => {},
	'futur immédiat': () => {},
	'passé compose': () => {},
	'imparfait': () => {},
	'passé simple': () => {},
	'passé immédiat': () => {},
	'plus-que-parfait': () => {},
	'passé antérieur': () => {},

	'imperatif présent': () => {},
	'imperatif passé': () => {},

	'présent du subjonctif': () => {},
	'imparfait du subjonctif': () => {},
	'passé du subjonctif': () => {},
	'plus-que-parfait du subjonctif': () => {},

	'conditionnel présent': () => {},
	'conditionnel passé': () => {},

	'participe présent': () => {},
	'participe passé': () => {},
	'gérondif': () => {},
};

function getRandomSentence(){
	const subject = getRandomItem(nouns);
	const object = getRandomItem(nouns);
	const verb = getRandomItem(verbs);
	return generators['présent']({subject, object, verb}, {
		subject: {
			defined: getRandomItem([true, false]),
			plural: getRandomItem([true, false])
		},
		object: {
			defined: getRandomItem([true, false]),
			plural: getRandomItem([true, false])
		},
		verb: {
			negation: getRandomItem([true, false])
		}
	});
}

function getRandomItem(object){
	if(Array.isArray(object)){
		return object[Math.random() * object.length | 0]
	}

	var keys = Object.keys(object);
	var index = Math.random() * keys.length | 0;
	return object[keys[index]];
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
