function Card(num){
	var number;
	if(num>207){
		number = num-208;
	}else if(num>155){
		number = num-156;
	}else if(num>103){
		number = num-104;
	}else if(num>51){
		number = num-52;
	}else number = num;

	this.getSuit = function(){
		if(number<13){
			return "of Spades";
		}else if(number<26){
			return "of Hearts";
		}else if(number<39){
			return "of Diamonds";
		}else return "of Clubs";
	};
	
	this.getPicSuit = function(){
		if(number<13){
			return "s";
		}else if(number<26){
			return "h";
		}else if(number<39){
			return "d";
		}else return "c";
	};

	this.getCard = function(){
		var card = number%13;
		switch(card){
			case 1: card = "A"; break;
			case 11: card = "J"; break;
			case 12: card = "Q"; break;
			case 0: card = "K"; break;
			default: card = card;
		}
		return card + " " + this.getSuit();
	};
	
	this.getPicNum = function(){
		var card = number%13;
		switch(card){
			case 1: return "a";
			case 11: return "j";
			case 12: return "q";
			case 0: return "k";
			default: return card.toString();
		}
	};

	this.getValue = function(){
		var card = number%13;
		if(card===1){
			return 11;
		}else if(card>=10 || card === 0){
			return 10;
		}else return card;
	};
	this.getPic = function(){
		var suit = this.getPicSuit();
		var num = this.getPicNum();
		return num + suit + ".png";
	};
}

var deck = [];

//***populate the deck***
var shuffle = function(){
	for(var i=0;i<260;i++){
		deck[i] = i;
	}
};
shuffle();

var Deal = function(){
	var n = Math.floor(Math.random()*deck.length);
	var c = deck[n];
	deck.splice(n,1);
	return new Card(c);
};

var Card1,Card2,dealerCard1,dealerCard2,value1,value2,dealerValue1,dealerValue2,score,dealerScore,dealerCount,hitCount;
var pMoney = 50;
var thePot = 0;

