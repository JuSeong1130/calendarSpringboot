package com.example.demo.controller;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import com.google.gson.Gson;



@Controller
public class CalendarController {
	@GetMapping(value="/calendar")
	public String view ()
	{
		return "calendar";
	}
	@GetMapping(value="/getHoliday")
	public @ResponseBody String holdiay(String start_date,String end_date) throws Exception
	{
		
		List<String> resiult =getHoliday(start_date, end_date);
		Gson gson = new Gson();
		return gson.toJson(resiult, List.class);
	}
	
	
	
public List<String> getHoliday(String start_date,String end_date) throws Exception {
		
	int current_year ; //년 구하기
	int current_month ; // 월 나머지구하기
	int start_date_m=Integer.parseInt(start_date.substring(0, 4))*12 +Integer.parseInt(start_date.substring(4, 6)) ;
	int end_date_m=Integer.parseInt(end_date.substring(0, 4))*12 +Integer.parseInt(end_date.substring(4, 6));
	String month;
	DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
	DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
	Document doc = null;
	NodeList nList;
	List<String> holiday = new ArrayList<String>();
	XPath xpath = XPathFactory.newInstance().newXPath(); // xpath 생성
	  for(int i=start_date_m;i<end_date_m;i++)
	  {
	  current_year =(int) Math.floor(i/12);
	  current_month=i % 12;
	  if(current_month== 0)
	  {
		  current_month=12;
	  }
	  month =String.valueOf(current_month).length() == 2 ? String.valueOf(current_month) : '0' + String.valueOf(current_month);
	  StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo"); /* URL */
	  urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8")+ "=SLItNg33woo23x0ctun4UI6ISbXgYXD1%2BnHeEJPgQqRYwNNPrmx43OI0EY7lodgCrvFqKa9LcoTyuo%2B3eKfkKQ%3D%3D");
	  urlBuilder.append("&" + URLEncoder.encode("solYear", "UTF-8") + "="+ URLEncoder.encode(String.valueOf(current_year), "UTF-8"));
	  urlBuilder.append("&" + URLEncoder.encode("solMonth", "UTF-8") + "="+ URLEncoder.encode(month, "UTF-8"));
	  doc = dBuilder.parse(urlBuilder.toString());
	  doc.getDocumentElement().normalize();
	  nList = (NodeList)xpath.evaluate("//response/body/items/item/locdate", doc,XPathConstants.NODESET);
	  for (int j = 0; j < nList.getLength(); j++) {
			;
			holiday.add( nList.item(j).getTextContent());
			System.out.println("java공휴일은"+ nList.item(j).getTextContent());
		}
	  urlBuilder.delete(0, urlBuilder.length());
	  }
		return holiday;
	}
}
