<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="true" %>
<%@ include file="../lab/conn.jsp" %>
<%@ include file="common_function.jsp" %>
<%@ page import = "org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page import = "com.does.AES" %>

<%

	String requestMethod = request.getMethod();
	if (!requestMethod.equals("POST")) {
		response.sendRedirect("../error.jsp");
		return;
	}

	String loginID		= StringEscapeUtils.escapeHtml4(request.getParameter("loginID"));
	String userPhone	= StringEscapeUtils.escapeHtml4(request.getParameter("userPhone"));
	
	userPhone	= AES.encrypt(userPhone);

	String check_id = "N";	//중복체크.

	Connection conn = null;
	Statement stmt = null;
	PreparedStatement pstmt= null;


	// 아이디, 핸드폰 중복 체크.
	try{
		conn = connect();

		String q = "select * from dbo.e_User where LoginID = ? AND UserPhone = ?";
		pstmt = conn.prepareStatement(q);  //실서버

		pstmt.setString(1,loginID);
		pstmt.setString(2,userPhone);

		ResultSet rs = pstmt.executeQuery();

		if(rs.next()) {
			check_id = "Y";
		} else {
			check_id = "N";
		}

		rs.close();

	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}


	if(check_id.equals("Y")){
		out.print("pwAuthComplete({'result':'success', 'id':'"+loginID+"', 'phone':'"+AES.decrypt(userPhone)+"'})");
	} else {
		out.print("pwAuthComplete({'result':'wrong'})");
	}


%>