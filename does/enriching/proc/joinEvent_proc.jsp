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

	request.setCharacterEncoding("utf-8");
	
// 회원가입 후 이벤트 응모시.

	


	String userName		= htmlRemove(request.getParameter("userName"));
	String userPhone	= StringEscapeUtils.escapeHtml4(request.getParameter("userPhone1")+request.getParameter("userPhone2")+request.getParameter("userPhone3"));
	String password		= StringEscapeUtils.escapeHtml4(request.getParameter("password"));
	String choice		= StringEscapeUtils.escapeHtml4(request.getParameter("choice"));
	String image 		= StringEscapeUtils.escapeHtml4(request.getParameter("image"));
	String redirect 	= request.getParameter("redirect");
	String device 		= request.getParameter("device");
	String id 			= (String)session.getAttribute("USERID");
	String type 		= (String)session.getAttribute("TYPE");
	
			
	if(id == null){
		id = StringEscapeUtils.escapeHtml4(request.getParameter("id"));
	}	
	if(type == null){
		type = StringEscapeUtils.escapeHtml4(request.getParameter("type"));
	}
	
	if(device == null){
		device = "w";
	}
	
	

	String dup = "N";	//중복체크.
	int result = 0;

	

	Connection conn = null;
	Statement stmt = null;
	PreparedStatement pstmt= null;

	if(type.equals("default")){
	

	
		userPhone	= AES.encrypt(userPhone);
		password	= AES.encrypt(password);
	
	

		// 아이디, 핸드폰 중복 체크.
		try{
			conn = connect();

			String q = "select * from dbo.e_User where LoginID = ? OR UserPhone = ?";
			pstmt = conn.prepareStatement(q);  //실서버

			pstmt.setString(1,id);
			pstmt.setString(2,userPhone);

			ResultSet rs = pstmt.executeQuery();

			if(rs.next()) {
				dup = "Y";
			} else {
				dup = "N";
			}

			rs.close();

		} catch (Exception e) {
			e.printStackTrace(System.out);
		} finally {
			if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
			if(conn != null) try{conn.close();}catch(SQLException ex){}
		}

		// 중복이 아닐경우 가입.
		if(dup.equals("N")){
			try{
				conn = connect();

				String q = "INSERT INTO dbo.e_User(LoginID, UserName, UserPhone, Password, Choice, UserLevel, UserType, Image, DisplayName) values(?,?,?,?,?,?,?,?,?)";
				pstmt = conn.prepareStatement(q);  //실서버

				pstmt.setString(1,id);
				pstmt.setString(2,userName);
				pstmt.setString(3,userPhone);
				pstmt.setString(4,password);
				pstmt.setString(5,choice);
				pstmt.setString(6,"1");
				pstmt.setString(7,"default");
				pstmt.setString(8,image);
				pstmt.setString(9,userName); // DisplayName
				result = pstmt.executeUpdate();

			}catch (SQLException e){        
				System.out.println( "SQLException: " + e );
			}finally{	
				if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}
			
				
			if(result == 1) {
				session.setAttribute("USERID",id);
				session.setAttribute("CHOICE",choice);
				session.setAttribute("USERLEVEL","1");
				session.setAttribute("TYPE","default");
				session.setAttribute("IMAGE",image);
				session.setAttribute("USERNAME",userName);
				session.setAttribute("DISPLAYNAME",userName);
				
				if(device.equals("m")) out.print("joinEventComplete({'result':'success', 'type':'default', 'id':'"+id+"'})");
				else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=success';</script>");
			} else {
				if(device.equals("m")) out.print("joinEventComplete({'result':'failed', 'type':'default', 'id':'"+id+"'})");
				else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=failed';</script>");
			} 
		// 중복일 경우
		} else {
			if(device.equals("m")) out.print("joinEventComplete({'result':'already', 'type':'default', 'id':'"+id+"'})");
			else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=already';</script>");
		}

	// FB
	} else if (type.equals("fb")){

	
		userPhone	= AES.encrypt(userPhone);

		// 아이디, 핸드폰 중복 체크.
		try{
			conn = connect();

			String q = "select * from dbo.e_User where UserPhone = ?";
			pstmt = conn.prepareStatement(q);  //실서버

			pstmt.setString(1,userPhone);

			ResultSet rs = pstmt.executeQuery();

			if(rs.next()) {
				dup = "Y";
			} else {
				dup = "N";
			}

			rs.close();

		} catch (Exception e) {
			e.printStackTrace(System.out);
		} finally {
			if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
			if(conn != null) try{conn.close();}catch(SQLException ex){}
		}
		

		// 중복이 아닐경우 가입.
		if(dup.equals("N")){
	
			try{
				conn = connect();
				stmt = conn.createStatement();
				
				String q = "update dbo.e_User set UserName=N'"+userName+"',UserPhone='"+userPhone+"',UserLevel='1' where LoginID ='"+id+"'";
				stmt.executeUpdate(q);

				session.setAttribute("USERLEVEL","1");
				session.setAttribute("USERNAME",userName);

				if(device.equals("m")) out.print("joinEventComplete({'result':'success', 'type':'fb', 'id':'"+id+"'})");
				else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=success';</script>");

			} catch (Exception e) {
				e.printStackTrace(System.out);
				if(device.equals("m")) out.print("joinEventComplete({'result':'failed', 'type':'fb', 'id':'"+id+"'})");
				else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=failed';</script>");
			} finally {
				if(stmt != null) try{stmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}
		// 중복일 경우
		} else {
			if(device.equals("m")) out.print("joinEventComplete({'result':'already', 'type':'default', 'id':'"+id+"'})");
			else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=already';</script>");
		}

	//TW
	} else if (type.equals("tw")){

		userPhone	= AES.encrypt(userPhone);
		
		// 아이디, 핸드폰 중복 체크.
		try{
			conn = connect();

			String q = "select * from dbo.e_User where UserPhone = ?";
			pstmt = conn.prepareStatement(q);  //실서버

			pstmt.setString(1,userPhone);

			ResultSet rs = pstmt.executeQuery();

			if(rs.next()) {
				dup = "Y";
			} else {
				dup = "N";
			}

			rs.close();

		} catch (Exception e) {
			e.printStackTrace(System.out);
		} finally {
			if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
			if(conn != null) try{conn.close();}catch(SQLException ex){}
		}
	
		// 중복이 아닐경우 가입.
		if(dup.equals("N")){

			try{
				conn = connect();
				stmt = conn.createStatement();

				String q = "update dbo.e_User set UserName=N'"+userName+"',UserPhone='"+userPhone+"',UserLevel='1' where LoginID ='"+id+"'";
				stmt.executeUpdate(q);
				
				session.setAttribute("USERLEVEL","1");
				session.setAttribute("USERNAME",userName);

				if(device.equals("m")) out.print("joinEventComplete({'result':'success', 'type':'tw', 'id':'"+id+"'})");
				else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=success';</script>");
			} catch (Exception e) {
				e.printStackTrace(System.out);
				if(device.equals("m")) out.print("joinEventComplete({'result':'failed', 'type':'tw', 'e':'"+e+"'})");
				else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=failed';</script>");
			} finally {
				if(stmt != null) try{stmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}
		// 중복일 경우
		} else {
			if(device.equals("m")) out.print("joinEventComplete({'result':'already', 'type':'default', 'id':'"+id+"'})");
			else out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=already';</script>");
		}
	
	} else {
		//out.print("joinEventComplete({'result':'error'})");
		out.print("<script>window.location = '" + redirect + "?callback=joinEventComplete&result=error';</script>");
	}


%>