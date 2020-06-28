
    //input[type="date"] 왼쪽의 값 담기위한 변수
    
    let start_date;
    let end_date;
 
    //input[type="date"] 오른쪽의 값 담기위한 변수

    //현재날짜월
    let current_month = 0
    let current_year = 0



    let choice_cell = true; //현재 클릭된 셀이 몇개인지, 몇번째가 먼저 눌린 셀인지
    let selcted_cell1 = ''; //클릭된셀 1 정보
    let selcted_cell2 = ''; // 클릭된 셀 2 정보\
    
    //조회 클릭하였는지 확인하기위함
    let isSearch = false;

 //행 열 위치에 그려주는 function
 let setCell = function (id, row, cell, argVal) {
     $('#' + id).find('tr').eq(row).find('td').eq(cell).text(argVal)
 }

    //달력 그리기위한 함수
let drawCalender = function (y, m, start_day, end_day) {
	
	 let totDay = new Date(y, m, 0).getDate() //월의 일수
	 let firstDay = new Date(y, m - 1, 1).getDay() // 월의 첫날 요일
	 let this_cell= 1;
	
     if (start_day == 0)
         start_day = 1;
     if (end_day == 0)
         end_day = totDay;

     for (let i = 1; i < 7; i++) {
         for (let j = 0; j < 7; j++) {
             setCell('calendar', i, j, '');
             this_cell = (i - 1) * 7 + j - firstDay + 1; //cell에 그려질지 안그려질지 계산 i 와 j를 이용 하였음 //배열처럼인지
             if (start_day <= this_cell && this_cell <= end_day) //시작날짜부터 끝날짜까지 그려줌
                 setCell('calendar', i, j, this_cell);
         }
     }
}//end drawCalender

    //달력위 년 월 표시하기위한 함수
    let setYD = function (current_y, current_m) {
        $("#c_year").text(current_y + "년");
        $("#c_month").text(current_m + "월")
    }
    //일자 요일 국경일 출력하기위한 함수
    let setSchedule = function ({year, month, day, week, YesNo}) {
    	
    	
        let crm = (month + "").length == 2 ? month : '0' + month;
        let dayClass = ''
        if (week == "토요일") {
            dayClass = 'fcBlue'
        }
        else if (week == "일요일") {
            dayClass = 'fcRed'
        }
        let sch = "<tr class =" + dayClass + "><td>" + year + "-" + crm + "-" + day + "</td><td>"+ week + "</td><td>" + YesNo + "</td></td>"
        $('#schedule tbody').append(sch);
    }

    //요일 출력하기위한 함수
    let day_week = function (day) {

        let res = '';
        switch (day) {
            case 0:
                res = "일요일";
                break;
            case 1:
                res = "월요일"
                break;
            case 2:
                res = "화요일"
                break;
            case 3:
                res = "수요일"
                break;
            case 4:
                res = "목요일"
                break;
            case 5:
                res = "금요일"
                break;
            case 6:
                res = "토요일"
                break;
        }
        return res;
    }
    let getHoliday =() => {
        $.ajax({
            url: "http://localhost:9092/getHoliday?start_date=" + start_date + "&end_date=" + end_date ,
            type: "get",
            dataType: "json",
            success: function (result) {           
            	applyDate(result);
         
            },
            error: function (request, status, error) {
                console.log(error);
            }

        });
    }
    
    let applyDate = (result) =>{
    	 if (isSearch == false) {
             alert("조회를 먼저 눌러주세요");
             return false;
         }
    	 
    	 $('#schedule tbody').html('');
        let sch_start=Math.min(selcted_cell2,selcted_cell1) +'';
        let sch_end=Math.max(selcted_cell2,selcted_cell1) +'';
        //선택된 날짜 두개의 값을 비교해 시작날짜와 끝날짜를 구해주는 변수
        let sch_start_m=sch_start.substr(0,4) *12  +sch_start.substr(4,2)*1;
        let sch_end_m=sch_end.substr(0,4) *12  + sch_end.substr(4,2)*1;
        let sch_start_day=sch_start.substr(6,2)*1;
        let sch_end_day
     	let schDataSet ={};
     	let holidayCheck
     	let holiday_m;
     	let holiday_d;
     	//@@
        for(let i=sch_start_m;i<=sch_end_m;i++) {
    		schDataSet.year=Math.floor(i/12);
    		schDataSet.month = i%12
    	   if(schDataSet.month == 0){
    		   schDataSet.month = 12 ;
    		   schDataSet.year--; 
         	}
    		sch_end_day= new Date(schDataSet.year, schDataSet.month, 0).getDate();
    	         if(i==sch_end_m){
    	        	 sch_end_day=sch_end.substr(6,2)*1
    	        	 }
    	         for(let j=sch_start_day;j<=sch_end_day;j++) {
    	        	 holiday_m= (schDataSet.month+'').length ==2 ? schDataSet.month : '0'+schDataSet.month;
    	        	 holiday_d = (j+'').length ==2 ? j : "0"+j;
    	        	 holidayCheck=schDataSet.year+''+holiday_m+''+holiday_d;    	        	 
        	 		schDataSet.YesNo = result.indexOf(holidayCheck) != -1 ? '예' : '아니요';    	        	        
        	        schDataSet.week = day_week(new Date(schDataSet.year, schDataSet.month - 1, j).getDay())
        	        schDataSet.day = j;
        	        setSchedule(schDataSet);
	        	 }  
    	         sch_start_day=1;	         
        	} 
    }
    
	
	let set_seleced_color = () =>{
		let all_cell= $('#calendar tbody').find('tr').find('td');
		
		
		for(let this_cell =0;this_cell<all_cell.length;this_cell++){
			all_cell.eq(this_cell).css('background', '#e1d3f5');
		}
	
		if(selcted_cell1.substr(0,4) == current_year &&selcted_cell1.substr(4,2) == current_month){
			for(let this_cell =0;this_cell<all_cell.length;this_cell++){
				if(all_cell.eq(this_cell).text()== selcted_cell1.substr(6,2)*1)
					all_cell.eq(this_cell).css('background', '#d6afea');
			}
		}
		
		if(selcted_cell2.substr(0,4) == current_year &&selcted_cell2.substr(4,2) == current_month){
			for(let this_cell =0;this_cell<all_cell.length;this_cell++){
				if(all_cell.eq(this_cell).text()== selcted_cell2.substr(6,2)*1)
					all_cell.eq(this_cell).css('background', '#b586e0');
			}
		}
	}
    
 $(document).ready(function () {
        $('#apply').on('click', function () {
        	
        	getHoliday();

        })

    // 어떤 날짜 선택했는지 담기위한 클릭이벤트 function
 $('#calendar tbody tr td') .on( 'click',function () {

 	 if (!isSearch) {
		alert('조회를 먼저 실행해 주세요')
		return;
 	 } 	 else if ($(this).text() == "") {
		alert('빈칸을 선택하셨습니다.')
		return;
     }
 	 
	let thisMonth = (current_month + '').length == 2 ? ''+ current_month : '0' + current_month;
	let thisday= $(this).text().length == 2 ? $(this).text() : '0' + $(this).text();
	let day_of_week = day_week(new Date(current_year, thisMonth - 1,  $(this).text()) .getDay() ) // 일의 요일
	
	$('#days').text('선택된일자 :' + day_of_week + ' ' + current_year +'년 ' + current_month + '월 ' + $(this).text()+'일');
	
	//현재 클릭한 셀의 날짜정보

	let thisDate = current_year + thisMonth + thisday;
	
	if(thisDate !=selcted_cell1 && thisDate != selcted_cell2 ){
		if(choice_cell){ selcted_cell1 = thisDate; }
		else{ selcted_cell2 = thisDate; }

		choice_cell = !choice_cell;
		set_seleced_color();
	}


	})//end click

$('#btnNxt').on( 'click', function () {
            if (isSearch == false) {
                alert("조회를 먼저 눌러주세요");
                return false;
            }
            

            let last_day = 0;
			let next_date_month = current_year *12 + current_month + 1 // 다음 연월을 월로만 표기 2020년 년이 12월이기떄문 12로 곱해줌
        	let end_date_month = end_date.substr(0,4) *12  + end_date.substr(4,2)*1  // 마지막 연월을 월로만 표기
        	
        	if(next_date_month > end_date_month){
        		alert('마지막 달입니다.')
        		return false;
        	}       	   	      	

			if(next_date_month == end_date_month){
        			last_day = end_date.substr(6,2)*1;
        	} 
			//단위를 통일하다보니까
        	current_year = Math.floor(next_date_month/12); //년 구하기
        	current_month = next_date_month%12; // 월 나머지구하기
        	//next_date_month%12 ? 0 ( current_month = 12 current_year-- ) : (current_month = next_date_month%12 )
        	
        	//월이 11월에서 > 12월로갈때 0될때 예외처리
        	if(current_month == 0){
        		current_month = 12 ;
        		current_year--;  // next_date_month%12 month가 +되어 11월이 12월로되며  12로나누면  나머지가 0이되면서 2020이 2021이되기때문에 마이너스를해줌
        	        // 년을 기준으로 곱하고 나누기떄문에  2021 0월에서 12로바꿀라면 -1을해줘야함
        	}
        	drawCalender(current_year,current_month,0, last_day);
            setYD(current_year, current_month);
            set_seleced_color();
        })

        $('#btnPre').on('click', function () {

            if (isSearch == false) {
                alert("조회를 먼저 눌러주세요");
                return false;
            }


            let start_day = 0;
			let prev_date_month = current_year *12 + current_month -1 // 다음 연월을 월로만 표기 2020년 년이 12월이기떄문 12로 곱해줌
        	let start_date_month = start_date.substr(0,4) *12  + start_date.substr(4,2)*1  // 마지막 연월을 월로만 표기
        	
        	if(prev_date_month < start_date_month){ 
        		alert('시작 달입니다.')
        		return false;
        	}       	   	      	

			if(prev_date_month == start_date_month){
				start_day = start_date.substr(6,2)*1;
        	} 
			//단위를 통일하다보니까
        	current_year = Math.floor(prev_date_month/12); //년 구하기
        	current_month = prev_date_month%12; // 월 나머지구하기
        	//next_date_month%12 ? 0 ( current_month = 12 current_year-- ) : (current_month = next_date_month%12 )
        	
        	
        	if(current_month == 0){
        		current_month = 12;
        		current_year--; 
        	}
        	drawCalender(current_year,current_month,start_day, 0);
            setYD(current_year, current_month);
            set_seleced_color();
        })

        //조회 눌렀을시 이벤트실행
        $("#search") .on("click", function () {
					console.log("seach 클릭")
                                        
                    if ($('#start_date_c').val() === "" || $('#end_date_c').val() === "") {
                        alert("날짜를 선택해주세요.");
                        return false;
                    } else if (start_date*1 > end_date*1) {
                        alert("시작날짜가 더큽니다.")
                        $('#start_date_c').val("");
                        $('#end_date_c').val("");
                        return false;
                    }
					
                    //조회 눌렀을시 next prev 사용가능하게 하기위함
                    isSearch = true;
                    
                    //왼쪽 날짜 선택 값 입력
                    start_date = $("#start_date_c").val().replace(/-/g,'')  ; //날짜
					let start_day = start_date.substr(6,2)*1;
                    
                    //오른쪽 날짜 선택 값 입력
                    end_date = $("#end_date_c").val().replace(/-/g,'') ;
                    let end_day = end_date.substr(6,2)*1;
                    
                    //현재 년 월
                    current_month = start_date.substr(4,2)*1;
                    current_year =  start_date.substr(0,4)*1;                    
                    setYD(current_year, current_month);
                    
                    if ((end_date*1 - start_date*1)  > 30  ) 
                    	drawCalender(current_year, current_month,start_day, 0);
                    else
                        drawCalender(current_year, current_month,start_day, end_day);
                        
                }); //end search

    })//end ready
