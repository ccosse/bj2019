var BlackJackQuiz=function(obj_id){
	//Play each hand according to the table ... keep running stats ... advise on mistake
	//Not actually playing-out hand b/c that would require splitting, doubling graphics etc
	//Purpose of this is strictly to memorize correct moves.
	//But we can at least see what the dealer had

	var me={}
	cshd=4
	cshd_idcs=[cshd,]
	for(var idx=1;idx<14;idx++){
		cshd+=4;
		cshd_idcs.push(cshd);
	}
	cshd_idcs=cshd_idcs.reverse()

	const asdf=[
		['','','','','','','','','','','',],
		['<img src="img_card/'+cshd_idcs[1]+'.png"><img src="img_card/'+cshd_idcs[5]+'.png">','H','H','H','D','D','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[1]+'.png"><img src="img_card/'+cshd_idcs[6]+'.png">','D','D','D','D','D','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[1]+'.png"><img src="img_card/'+cshd_idcs[7]+'.png">','D','D','D','D','D','D','D','D','H','H',],
		['<img src="img_card/'+cshd_idcs[1]+'.png"><img src="img_card/'+cshd_idcs[8]+'.png">','D','D','D','D','D','D','D','D','D','D',],
		['<img src="img_card/'+cshd_idcs[1]+'.png"><img src="img_card/'+cshd_idcs[9]+'.png">','H','H','S','S','S','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[2]+'.png"><img src="img_card/'+cshd_idcs[9]+'.png">','S','S','S','S','S','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[3]+'.png"><img src="img_card/'+cshd_idcs[9]+'.png">','S','S','S','S','S','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[4]+'.png"><img src="img_card/'+cshd_idcs[9]+'.png">','S','S','S','S','S','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[5]+'.png"><img src="img_card/'+cshd_idcs[9]+'.png">','S','S','S','S','S','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[1]+'.png">','H','H','D','D','D','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[2]+'.png">','H','H','D','D','D','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[3]+'.png">','H','H','D','D','D','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[4]+'.png">','H','H','D','D','D','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[5]+'.png">','D','D','D','D','D','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[6]+'.png">','S','D','D','D','D','S','S','H','H','S',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[7]+'.png">','S','S','S','S','D','S','S','H','H','S',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[8]+'.png">','S','S','S','S','S','S','S','S','S','S',],
		['<img src="img_card/'+cshd_idcs[13]+'.png"><img src="img_card/'+cshd_idcs[13]+'.png">','SP','SP','SP','SP','SP','SP','SP','SP','SP','SP',],
		['<img src="img_card/'+cshd_idcs[1]+'.png"><img src="img_card/'+cshd_idcs[1]+'.png">','H','SP','SP','SP','SP','SP','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[2]+'.png"><img src="img_card/'+cshd_idcs[2]+'.png">','H','H','SP','SP','SP','SP','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[5]+'.png"><img src="img_card/'+cshd_idcs[5]+'.png">','SP','SP','SP','SP','SP','H','H','H','H','H',],
		['<img src="img_card/'+cshd_idcs[6]+'.png"><img src="img_card/'+cshd_idcs[6]+'.png">','SP','SP','SP','SP','SP','SP','H','H','SP','H',],
		['<img src="img_card/'+cshd_idcs[7]+'.png"><img src="img_card/'+cshd_idcs[7]+'.png">','SP','SP','SP','SP','SP','SP','SP','SP','SP','SP',],
		['<img src="img_card/'+cshd_idcs[8]+'.png"><img src="img_card/'+cshd_idcs[8]+'.png">','SP','SP','SP','SP','SP','S','SP','SP','S','S',],
		['<img src="img_card/'+cshd_idcs[9]+'.png"><img src="img_card/'+cshd_idcs[9]+'.png">','S','S','S','S','S','S','S','S','S','S',],
	];

	const rcvals=[
		['','','','','','','','','','','',],
		[[1,5],'H','H','H','D','D','H','H','H','H','H',],
		[[1,6],'D','D','D','D','D','H','H','H','H','H',],
		[[1,7],'D','D','D','D','D','D','D','D','H','H',],
		[[1,8],'D','D','D','D','D','D','D','D','D','D',],
		[[1,9],'H','H','S','S','S','H','H','H','H','H',],
		[[2,9],'S','S','S','S','S','H','H','H','H','H',],
		[[3,9],'S','S','S','S','S','H','H','H','H','H',],
		[[4,9],'S','S','S','S','S','H','H','H','H','H',],
		[[5,9],'S','S','S','S','S','H','H','H','H','H',],
		[[13,1],'H','H','D','D','D','H','H','H','H','H',],
		[[13,2],'H','H','D','D','D','H','H','H','H','H',],
		[[13,3],'H','H','D','D','D','H','H','H','H','H',],
		[[13,4],'H','H','D','D','D','H','H','H','H','H',],
		[[13,5],'D','D','D','D','D','H','H','H','H','H',],
		[[13,6],'S','D','D','D','D','S','S','H','H','S',],
		[[13,7],'S','S','S','S','D','S','S','H','H','S',],
		[[13,8],'S','S','S','S','S','S','S','S','S','S',],
		[[13,9],'BJ','BJ','BJ','BJ','BJ','BJ','BJ','BJ','BJ','BJ',],
		[[13,13],'SP','SP','SP','SP','SP','SP','SP','SP','SP','SP',],
		[[1,1],'H','SP','SP','SP','SP','SP','H','H','H','H',],
		[[2,2],'H','H','SP','SP','SP','SP','H','H','H','H',],
		[[5,5],'SP','SP','SP','SP','SP','H','H','H','H','H',],
		[[6,6],'SP','SP','SP','SP','SP','SP','H','H','SP','H',],
		[[7,7],'SP','SP','SP','SP','SP','SP','SP','SP','SP','SP',],
		[[8,8],'SP','SP','SP','SP','SP','S','SP','SP','S','S',],
		[[9,9],'S','S','S','S','S','S','S','S','S','S',],
	]

	me.popup_id='snapshot_popup';
	me.popup_html='<div style="height:50px;"></div>';//vertical spacer
	me.popup_html+='<center><div style="width:80%";>BlackJack 2019<br>';
	me.popup_html+='<br>';
	me.popup_html+='<div id="bj_quiz" class="bj_quiz"></div>';
	me.popup_html+="<input class='button' type='button' id='nextB' value='Next'></div></center>";
	me.popup_html+="<input class='button' type='button' id='doneB' value='Close'></div></center>";

	d3.select(obj_id)
		.append("div")
		.attr("id",me.popup_id)
		.attr("class","modal animate")
		.html(me.popup_html);

	d3.select(obj_id)
		.on("contextmenu",function(){
				d3.event.preventDefault();
				document.getElementById(me.popup_id).style.display="block";
		})

	d3.select("#doneB")
		.on("click",function(){
			d3.event.preventDefault();
			document.getElementById(me.popup_id).style.display="none";
		})


	me.draw=function(){
		//draw ridx of pair;dealer figures-out own column;
		_idx=parseInt(1+Math.random()*13);
		_val=_idx+1;
		if(_val==14){console.log("yup");_val=11;}
		else if(_val>10){_val=10;}
		console.log("draw idx=",_idx," value=",_val);
		return _idx;
	}
	me.deal=function(){
		rval=[]
		for(var dummy=0;dummy<4;dummy++)
			rval.push(me.draw())
		return rval;
	}

	me.step=0
	me.hand=me.deal()

	d3.select("#nextB")
		.on("click",function(){
			d3.event.preventDefault();

			d3.select("#bj_quiz").html("")
			if(me.step==0)
				me.hand=me.deal()

			hand=me.hand
			//hand=[13,12,9,4]
			//hand=[7,13,5,13]
			d0_idx=hand[0]
			if(me.step==0){
				d3.select("#bj_quiz")
					.append("img")
					.attr("src","img_deck/red.jpg")//default.png
			}
			else{
				d3.select("#bj_quiz")
					.append("img")
					.attr("src","img_card/"+cshd_idcs[d0_idx]+".png")
			}


			d1_idx=hand[1]
			d3.select("#bj_quiz")
				.append("img")
				.attr("src","img_card/"+cshd_idcs[d1_idx]+".png")

			d3.select("#bj_quiz")
				.append("br")

			d3.select("#bj_quiz")
				.append("div")
				.attr("class","vspace")

			d3.select("#bj_quiz")
				.append("text")
				.attr("id","action")

			d3.select("#bj_quiz")
				.append("div")
				.attr("class","vspace")

			d3.select("#bj_quiz")
				.append("br")

			p0_idx=hand[2]
			d3.select("#bj_quiz")
				.append("img")
				.attr("src","img_card/"+cshd_idcs[p0_idx]+".png")

			p1_idx=hand[3]
			d3.select("#bj_quiz")
				.append("img")
				.attr("src","img_card/"+cshd_idcs[p1_idx]+".png")

			row=0;
			h2=hand[2];if(hand[2]==13){h2=11;}else if(hand[2]>10){h2=10;}else if(h2<10){h2+=1;}
			h3=hand[3];if(hand[3]==13){h3=11;}else if(hand[3]>10){h3=10;}else if(h3<10){h3+=1;}
			for(var ridx=rcvals.length-1;ridx>-1;ridx--){
				r0=rcvals[ridx][0][0];
				if(r0==13)r0=11;
				else if(r0<10)r0+=1;
				r1=rcvals[ridx][0][1];
				if(r1<10)r1+=1;
				console.log(r0,r1,[h2,h3])
				if((r0+r1)==(h2+h3)){
					if(r0==r1 && h2!=h3)continue;//unless both are pairs#small issue:10,J/Q/K -> r0==r1 after value-adjustment, but not really pair; is okay since stand for all, either way.
					if(r0==11 && h2!=11 && h3!=11)continue;//
					row=ridx;
					console.log("found row=",ridx);
					break;
				}
			}

			//check if hard 17 or more ...
			hard_total=15;//in order to be < 16 for below cutoff and >10 so don't adjust value
			if(hand[2]!=13 && hand[3]!=13){
				hard_total=h2+h3;
				console.log("hard_total:",hard_total);
			}

			h1=hand[1];
			if(hand[1]==13){h1=10;}
			else if(hand[1]>9){h1=9;}

			console.log(row,h1)
			if(row>0){
				cid=""+row+"_"+h1;
				td=document.getElementById(cid);
				if(td && me.step==0)td.style='background-color:green;';
				if(td && me.step==1)td.style='background-color:red;';
				else{console.log("no cell for that pair ... basic rule!")}
				if(td && rcvals[row][h1]=="BJ"){
					me.step+=1;
					td.style='background-color:red;';
					d3.select("#action")
						.text(rcvals[row][h1]);
				}
			}
			if(me.step>0){
				if(hard_total>16){
					d3.select("#action")
						.text("STAND!!!");
				}
				else if(hard_total<8 && h3!=h2){
					d3.select("#action")
						.text("HIT!!!");
				}
				else{
					d3.select("#action")
						.text(rcvals[row][h1]);
				}
			}
			me.step+=1;
			if(me.step>1)me.step=0;
		})

	return me;
}
