<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


<html>

<head>
    <meta charset="UTF-8">
    <title>title</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<link rel="stylesheet" href="/static/css/calendar.css"/>
<script src="/static/js/calendar.js"></script>
<style>

   

    </style>
</head>

<body>
    <header>

        <div>
            <span>기간</span> <input type="date" min="1900-01-01" max="3000-12-31" id="start_date_c"> ~ <input type="date"
                min="1900-01-01" max="3000-12-31" id="end_date_c"> <input type="button" value=" 조회" id="search"
                class='Btn' />
        </div>

    </header>
    <section>
        <div id='wrap'>
            <div id="section_left" class="sec">
                <div id="calendar_wrap">
                    <div id="z7">
                        <span id="c_year">년</span><span id="c_month">월</span>
                    </div>
                    <div>
                        <table id="calendar">
                            <thead>
                            <tr>
                                <td>Sun</td>
                                <td>Mon</td>
                                <td>Tue</td>
                                <td>Wed</td>
                                <td>Thu</td>
                                <td>Fri</td>
                                <td>Sat</td>
                            </tr>
                            </thead>
                            <tbody>
	                            <tr>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                            </tr>
	                            <tr>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                            </tr>
	                            <tr>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                            </tr>
	                            <tr>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                            </tr>
	                            <tr>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                            </tr>
	                            <tr>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                                <td></td>
	                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="days">선택된일자 (요일) 년 월 일</div>
                </div>

            </div>
            <div id="section_right" class="sec">
                <table id="schedule">
              <thead>
                    <tr>
                        <td>일자</td>
                        <td>요일</td>
                        <td>국경일</td>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

    </section>
    <footer>

        <div>
            <button id='btnPre' class='Btn'>pre</button>
            <button id='btnNxt' class='Btn'>nex</button>
            <button class='Btn' id="apply">apply</button>

        </div>
    </footer>

</body>

</html>