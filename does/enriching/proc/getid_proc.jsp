<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="true" %>
<%@ include file="../lab/conn.jsp" %>
<%@ include file="common_function.jsp" %>
<%@ page import = "org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page import = "com.does.AES" %>

<%

/*
	String requestMethod = request.getMethod();
	if (!requestMethod.equals("POST")) {
		response.sendRedirect("../error.jsp");
		return;
	}
*/

	// 본인인증을 했는지 여부. (success, failed)
	String auth			= StringEscapeUtils.escapeHtml4(request.getParameter("auth"));

	String userName		= StringEscapeUtils.escapeHtml4(request.getParameter("userName"));
	String userPhone	= StringEscapeUtils.escapeHtml4(request.getParameter("userPhone"));

	String loginID = "";
	String check_id = "N";	//중복체크.


	Connection conn = null;
	Statement stmt = null;
	PreparedStatement pstmt= null;
	

	// 본인인증을 한 경우.
	if(auth != null){

		if(auth.equals("success")){

			userPhone	= AES.encrypt(userPhone);

			// 아이디, 핸드폰 중복 체크.
			try{
				conn = connect();

				String q = "select * from dbo.e_User where UserName = ? AND UserPhone = ? AND UserType = ?";
				pstmt = conn.prepareStatement(q);  //실서버

				pstmt.setString(1,userName);
				pstmt.setString(2,userPhone);
				pstmt.setString(3,"default");

				ResultSet rs = pstmt.executeQuery();

				if(rs.next()) {
					loginID = rs.getString("loginID");
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


			// 해당 유저이름과 유저핸드폰이 일치 하는경우.
			
/*
			out.println(userName);
			out.println(userPhone);
*/
			
			if(check_id.equals("Y")){
				out.print("getIDComplete({'result':'success', 'id':'"+loginID+"'})");
			// 유저와 핸드폰 번호가 없을경우. 
			} else {
				out.print("getIDComplete({'result':'wrong'})");
			}

		} else {
			// 인증 실패 후 메인페이지로.
			out.print("getIDComplete({'result':'failed'})");
		}

	} else {
		out.print("getIDComplete({'result':'failed'})");
	}

%>