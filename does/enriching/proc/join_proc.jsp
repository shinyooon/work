<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="true" %>
<%@ include file="../lab/conn.jsp" %>
<%@page import = "org.apache.commons.lang3.StringEscapeUtils" %>

<%


	String requestMethod = request.getMethod();
	if (!requestMethod.equals("POST")) {
		response.sendRedirect("../error.jsp");
		return;
	}

// 회원가입 절차.

	String type = request.getParameter("type");



	Connection conn = null;
	Statement stmt = null;
	PreparedStatement pstmt= null;
	int result = 0;

	String accessID = "";
	String accessPW = "";
	String userLevel = "";
	String choice = request.getParameter("choice");

	String dup = "N";	//중복체크.
	
	// 사이트 가입하기.
	if(type.equals("default")){
/*

		String id = StringEscapeUtils.escapeHtml4(request.getParameter("id"));
		String password = StringEscapeUtils.escapeHtml4(request.getParameter("password"));
	
		// 아이디 중복 체크.
		try{
			conn = connect();
			stmt = conn.createStatement();

			String q = "select * from dbo.e_User where LoginID = '" +id+ "'";
			ResultSet rs = stmt.executeQuery(q);

			if(rs.next()) {
				dup = "Y";
			} else {
				dup = "N";
			}

			rs.close();

		} catch (Exception e) {
			e.printStackTrace(System.out);
		} finally {
			if(stmt != null) try{stmt.close();}catch(SQLException ex){}
			if(conn != null) try{conn.close();}catch(SQLException ex){}
		}

		// 중복이 아닐경우 가입.
		if(dup.equals("N")){
			try{
				conn = connect();

				String q = "INSERT INTO dbo.e_User(LoginID, Password, Choice, UserLevel, UserType) values(?,?,?,?,?)";
				pstmt = conn.prepareStatement(q);  //실서버
				pstmt.setString(1,id);
				pstmt.setString(2,password);
				pstmt.setString(3,choice);
				pstmt.setString(4,"1");
				pstmt.setString(5,"default");
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
				
				out.print("joinComplete({'result':'success', 'type':'default', 'id':"+id+"})");
			}else{
				out.print("joinComplete({'result':'failed', 'type':'default', 'id':"+id+"})");
			} 

		} else {
			out.print("joinComplete({'result':'already', 'type':'default', 'id':"+id+"})"); // 중복
		}

		
*/
		
	// 페이스북으로 사이트 가입하기.
	}else if(type.equals("fb")){

		String id = request.getParameter("id");
		String image = request.getParameter("image");
		String displayName = request.getParameter("displayName");
		
		// 아이디 중복 체크.
		try{
			conn = connect();
			stmt = conn.createStatement();

			String q = "select * from dbo.e_User where LoginID = '" +id+ "' and UserType='fb'";
			ResultSet rs = stmt.executeQuery(q);

			if(rs.next()) {
				dup = "Y";
			} else {
				dup = "N";
			}
			rs.close();

		} catch (Exception e) {
			e.printStackTrace(System.out);
		} finally {
			if(stmt != null) try{stmt.close();}catch(SQLException ex){}
			if(conn != null) try{conn.close();}catch(SQLException ex){}
		}

		// 중복이 아닐경우 가입.
		if(dup.equals("N")){
			try{
				conn = connect();

				String q = "INSERT INTO dbo.e_User(LoginID, Choice, UserLevel, UserType, Image, DisplayName) values(?,?,?,?,?,?)";
				pstmt = conn.prepareStatement(q);  //실서버
				pstmt.setString(1,id);
				pstmt.setString(2,choice);
				pstmt.setString(3,"0");
				pstmt.setString(4,"fb");
				pstmt.setString(5,image);
				pstmt.setString(6,displayName);
				result = pstmt.executeUpdate();

			}catch (SQLException e){        
				System.out.println( "SQLException: " + e );
			}finally{	
				if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}
			
				
			if(result == 1){
				session.setAttribute("USERID",id);
				session.setAttribute("CHOICE",choice);
				session.setAttribute("USERLEVEL","0");
				session.setAttribute("TYPE","fb");
				session.setAttribute("IMAGE",image);
				session.setAttribute("DISPLAYNAME",displayName);
				
				out.print("joinComplete({'result':'success', 'type':'fb', 'id':'"+id+"'})");
			}else{
				out.print("joinComplete({'result':'failed', 'type':'fb', 'id':'"+id+"'})");
			}

		} else {
			out.print("joinComplete({'result':'already', 'type':'fb', 'id':'"+id+"'})"); // 중복
		}


	

	//트위터로 사이트 가입하기.
	}else if(type.equals("tw")){
	
		String id = request.getParameter("id");
		String image = request.getParameter("image");
		String displayName = request.getParameter("displayName");
		
		// 아이디 중복 체크.
		try{
			conn = connect();
			stmt = conn.createStatement();

			String q = "select * from dbo.e_User where LoginID = '" +id+ "' and UserType='tw'";
			ResultSet rs = stmt.executeQuery(q);

			if(rs.next()) {
				dup = "Y";
			} else {
				dup = "N";
			}
			rs.close();

		} catch (Exception e) {
			e.printStackTrace(System.out);
		} finally {
			if(stmt != null) try{stmt.close();}catch(SQLException ex){}
			if(conn != null) try{conn.close();}catch(SQLException ex){}
		}

		// 중복이 아닐경우 가입.
		if(dup.equals("N")){
			try{
				conn = connect();

				String q = "INSERT INTO dbo.e_User(LoginID, Choice, UserLevel, UserType, Image, DisplayName) values(?,?,?,?,?,?)";
				pstmt = conn.prepareStatement(q);  //실서버
				pstmt.setString(1,id);
				pstmt.setString(2,choice);
				pstmt.setString(3,"0");
				pstmt.setString(4,"tw");
				pstmt.setString(5,image);
				pstmt.setString(6,displayName);
				result = pstmt.executeUpdate();

			}catch (SQLException e){        
				System.out.println( "SQLException: " + e );
			}finally{	
				if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}
			
				
			if(result == 1){
				session.setAttribute("USERID",id);
				session.setAttribute("CHOICE",choice);
				session.setAttribute("USERLEVEL","0");
				session.setAttribute("TYPE","tw");
				session.setAttribute("IMAGE",image);
				session.setAttribute("DISPLAYNAME",displayName);
				
				out.print("joinComplete({'result':'success', 'type':'tw', 'id':'"+id+"'})");
			}else{
				out.print("joinComplete({'result':'failed', 'type':'tw', 'id':'"+id+"'})");
			} 
			

		} else {
			out.print("joinComplete({'result':'already', 'type':'tw', 'id':'"+id+"'})"); // 중복
		}
	}else{
		out.print("joinComplete({'result':'error'})"); // 해당없을때 에러
	}



%>