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
	String board_seq = request.getParameter("board_seq");

	String userSessionID = (String)session.getAttribute("USERID");
	String userLevel = (String)session.getAttribute("USERLEVEL");

	int result = 0;
	String q = "";
	int likeTotalCount = 0;

	// null check
	if(userLevel != null){ 

		// 댓글 입력은 이벤트 등록 한 주주만 가능.
		if(userLevel.equals("1")){
			try
			{
				conn = connect();
				stmt = conn.createStatement();

				String mWhere = "";
				mWhere += " AND BoardSeq = '"+ board_seq +"' ";
				mWhere += " AND UserID = '"+ userSessionID +"' ";

				q = "select * from dbo.e_LikeCount ";
				q += "where 1=1 ";
				q += mWhere;
							
				ResultSet rs = stmt.executeQuery(q);

				String userID = "";

				// 해당 댓글에 좋아요를 한적이 있는 경우.
				if(rs.next()) {
					out.print("likeComplete({'result':'already'})");
				} else { // 해당 댓글에 좋아요를 한적이 없으므로, 좋아요를 등록해준다. 
					try{
						conn = connect();

						q = "INSERT INTO dbo.e_LikeCount(BoardSeq, UserID) values(?,?)";
						pstmt = conn.prepareStatement(q);  //실서버

						pstmt.setString(1,board_seq);
						pstmt.setString(2,userSessionID);
						result = pstmt.executeUpdate();

					}catch (SQLException e){        
						System.out.println( "SQLException: " + e );
					}finally{	
						if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
						if(conn != null) try{conn.close();}catch(SQLException ex){}
					}

					if(result == 1) {
						// board table 의 likeCount 1증가.
						try{
							conn = connect();
							stmt = conn.createStatement();

							q = "UPDATE dbo.e_Board SET LikeCount = LikeCount+1 WHERE BoardSeq = '" +board_seq+ "'" ;
							stmt.executeUpdate(q);

						}catch (SQLException e){        
							System.out.println( "SQLException: " + e );
						}finally{	
							if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
							if(conn != null) try{conn.close();}catch(SQLException ex){}
						}

						// 해당 댓글의 좋아요 토탈 카운트를 가져온다.
						try{
							conn = connect();
							stmt = conn.createStatement();

							q = "select count(*) cnt from dbo.e_LikeCount where BoardSeq = '" +board_seq+ "'";
							ResultSet rs1 = stmt.executeQuery(q);

							if(rs1.next()) {
								likeTotalCount = Integer.parseInt(rs1.getString("cnt"));

								out.print("likeComplete({'result':'success', 'likeTotalCount':'"+likeTotalCount+"', 'seq':'"+board_seq+"' })");
							}
							rs1.close();

						} catch (Exception e) {
							e.printStackTrace(System.out);
						} finally {
							if(stmt != null) try{stmt.close();}catch(SQLException ex){}
							if(conn != null) try{conn.close();}catch(SQLException ex){}
						}

					} else {
						out.print("likeComplete({'result':'failed'})");
					}

				


				}

				rs.close();

			}
			catch (SQLException e){        
				System.out.println( "SQLException: " + e );
			}
			finally{
				if(pstmt != null) try{pstmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
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