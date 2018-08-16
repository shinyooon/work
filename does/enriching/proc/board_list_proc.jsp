<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="true" %>
<%@ include file="../lab/conn.jsp" %>
<%@ page import = "org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page import ="java.util.*,java.text.SimpleDateFormat"%>

<%

// 회의 등록.
	String select_choice = request.getParameter("selectChoice"); // 선택한 타입
	String viewLike = request.getParameter("viewLike"); // 인기순
	String boardType = request.getParameter("boardType"); // 보드 타입

	String userID = (String)session.getAttribute("USERID");
	String userType = (String)session.getAttribute("USERTYPE");
	String userLevel = (String)session.getAttribute("USERLEVEL");

	// 페이징 관련.
	String pageNum = request.getParameter("page");
	if(pageNum == null) pageNum = "1";
	int currentPage = Integer.parseInt(pageNum);

	int PAGE_SIZE = 0; // 보여주는 페이지의 사이즈
	String pageSize = request.getParameter("pageSize");
	if(pageSize == null) {
		PAGE_SIZE = 6;
	}else {
		PAGE_SIZE = Integer.parseInt(pageSize);
	}
	
	int startRow = 1;
	int lastRow = 5;
	startRow = ((currentPage -1) * PAGE_SIZE) +1 ;
	lastRow	= currentPage * PAGE_SIZE ;
	


	int result = 0;
	String select_userID = "";


// 토탈 페이지 카운트.
	int totalCount = 0;
	try{
		conn = connect();
		stmt = conn.createStatement();
		String q = "select count(*) cnt from dbo.e_Board Where BoardType = '" +boardType+ "' AND Display= 'Y'";

		ResultSet rs = stmt.executeQuery(q);
		if(rs.next()){
			totalCount = Integer.parseInt(rs.getString("cnt"));
		}
		rs.close();
	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(stmt != null) try{stmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}


// 게시판 리스트.
	try{
		conn = connect();
		stmt = conn.createStatement();

		String mWhere = "";
		String mOrder = "";

		mWhere += "AND Display = 'Y' ";

		if(boardType != null){
			mWhere += "AND BoardType = '" +boardType+ "' ";
		}

		if(select_choice != null){
			mWhere += "AND Choice = '" +select_choice+ "' ";
		}

		if(viewLike != null){
			mOrder += "LikeCount DESC";	// 인기순으로 보기.
		} else {
			mOrder += "BoardSeq DESC";
		}

		// 선택한 seq의 userID를 가져온다.
		String q = "select * from ( ";
		q += "select row_number() over (order by "+mOrder+") as rownum, * from dbo.e_Board where 1=1 " +mWhere +"";
		q += ") t1 ";
		q += "WHERE t1.rownum between "+startRow+" AND "+lastRow+" ";

		//out.println("query : " + q);

		ResultSet rs = stmt.executeQuery(q);

		String rsStr = "{'result':'success', 'obj':[";

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");

		String regDate = "";
		int length = 0;
		
		while(rs.next()){

			regDate = sdf.format(rs.getDate("RegisterDate"));

			rsStr += "{";
			rsStr += "'boardSeq':'" + rs.getString("BoardSeq") + "',";
/* 			rsStr += "'userID':'" + rs.getString("UserID") + "',"; */
			rsStr += "'userName':'" + rs.getString("UserName") + "',";
			rsStr += "'choice':'" + rs.getString("Choice") + "',";
			rsStr += "'uContent':'" + rs.getString("UContent") + "',";
			rsStr += "'likeCount':'" + rs.getString("LikeCount") + "',";
			rsStr += "'boardType':'" + rs.getString("BoardType") + "',";
			rsStr += "'image':'" + rs.getString("Image") + "',";
			rsStr += "'totalCount':'" + totalCount + "',";
			rsStr += "'registerDate':'" + regDate + "'";

			rsStr += "},";
			
			length++;
		}
		rs.close();
		String str = rsStr.substring(rsStr.length()-1);
		if(str.equals(",")){
			rsStr = rsStr.substring(0,rsStr.length()-1);
			rsStr += "], length:"+length+"}";
			out.print("onlineBoardComplete(" + rsStr + ")");
		}else{
			out.print("onlineBoardComplete({'result':'max'})");
		}
		
		
		
		




	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(stmt != null) try{stmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}
			
%>