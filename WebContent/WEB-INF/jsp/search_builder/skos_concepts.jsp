<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page contentType="text/html; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@page import="com.openDams.bean.Records"%>
<%@page import="com.openDams.title.configuration.TitleManager"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="com.openDams.bean.Relations"%>
<%@page import="java.util.Set"%>
<%@include file="../locale.jsp"%>
<%
if(request.getAttribute("recordsList")!=null){
	TitleManager titleManager = (TitleManager)request.getAttribute("titleManager");
	List<Records> recordsList = (List<Records>)request.getAttribute("recordsList");
	for(int i=0;i<recordsList.size();i++){
		Records records = recordsList.get(i);
		HashMap<String, String[]> parsedTitle = titleManager.parseTitle(records.getTitle(),records.getArchives().getIdArchive());	
		int tot_children = records.getTotChildren();
		String[] labels = parsedTitle.get("label");
	 	String label ="";
	 	for(int s=0;s<labels.length;s++){
	 		label+=labels[s];
	 	}
		%>
<%@page import="com.regesta.framework.util.JsSolver"%><div class="record_row">
			<div class="record_row">
			    <a href="#no" class="<%if(tot_children>0){%>open_close closed<%}else{%>open_close_leaf leaf<%}%>" idRecord="<%=records.getIdRecord()%>"></a>
			    <input type="radio" class="sel_radio" name="sel_radio" value="<%=records.getIdRecord()%>" disabled="disabled" title="record destinazione"/>
				<input type="checkbox" class="sel_check" value="<%=records.getIdRecord()%>" title="record da selezionare"/>
					 <%
					    boolean deprecated = false;
					 	try{
					 		if(!parsedTitle.get("deprecated")[0].trim().equals("")){
					 			deprecated=true;
					 		}
					 	}catch(NullPointerException ex){}
					 	String query_field = "";
					 	if(records.getArchives().getIdArchive()==1){
					 		query_field = "griglia";
						}else{
							query_field = "eurovoc";
						}
					 %>
				<a href="#no" idRecord="<%=records.getIdRecord()%>"  <%if(deprecated){%>style="color:#808080;" title="voce deprecata"<%}%> class="tree_title clicked_<%=records.getIdRecord()%>" onclick="addFilterToSearch('<%=records.getIdRecord()%>','<%=JsSolver.escapeSingleApex(parsedTitle.get("notation")[0]+" "+label+" ["+records.getArchives().getLabel()+"]")%>');"><%=parsedTitle.get("notation")[0]%> <%=label%></a>
			</div>
			<%if(tot_children>0){
				int page_size = (Integer)request.getAttribute("page_size");
			    int page_tot = 1;
			    if(tot_children > page_size){
			    	if(tot_children % page_size==0 )
			    		page_tot=tot_children/page_size;
					else
						page_tot=(tot_children/page_size)+1;
			    }
			%>
				<div class="record_children record_children_<%=records.getIdRecord()%>">
				<%if(page_tot>1){ %>
				<div class="record_buttons"><div class="arrow_buttons"><a class="first_page_record" title="${arrowFirst}" onclick="next_prew_children_page('<%=records.getIdRecord()%>','first','<%=page_tot%>')"></a><a class="prev_page_record" title="${arrowPrevios}" onclick="next_prew_children_page('<%=records.getIdRecord()%>','previous','<%=page_tot%>')"></a><span class="label_buttons">${arrowPage}<span class="current_page">1</span>${arrowOf} <%=page_tot%></span><a class="next_page_record" title="${arrowNext}" onclick="next_prew_children_page('<%=records.getIdRecord()%>','next','<%=page_tot%>')"><a/><a class="last_page_record" title="${arrowLast}" onclick="next_prew_children_page('<%=records.getIdRecord()%>','last','<%=page_tot%>')"><a/></div></div>
				<%}%>
				<div class="record_list"></div>
				</div>
			<%}%>
			
		</div>
		<%
	}
}%>
