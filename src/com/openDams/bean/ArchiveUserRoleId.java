package com.openDams.bean;

// Generated 20-gen-2011 13.02.45 by Hibernate Tools 3.2.4.GA

/**
 * ArchiveUserRoleId generated by hbm2java
 */
public class ArchiveUserRoleId implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8149521681274612271L;
	private int refIdArchive;
	private int refIdUser;
	private int refIdRole;

	public ArchiveUserRoleId() {
	}

	public ArchiveUserRoleId(int refIdArchive, int refIdUser, int refIdRole) {
		this.refIdArchive = refIdArchive;
		this.refIdUser = refIdUser;
		this.refIdRole = refIdRole;
	}

	public int getRefIdArchive() {
		return this.refIdArchive;
	}

	public void setRefIdArchive(int refIdArchive) {
		this.refIdArchive = refIdArchive;
	}

	public int getRefIdUser() {
		return this.refIdUser;
	}

	public void setRefIdUser(int refIdUser) {
		this.refIdUser = refIdUser;
	}

	public int getRefIdRole() {
		return this.refIdRole;
	}

	public void setRefIdRole(int refIdRole) {
		this.refIdRole = refIdRole;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof ArchiveUserRoleId))
			return false;
		ArchiveUserRoleId castOther = (ArchiveUserRoleId) other;

		return (this.getRefIdArchive() == castOther.getRefIdArchive())
				&& (this.getRefIdUser() == castOther.getRefIdUser())
				&& (this.getRefIdRole() == castOther.getRefIdRole());
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + this.getRefIdArchive();
		result = 37 * result + this.getRefIdUser();
		result = 37 * result + this.getRefIdRole();
		return result;
	}

}