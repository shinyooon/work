<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="true" %>
<%@ include file="../lab/conn.jsp" %>
<%@ page import = "org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page import ="java.util.*,java.text.SimpleDateFormat"%>


<%
	String type1_img = "";
	String type2_img = "";
	String type3_img = "";
	String type4_img = "";

	String type1_content = "";
	String type2_content = "";
	String type3_content = "";
	String type4_content = "";

	try{
		conn = connect();
		stmt = conn.createStatement();
		String q = "select top 1 * from dbo.e_Board where Choice = '1' order by BoardSeq desc";

		ResultSet rs = stmt.executeQuery(q);

		if(rs.next()){
			type1_img = rs.getString("Image");
			type1_content = rs.getString("UContent");
		}

		rs.close();
	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(stmt != null) try{stmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}
	try{
		conn = connect();
		stmt = conn.createStatement();
		String q = "select top 1 * from dbo.e_Board where Choice = '2' order by BoardSeq desc";

		ResultSet rs = stmt.executeQuery(q);

		if(rs.next()){
			type2_img = rs.getString("Image");
			type2_content = rs.getString("UContent");
		}

		rs.close();
	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(stmt != null) try{stmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}

	try{
		conn = connect();
		stmt = conn.createStatement();
		String q = "select top 1 * from dbo.e_Board where Choice = '3' order by BoardSeq desc";

		ResultSet rs = stmt.executeQuery(q);

		if(rs.next()){
			type3_img = rs.getString("Image");
			type3_content = rs.getString("UContent");
		}

		rs.close();
	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(stmt != null) try{stmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}

	try{
		conn = connect();
		stmt = conn.createStatement();
		String q = "select top 1 * from dbo.e_Board where Choice = '4' order by BoardSeq desc";

		ResultSet rs = stmt.executeQuery(q);

		if(rs.next()){
			type4_img = rs.getString("Image");
			type4_content = rs.getString("UContent");
		}

		rs.close();
	} catch (Exception e) {
		e.printStackTrace(System.out);
	} finally {
		if(stmt != null) try{stmt.close();}catch(SQLException ex){}
		if(conn != null) try{conn.close();}catch(SQLException ex){}
	}


		StringBuffer xml_list = new StringBuffer();
		xml_list.append("<?xml version=\"1.0\" encoding=\"utf-8\"?> ");
		xml_list.append("\n");
		xml_list.append("<content language='kr'>");
		xml_list.append("\n");

		xml_list.append("<item type='1'>");
		xml_list.append("<img><![CDATA["+type1_img+"]]></img>");
		xml_list.append("<contents><![CDATA["+type1_content+"]]></contents>");
		xml_list.append("</item>");
		xml_list.append("\n");

		xml_list.append("<item type='2'>");
		xml_list.append("<img><![CDATA["+type2_img+"]]></img>");
		xml_list.append("<contents><![CDATA["+type2_content+"]]></contents>");
		xml_list.append("</item>");
		xml_list.append("\n");

		xml_list.append("<item type='3'>");
		xml_list.append("<img><![CDATA["+type3_img+"]]></img>");
		xml_list.append("<contents><![CDATA["+type3_content+"]]></contents>");
		xml_list.append("</item>");
		xml_list.append("\n");

		xml_list.append("<item type='4'>");
		xml_list.append("<img><![CDATA["+type4_img+"]]></img>");
		xml_list.append("<contents><![CDATA["+type4_content+"]]></contents>");
		xml_list.append("</item>");


		xml_list.append("\n");
		xml_list.append("</content>");
		out.print(xml_list);


 
%>