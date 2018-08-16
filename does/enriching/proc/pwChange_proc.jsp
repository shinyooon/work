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

	// 본인인증을 했는지 여부. (success, failed)
	String auth			= StringEscapeUtils.escapeHtml4(request.getParameter("auth"));

	String loginID		= StringEscapeUtils.escapeHtml4(request.getParameter("loginID"));
	String changePW		= StringEscapeUtils.escapeHtml4(request.getParameter("changePW"));
	String userPhone	= StringEscapeUtils.escapeHtml4(request.getParameter("userPhone"));

	int result = 0;

	Connection conn = null;
	Statement stmt = null;
	PreparedStatement pstmt= null;
	
	//out.println(auth);

	// 본인인증을 한 경우.
	if(auth != null){
		// 본인 인증을 성공한 경우.
		if(auth.equals("success")){

			changePW	= AES.encrypt(changePW);
			userPhone	= AES.encrypt(userPhone);

			try{
				conn = connect();
				stmt = conn.createStatement();

				String q = "UPDATE dbo.e_User SET Password = ? WHERE LoginID = ? AND UserPhone = ?";
				pstmt = conn.prepareStatement(q);  //실서버

				pstmt.setString(1,changePW);
				pstmt.setString(2,loginID);
				pstmt.setString(3,userPhone);

				result = pstmt.executeUpdate();


			}catch (SQLException e){        
				System.out.println( "SQLException: " + e );
			}finally{	
				if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}

				
			if(result == 1){
				out.print("changePWComplete({'result':'success'})");
			}else{
				out.print("changePWComplete({'result':'failed'})");
			}

		} else {
			out.print("changePWComplete({'result':'failed'})");
		}

	} else {
		out.print("changePWComplete({'result':'failed'})");
	}

%>