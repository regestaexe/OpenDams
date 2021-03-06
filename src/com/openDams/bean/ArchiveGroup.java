package com.openDams.bean;

// Generated 9-set-2013 17.20.00 by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;

/**
 * ArchiveGroup generated by hbm2java
 */
public class ArchiveGroup implements java.io.Serializable {

	private Integer idArchiveGroup;
	private String archiveGroupLabel;
	private int archiveGroupOrder;
	private Set archiveses = new HashSet(0);

	public ArchiveGroup() {
	}

	public ArchiveGroup(String archiveGroupLabel, int archiveGroupOrder) {
		this.archiveGroupLabel = archiveGroupLabel;
		this.archiveGroupOrder = archiveGroupOrder;
	}

	public ArchiveGroup(String archiveGroupLabel, int archiveGroupOrder,
			Set archiveses) {
		this.archiveGroupLabel = archiveGroupLabel;
		this.archiveGroupOrder = archiveGroupOrder;
		this.archiveses = archiveses;
	}

	public Integer getIdArchiveGroup() {
		return this.idArchiveGroup;
	}

	public void setIdArchiveGroup(Integer idArchiveGroup) {
		this.idArchiveGroup = idArchiveGroup;
	}

	public String getArchiveGroupLabel() {
		return this.archiveGroupLabel;
	}

	public void setArchiveGroupLabel(String archiveGroupLabel) {
		this.archiveGroupLabel = archiveGroupLabel;
	}

	public int getArchiveGroupOrder() {
		return this.archiveGroupOrder;
	}

	public void setArchiveGroupOrder(int archiveGroupOrder) {
		this.archiveGroupOrder = archiveGroupOrder;
	}

	public Set getArchiveses() {
		return this.archiveses;
	}

	public void setArchiveses(Set archiveses) {
		this.archiveses = archiveses;
	}

}
