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

// 회의 등록.
	String selectChoice = request.getParameter("selectChoice");
	String boardType = request.getParameter("boardType");
	String content = StringEscapeUtils.escapeHtml4(request.getParameter("content"));

	String userID = (String)session.getAttribute("USERID");
	String userType = (String)session.getAttribute("USERTYPE");
	String userLevel = (String)session.getAttribute("USERLEVEL");
	String userName = (String)session.getAttribute("USERNAME");
	String userImage = (String)session.getAttribute("IMAGE");
	String displayName = (String)session.getAttribute("DISPLAYNAME");

	int result = 0;

	// null check
	if(userLevel != null){ 

		// 댓글 입력은 이벤트 등록 한 주주만 가능.
		if(userLevel.equals("1")){
			
			try{
				conn = connect();

				String q = "INSERT INTO dbo.e_Board(UserID, UserName, Choice, UContent, LikeCount, Display, Image, BoardType) values(?,N'"+displayName+"',?,N'"+content+"',?,?,?,?)";
				pstmt = conn.prepareStatement(q);  //실서버

				pstmt.setString(1,userID);
				pstmt.setString(2,selectChoice);
				pstmt.setInt(3,0);
				pstmt.setString(4,"Y");
				pstmt.setString(5,userImage);
				pstmt.setString(6,boardType);
				result = pstmt.executeUpdate();

			}catch (SQLException e){        
				System.out.println( "SQLException: " + e );
			}finally{	
				if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}

			if(result == 1) {
				try
				{
					conn = connect();
					stmt = conn.createStatement();

					String mWhere = "";
					mWhere += " AND UserID = '"+ userID +"' ";

					if(boardType != null){
						mWhere += " AND BoardType = '"+ boardType +"' ";
					}

					
					String q = "select * from dbo.e_Board ";
					q += "where 1=1 ";
					q += mWhere;
					q += "order by BoardSeq desc";

//					out.println(q);
								
					ResultSet rs = stmt.executeQuery(q);

					String rsStr = "[";

					if(rs.next()){
						rsStr += "{";
						rsStr += "\"boardSeq\":\"" + rs.getString("BoardSeq") + "\",";
						rsStr += "\"userName\":\"" + rs.getString("UserName") + "\",";
						rsStr += "\"choice\":\"" + rs.getString("Choice") + "\",";
						rsStr += "\"uContent\":\"" + rs.getString("UContent") + "\",";
						rsStr += "\"likeCount\":\"" + rs.getString("LikeCount") + "\",";
						rsStr += "\"boardType\":\"" + rs.getString("BoardType") + "\",";
						rsStr += "\"image\":\"" + rs.getString("Image") + "\",";
						rsStr += "\"registerDate\":\"" + rs.getString("RegisterDate") + "\"";
						rsStr += "},";
					}

					rsStr = rsStr.substring(0,rsStr.length()-1);
					rsStr += "]";
					rs.close();

					out.print("boardSubmitComplete(" + rsStr + ")");

				}
				catch (SQLException e){        
					System.out.println( "SQLException: " + e );
				}
				finally{
					if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
					if(conn != null) try{conn.close();}catch(SQLException ex){}
				}

			} else {
				out.print("boardSubmitComplete({'result':'faild'})");
			}

		
		} else if (userLevel.equals("0")){ // 주주가입은 되어있으나 이벤트 등록을 하지 않은 경우.
			out.print("joinProcess({'result':'goEvent'})");
		
		} else { // 주주가입이 되지 않은 경우.
			out.print("joinProcess({'result':'goRegist'})");
		}

	} else {
		out.print("joinProcess({'result':'notLogin'})");
	}


%>