var ifPlay = function(){
	document.getElementById("instructions").style.display="inline-block";
	if(thePot===0 || thePot ==="0"){
		document.getElementById("instructions").innerHTML="Place your bet";
	}else{
		document.getElementById("start").style.display="none";
		play();
	}
};
var play = function(){
	if(deck.length<86){
		shuffle();
		play();
	}
	dealerCount = 0;
	hitCount = 0;
	document.getElementById("instructions").innerHTML="";
	document.getElementById("money").style.display="inline-block";
	document.getElementById("dealerScore").innerHTML="";
	document.getElementById("instructions").innerHTML="";
	document.getElementById("playerScore").innerHTML="";
	document.getElementById("dealerScore").innerHTML="";
	document.getElementById("scoreDisplay").style.display="inline-block";
	document.getElementById("dealerScoreDisplay").style.display="inline-block";
	
	document.getElementById("c1").style.display="none";
	document.getElementById("c2").style.display="none";
	document.getElementById("c3").style.display="none";
	document.getElementById("c4").style.display="none";
	document.getElementById("c5").style.display="none";
	document.getElementById("d1").style.display="none";
	document.getElementById("d2").style.display="none";
	document.getElementById("d3").style.display="none";
	document.getElementById("d4").style.display="none";
	document.getElementById("d5").style.display="none";
	document.getElementById("play").style.display="none";
	Card1 = Deal();
	Card2 = Deal();
	hitCount=2;
	document.getElementById("c1").src=Card1.getPic();
	document.getElementById("c2").src=Card2.getPic();
	document.getElementById("c1").style.display="inline-block";
	document.getElementById("c2").style.display="inline-block";
	aces = 0;
	dealerCard1 = Deal();
	dealerCard2 = Deal();
	dealerCount=2;
	document.getElementById("d1").src=dealerCard1.getPic();
	document.getElementById("d2").src="CardBack.jpg";
	document.getElementById("d1").style.display="inline-block";
	document.getElementById("d2").style.display="inline-block";
	dealerAces = 0;
	document.getElementById("dealerScore").innerHTML=" " + dealerCard1.getValue();

	value1 = Card1.getValue();
	if(value1===11)aces++;
	value2 = Card2.getValue();
	if(value2===11)aces++;
	dealerValue1 = dealerCard1.getValue();
	if(dealerValue1===11)dealerAces++;
	dealerValue2 = dealerCard2.getValue();
	if(dealerValue2===11)dealerAces++;

	score = value1 + value2;
	dealerScore = dealerValue1 + dealerValue2;
	
	if(score === 22){
		aces--;
		score -= 10;
	}
	if(dealerScore === 22){
		dealerAces--;
		dealerScore-=10;
	}
	if(score === 21 && dealerScore == 21){
		document.getElementById("playerScore").innerHTML=" " + score + " - Blackjack!";
		document.getElementById("dealerScore").innerHTML=" " + dealerScore + " - Blackjack!";
		gameOver("t");
	}else if(dealerScore==21){
		document.getElementById("d2").src=dealerCard2.getPic();
		document.getElementById("dealerScore").innerHTML=" " + dealerScore + " - Blackjack!";
		gameOver("dBJ");
	}else if(score === 21){
		document.getElementById("playerScore").innerHTML=" " + score + " - Blackjack!";
		gameOver("pBJ");
	}else{
		hitStay();
	}
};
var bet = function(){
	document.getElementById("instructions").style.display="none";
	if(pMoney<=0 || pMoney<="0"){
		document.getElementById("instructions").innerHTML="Insufficient Funds";
		document.getElementById("instructions").style.display="inline-block";
	}else{
		pMoney -= 5;
		thePot += 5;
		document.getElementById("pot").innerHTML=thePot.toString();
		document.getElementById("money").innerHTML=pMoney.toString();
		if(pMoney<=0 || pMoney<="0"){
			document.getElementById("money").style.color="red";
			document.getElementById("moneyDisplay").style.color="red";
		}
	}
};
var hitStay = function(){
	document.getElementById("playerScore").innerHTML=" " + score;
	document.getElementById("hit").style.display="inline-block";
	document.getElementById("stay").style.display="inline-block";
};
var hit = function(){
	document.getElementById("hit").style.display="none";
	document.getElementById("stay").style.display="none";
	var hitCard = Deal();
	hitCount++;
	switch(hitCount){
		case 3: document.getElementById("c3").src=hitCard.getPic();
				document.getElementById("c3").style.display="inline-block";break;
		case 4: document.getElementById("c4").src=hitCard.getPic();
				document.getElementById("c4").style.display="inline-block";break;
		case 5: document.getElementById("c5").src=hitCard.getPic();
				document.getElementById("c5").style.display="inline-block";break;
		case 6: gameOver(0);
	}
	var value3 = hitCard.getValue();
	if(value3===11)aces++;
	score += value3;
	if(score>21){
		if(aces>0){
			aces--;
			score-=10;
			hitStay();
		}else{
			document.getElementById("playerScore").innerHTML=" " + score + " - BUSTed!";
			gameOver("pb");
		}
	}else if(score === 21){
		document.getElementById("playerScore").innerHTML=" " + score + "!";
		dealer();
	}else hitStay();
};
var stay = function(){
	document.getElementById("hit").style.display="none";
	document.getElementById("stay").style.display="none";
	dealer();
};
var dealer = function(){
	document.getElementById("dealerScore").innerHTML=" " + dealerScore;
	document.getElementById("d2").src=dealerCard2.getPic();
	if(dealerScore>16){
		gameOver(0);
	}else dealerHit();
};
var dealerHit = function(){
	var hitCard = Deal();
	dealerCount++;
	switch(dealerCount){
		case 3: document.getElementById("d3").src=hitCard.getPic();
				document.getElementById("d3").style.display="inline-block";break;
		case 4: document.getElementById("d4").src=hitCard.getPic();
				document.getElementById("d4").style.display="inline-block";break;
		case 5: document.getElementById("d5").src=hitCard.getPic();
				document.getElementById("d5").style.display="inline-block";break;
		case 6: gameOver(0);
	}
	var dealerValue3 = hitCard.getValue();
	if(dealerValue3===11)dealerAces++;
	dealerScore += dealerValue3;
	if(dealerScore>21){
		if(dealerAces>0){
			dealerAces--;
			dealerScore-=10;
			document.getElementById("dealerScore").innerHTML=" " + dealerScore;
			dealerHit();
		}else{
			document.getElementById("dealerScore").innerHTML=" " + dealerScore + " - BUSTed!";
			gameOver("db");
		}
	}else if(dealerScore === 21){
		document.getElementById("dealerScore").innerHTML=" " + dealerScore + "!";
		if(score === 21){
			gameOver("t");
		}else{
			gameOver("d");
		}
	}else if(dealerScore>17){
		document.getElementById("dealerScore").innerHTML=" " + dealerScore;
		gameOver(0);
	}else{
		document.getElementById("dealerScore").innerHTML=" " + dealerScore;
		dealerHit();
	}
};
var gameOver = function(result){
	document.getElementById("hit").style.display="none";
	document.getElementById("stay").style.display="none";
	switch(result){
		case "dBJ":
			document.getElementById("instructions").innerHTML="Blackjack! You Lose!";
			thePot=0;
			break;
		case "pBJ":
			document.getElementById("instructions").innerHTML="Winner Winner Chicken Dinner!";
			pMoney += thePot*12/5;
			thePot=0;
			break;
		case "d":
			document.getElementById("instructions").innerHTML="Dealer Wins!";
			thePot=0;
			break;
		case "db":
			document.getElementById("instructions").innerHTML="You Win!";
			pMoney += thePot*2;
			thePot=0;
			break;
		case "p":
			document.getElementById("instructions").innerHTML="You Win!";
			pMoney+= thePot*2;
			thePot=0;
			break;
		case "pb":
			document.getElementById("instructions").innerHTML="Dealer Wins!";
			thePot=0;
			break;
		case "t":
			document.getElementById("instructions").innerHTML="Tie game";
			pMoney += thePot;
			thePot=0;
			break;
		default:
			if(score>dealerScore){
				document.getElementById("instructions").innerHTML="You Win!";
				pMoney += thePot*2;
				thePot=0;
			}else if(score<dealerScore){
				document.getElementById("instructions").innerHTML="Dealer Wins!";
				thePot=0;
			}else{
				document.getElementById("instructions").innerHTML="Tie game";
				pMoney += thePot;
				thePot=0;
			}
	}
	document.getElementById("instructions").style.display="inline-block";
	document.getElementById("play").style.display="inline-block";
	document.getElementById("money").innerHTML=pMoney.toString();
	document.getElementById("pot").innerHTML=thePot.toString();
	if(pMoney===0 || pMoney==="0"){
		document.getElementById("money").style.color="red";
		document.getElementById("moneyDisplay").style.color="red";
	}else{
		document.getElementById("money").style.color="#00ff00";
		document.getElementById("moneyDisplay").style.color="#00ff00";
	}
};
