<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="true" %>
<%@ include file="../lab/conn.jsp" %>
<%@ page import = "org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page import ="java.util.*,java.text.SimpleDateFormat"%>


<%
	String maxCount = request.getParameter("maxCount"); // 불러올 맥스 카운트

	try{
		conn = connect();
		stmt = conn.createStatement();
//		String q = "select top " +maxCount+ " * from dbo.e_User Where UserType = 'fb' AND UserLevel = '0'";
		String q = "select top " +maxCount+ " * from dbo.e_User Where UserType = 'fb'";

		ResultSet rs = stmt.executeQuery(q);

		StringBuffer xml_list = new StringBuffer();
		xml_list.append("<?xml version=\"1.0\" encoding=\"utf-8\"?> ");
		xml_list.append("\n");
		xml_list.append("<content language='kr'>");
		xml_list.append("\n");
	 
		int index = 0;
		while(rs.next()) {
	 
				xml_list.append("<item>");
				xml_list.append("<index><![CDATA["+index+"]]></index>");
				xml_list.append("<name><![CDATA["+rs.getString("UserName")+"]]></name>");
				xml_list.append("<imgurl><![CDATA["+rs.getString("Image")+"]]></imgurl>");
				xml_list.append("</item>");

				xml_list.append("\n");


				index ++;
		}

		
		int maxCount_int = Integer.parseInt(maxCount);

		int re = maxCount_int - index;

		String dummy = "dummy";
		String img = "http://www.enriching.co.kr/images/join/face50x50.jpg";
		for(int i=0; i < re; i++){
		
				xml_list.append("<item>");
				xml_list.append("<index><![CDATA["+index+"]]></index>");
				xml_list.append("<name><![CDATA["+dummy+"]]></name>");
				xml_list.append("<imgurl><![CDATA["+img+"]]></imgurl>");
				xml_list.append("</item>");

				xml_list.append("\n");

				index ++;
		}
		

		rs.close();
	 
//		xml_list.append("\n");
		xml_list.append("</content>");
		out.print(xml_list);

		rs.close();
	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(stmt != null) try{stmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}


 
%>