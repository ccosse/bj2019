var BlackJackQuiz=function(obj_id){
	//Play each hand according to the table ... keep running stats ... advise on mistake
	//Not actually playing-out hand b/c that would require splitting, doubling graphics etc
	//Purpose of this is strictly to memorize correct moves.
	//But we can at least see what the dealer had

	var me={}
	me.missed=[]
	cshd=2
	cshd_idcs=[cshd,]
	for(var idx=1;idx<14;idx++){
		cshd+=4;
		cshd_idcs.push(cshd);
	}
	cshd_idcs=cshd_idcs.reverse()

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
	me.popup_html+='<center><div style="width:80%";>';
	me.popup_html+='<br>';
	me.popup_html+='<div id="bj_stats" class="bj_stats"></div><br>';
	me.popup_html+='<div id="bj_quiz" class="bj_quiz"></div>';
	me.popup_html+="<div id='step0_buttons'><input class='button actionB' type='button' id='nextB' value='Next'></div></div>";
	me.popup_html+="<div id='step1_buttons' style='display:none;'><table><tr>";
	me.popup_html+="<td><input class='button actionB' type='button' id='doubleB' value='Double'></td>";
	me.popup_html+="<td><input class='button actionB' type='button' id='hitB' value='Hit'></td>";
	me.popup_html+="<td><input class='button actionB' type='button' id='standB' value='Stand'></td>";
	me.popup_html+="<td><input class='button actionB' type='button' id='splitB' value='Split'></td>";
	me.popup_html+="</tr></table>"
	me.popup_html+="</div></div>";
	me.popup_html+="</center>";
	me.popup_html+="<input id=opacityB type='range' min='200' max='1000' step='10' value='600'/>"
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

	me.game_step=function(choice){
			d3.event.preventDefault();

			d3.select("#bj_quiz").html("")
			console.log("step: ",me.step);

			if(me.step==0){
				me.hand=me.deal()
				if(me.missed.length>0){
					if(Math.random()>0.5)
						me.hand=me.missed.shift();
				}
			}
			//me.hand=[10,12,13,10]

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
					if(r0==r1 && h2!=h3){console.log("continue");continue;}//unless both are pairs#small issue:10,J/Q/K -> r0==r1 after value-adjustment, but not really pair; is okay since stand for all, either way.
					if(r0==11 && h2!=11 && h3!=11){console.log("continue");continue;}//issue:inf cycl if BJ
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
				if(td && me.step==0)td.style='background-color:white;';
				if(td && me.step==1)td.style='background-color:red;';
				else{console.log("no cell for that pair ... basic rule!")}
				if(td && rcvals[row][h1]=="BJ"){
					console.log("!!!BLACKJACK!!!")
					//me.step=3;
					//if(me.step>1)me.step=0;
					td.style='background-color:red;';
					d3.select("#action")
						.text(rcvals[row][h1]);
				}
			}
			if(me.step>0){
				if(hard_total>16){
					d3.select("#action")
						.text("S")
						.attr('class','button')
						.style('color','green');
					if(choice!="S")me.wrong();
					else me.right();
				}
				else if(hard_total<8 && h3!=h2){
					d3.select("#action")
						.text("H")
						.attr('class','button')
						.style('color','white');
					if(choice!="H")me.wrong();
					else me.right();
				}
				else{
					d3.select("#action")
						.text(rcvals[row][h1])
						.attr('class','button')
						.style('color','orange');
					if(choice!=rcvals[row][h1] && rcvals[row][h1]!='BJ')me.wrong();
					else me.right();
				}
			}
			me.step+=1;
			if(me.step>1)me.step=0;
			if(rcvals[row][h1]=='BJ')me.step=0;
			if(me.step==0){
				d3.select("#step1_buttons").style('display','none');
				d3.select("#step0_buttons").style('display','block');
				//window.setTimeout(me.game_step('null'),1000)
			}
			else{
				d3.select("#step1_buttons").style('display','block');
				d3.select("#step0_buttons").style('display','none');
			}
			console.log("step: ",me.step)
		}

	me.num_correct=0;
	me.num_incorrect=0;

	me.reset=function(){
		me.num_correct=0;
		me.num_incorrect=0;
		me.update_stats();
	}

	me.update_stats=function(){
		stats_html="correct: "+me.num_correct+" incorrect: "+me.num_incorrect;
		d3.select("#bj_stats")
			.html(stats_html);
	}

	me.wrong=function(){console.log(choice, "is WRONG");me.num_incorrect+=1;me.update_stats();me.missed.push(me.hand)}

	me.right=function(){console.log(choice, "is RIGHT");me.num_correct+=1;me.update_stats();}

	me.reset();

	d3.selectAll("#opacityB")
		.on("input",function(){
			op=parseFloat(parseFloat(this.value)/1000.)
			//console.log(op);
			d3.select('.modal').style('opacity',op)
		})
	d3.select('.modal').style('opacity',0.6)
	d3.selectAll(".actionB")
		.on("click",function(){
			ev_id=d3.event.target.id
			console.log(ev_id);
			if(ev_id=="nextB")choice=null;
			else if(ev_id=="doubleB")choice="D";
			else if(ev_id=="hitB")choice="H";
			else if(ev_id=="standB")choice="S";
			else if(ev_id=="splitB")choice="SP";
			me.game_step(choice);
		})
	return me;
}
