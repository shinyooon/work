<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="true" %>
<%@ include file="../lab/conn.jsp" %>
<%@ page import = "org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page import ="java.util.*,java.text.SimpleDateFormat"%>

<%

	
	


	int userTotalCount = 0;
	int firstType = 0;
	int secondType = 0;
	int thirdType = 0;
	int fourthType = 0;

	try{
		conn = connect();
		stmt = conn.createStatement();

		String q = "select ";
		q += "count(*) as userTotalCount, ";
		q += "(select count(UserID)  from e_User where Choice='1') as firstType, ";
		q += "(select count(UserID)  from e_User where Choice='2') as secondType, ";
		q += "(select count(UserID)  from e_User where Choice='3') as thirdType, ";
		q += "(select count(UserID)  from e_User where Choice='4') as fourthType ";
		q += "from e_User";

		ResultSet rs = stmt.executeQuery(q);

		String rsStr = "{'result':'success', 'obj':";

		if(rs.next()){

			userTotalCount = Integer.parseInt(rs.getString("userTotalCount"));
			firstType = Integer.parseInt(rs.getString("firstType"));
			secondType = Integer.parseInt(rs.getString("secondType"));
			thirdType = Integer.parseInt(rs.getString("thirdType"));
			fourthType = Integer.parseInt(rs.getString("fourthType"));

			rsStr += "{";
			rsStr += "'userTotalCount':'" + userTotalCount + "',";
			rsStr += "'firstType':'" + firstType + "',";
			rsStr += "'secondType':'" + secondType + "',";
			rsStr += "'thirdType':'" + thirdType + "',";
			rsStr += "'fourthType':'" + fourthType + "'";
			rsStr += "}";
		}
		rs.close();


		/* rsStr = rsStr.substring(0,rsStr.length()-1); */
		rsStr += "}";
		out.print("userCountComplete(" + rsStr + ")");
		

	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(stmt != null) try{stmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}
			
%>