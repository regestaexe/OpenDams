package com.openDams.bean;

// Generated 18-dic-2009 11.35.39 by Hibernate Tools 3.2.4.GA

/**
 * RelationsId generated by hbm2java
 */
public class RelationsId implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int refIdRecord1;
	private int refIdRecord2;
	private int refIdRelationType;

	public RelationsId() {
	}

	public RelationsId(int refIdRecord1, int refIdRecord2, int refIdRelationType) {
		this.refIdRecord1 = refIdRecord1;
		this.refIdRecord2 = refIdRecord2;
		this.refIdRelationType = refIdRelationType;
	}

	public int getRefIdRecord1() {
		return this.refIdRecord1;
	}

	public void setRefIdRecord1(int refIdRecord1) {
		this.refIdRecord1 = refIdRecord1;
	}

	public int getRefIdRecord2() {
		return this.refIdRecord2;
	}

	public void setRefIdRecord2(int refIdRecord2) {
		this.refIdRecord2 = refIdRecord2;
	}

	public int getRefIdRelationType() {
		return this.refIdRelationType;
	}

	public void setRefIdRelationType(int refIdRelationType) {
		this.refIdRelationType = refIdRelationType;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof RelationsId))
			return false;
		RelationsId castOther = (RelationsId) other;

		return (this.getRefIdRecord1() == castOther.getRefIdRecord1())
				&& (this.getRefIdRecord2() == castOther.getRefIdRecord2())
				&& (this.getRefIdRelationType() == castOther
						.getRefIdRelationType());
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + this.getRefIdRecord1();
		result = 37 * result + this.getRefIdRecord2();
		result = 37 * result + this.getRefIdRelationType();
		return result;
	}

}
