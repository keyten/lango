const getRandomEnglishSentence = (function(){
	const rating = {
		'[noun, fille]': -0.3
	};

	const nouns = {};

	const pronouns = {
		I: ['I', 'me', 'my'],
		you: ['you', 'you', 'your'],
		he: ['he', 'him', 'his'],
		she: ['she', 'her', 'her'],
		it: ['it', 'it', 'its'],
		we: ['we', 'us', 'our'],
		they: ['they', 'them', 'their']
	};

	Object.keys(pronouns).forEach(pronoun => {
		nouns[pronoun] = options => {
			if (pronoun[pronoun.length - 1] === 's') {
				options.plural = true;
			}
			options.pronoun = pronoun;

			if (options.case === 'accusative') {
				return pronouns[pronoun][1];
			}

			return pronouns[pronoun][0];
		}
	});
/*

	['I', 'you', 'he', 'she', 'it', 'we', 'they'].forEach((word) => {
		nouns[word] = (options) => {
			if (word[word.length - 1] === 's') {
				options.plural = true;
			}
			options.pronoun = word;

			return word;
		};
	}); */

	`
	man boy brother book dog horse cow cat fish fox rabbit
	`.trim().replace(/\s+/g, ' ').split(' ').forEach((word) => {
		nouns[word] = ({defined, plural}) => {
			var article = nounArticle(word, 'm', defined, plural);
			return `${article}${plural ? makePlural(word) : word}`;
		};
	});

	function nounArticle(word, sex, defined, plural){
		return defined ? 'the ' : plural ? '' : 'a ';
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
			'u'
		].indexOf(letter) > -1;
	}

	const verbs = {};

	const verbTemplate = {
		'be': {
			'[present, I]': 'am',
			'[present, you]': 'are',
			'[present, he]': 'is',
			'[present, she]': 'is',
			'[present, it]': 'is',
			'[present, we]': 'are',
			'[present, they]': 'are'
		}
	};

	`
	do go make read like love want come
	`.trim().replace(/\s+/g, ' ').split(' ').forEach(verb => {
		const last = verb[verb.length - 1];
		const sec = verb + ((isLetterVowel(last) && last !== 'e' || last === 'x') ? 'es' : 's');
		verbTemplate[verb] = {
			'[present, I]': verb,
			'[present, you]': verb,
			'[present, he]': sec,
			'[present, she]': sec,
			'[present, it]': sec,
			'[present, we]': verb,
			'[present, they]': verb
		};
	});

	const verbsByTheysOwn = `do have be make will`.split(' ');

	Object.keys(verbTemplate).forEach(verb => {
		const forms = verbTemplate[verb];
		verbs[verb] = (time, negation, subject) => {
			const form = getForm(time, subject, forms);
			return form;
		};
	});

	function getForm(time, subject, forms){
		var pronoun = subject.pronoun;
		if(!pronoun){
			pronoun = subject.plural ? 'they': 'he';
		}

		return forms[`[${time}, ${pronoun}]`];
	}

	const generators = {
		// Indicatif
		'present': ({subject, object, verb}, options) => {
			var text = `${subject({
				...options.subject,
				case: 'nominative'
			})} ${verb(
				'present',
				options.verb.negation,
				options.subject
			)} ${object({
				...options.object,
				case: 'accusative'
			})}`;

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
		return generators['present']({subject, object, verb}, {
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

	return getRandomSentence;

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
})();
