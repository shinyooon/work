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

// 자신의 회의록 삭제.
	String board_seq = request.getParameter("board_seq");

	String userID = (String)session.getAttribute("USERID");
	String userType = (String)session.getAttribute("USERTYPE");
	String userLevel = (String)session.getAttribute("USERLEVEL");

	int result = 0;

	String select_userID = "";

	// null check
	if(userLevel != null){ 

		// 댓글 삭제는 이벤트 등록 한 주주만 가능.
		if(userLevel.equals("1")){

			try{
				conn = connect();
				stmt = conn.createStatement();

				// 선택한 seq의 userID를 가져온다.
				String q = "select UserID from dbo.e_Board where BoardSeq = '" +board_seq+ "'";
				ResultSet rs = stmt.executeQuery(q);

				if(rs.next()) {
					select_userID = rs.getString("UserID");
				} else {
					out.print("deleteComplete({'result':'failed'})");
				}
				rs.close();

			} catch (Exception e) {
				e.printStackTrace(System.out);
			} finally {
				if(stmt != null) try{stmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}

			// seq를 이용해 가져온 유저 아이디와 세션에 있는 유저 아이디가 같을 경우 display 'N'로 바뀐다.
			if(userID.equals(select_userID)){ 
				try{
					conn = connect();
					stmt = conn.createStatement();

					String q = "UPDATE dbo.e_Board SET Display = 'N' WHERE UserID = '" +userID+ "' AND BoardSeq = '"+board_seq+"'" ;
					stmt.executeUpdate(q);

				}catch (SQLException e){        
					System.out.println( "SQLException: " + e );
				}finally{	
					if(stmt != null) try{stmt.close();}catch(SQLException ex){}
					if(conn != null) try{conn.close();}catch(SQLException ex){}
				}
				out.print("deleteComplete({'result':'success', 'seq':'"+board_seq+"'})");
			
			} else {
				out.print("deleteComplete({'result':'failed'})");
			}
			
		
		} else { // 주주가입이 되지 않은 경우.
			out.print("joinProcess({'result':'goEvent'})");
		}
	

	} else {
		out.print("joinProcess({'result':'goRegist'})");
	}


%>