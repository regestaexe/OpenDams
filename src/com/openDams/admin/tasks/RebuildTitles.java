package com.openDams.admin.tasks;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
public class RebuildTitles implements Tasklet {
     private SQLRebuildTitles sQLRebuildTitles = null;
     private SQLRebuildIndex sQLRebuildIndex = null;
	 public RepeatStatus execute(StepContribution arg0, ChunkContext arg1) throws Exception {
		 String idArchive = (String)arg1.getStepContext().getJobParameters().get("idArchive");
		 System.out.println("Rigenero titoli per archivio "+idArchive); 
		 sQLRebuildTitles.rebuildTitles(Integer.parseInt(idArchive));
		 System.out.println("Rigenero indici per archivio "+idArchive); 
		 sQLRebuildIndex.rebuildIndex(Integer.parseInt(idArchive));
		 return RepeatStatus.FINISHED;

	 }
	public void setsQLRebuildTitles(SQLRebuildTitles sQLRebuildTitles) {
		this.sQLRebuildTitles = sQLRebuildTitles;
	}
	public void setsQLRebuildIndex(SQLRebuildIndex sQLRebuildIndex) {
		this.sQLRebuildIndex = sQLRebuildIndex;
	}
}
