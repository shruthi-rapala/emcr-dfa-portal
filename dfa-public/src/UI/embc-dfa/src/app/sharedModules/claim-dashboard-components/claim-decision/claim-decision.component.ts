import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DfaClaimMain, Invoice } from 'src/app/core/api/models';
import { ClaimService, InvoiceService } from 'src/app/core/api/services';
import { CoreModule } from 'src/app/core/core.module';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { DFAClaimMainDataService } from 'src/app/feature-components/dfa-claim-main/dfa-claim-main-data.service';
import { DFAClaimMainMappingService } from 'src/app/feature-components/dfa-claim-main/dfa-claim-main-mapping.service';
@Component({
  selector: 'app-claim-decision',
  standalone: true,
  imports: [CoreModule, MatCardModule, MatTableModule, CommonModule,],
  templateUrl: './claim-decision.component.html',
  styleUrl: './claim-decision.component.scss',
})
export class ClaimDecisionComponent implements OnInit {

  recoveryClaim?: DfaClaimMain;
  recoveryClaimFormAbstract: [];

  documentSummaryColumnsToDisplay = ['invoiceNumber', 'vendorName', 'invoiceDate', 'totalBeingClaimed', 'invoiceAmount', 'emcrApprovedAmount'];
  documentSummaryDataSource = new MatTableDataSource<InvoiceExtended>();
  documentSummaryDataSourceFiltered = new MatTableDataSource<InvoiceExtended>();
  invoicesCount: number = 0;
  formCreationService: FormCreationService;



  constructor(
    private claimService: ClaimService,
    private route: ActivatedRoute,
    public dfaClaimMainDataService: DFAClaimMainDataService,
    private invoiceService: InvoiceService,
    
  ) { }

  ngOnInit(): void {
    var claimId = this.route.snapshot.paramMap.get('id');
    console.log('Claim ID from route:', claimId);
    if (claimId) {
      this.getRecoveryClaim(claimId);
    }

    // Get Recovery Claim Invoices
    if( claimId) {
      this.getRecoveryInvoices(claimId);
    }

  }


  getRecoveryClaim(claimId: string) {
    if (claimId) {
      this.claimService.claimGetClaimMain({ claimId: claimId }).subscribe({
        next: (dfaClaimMain) => {
          this.recoveryClaim = dfaClaimMain;
          //this.dfaClaimMainMapping.mapDFAClaimMain(dfaClaimMain);
          console.log('Recovery Claim:', this.recoveryClaim);
        },
        error: (_error) => { }
      });
    }
  }

  getRecoveryInvoices(claimId: string) {
    if (claimId) {
      this.invoiceService.invoiceGetDfaInvoices({ claimId: claimId }).subscribe({
        next: (lstInv) => {
          var lstInvoices = [];

          lstInv.forEach((objInv) => {
            lstInvoices.push({
              invoiceId: objInv.invoiceId,
              invoiceNumber: objInv.invoiceNumber,
              vendorName: objInv.vendorName,
              invoiceDate: new Date(objInv.invoiceDate),
              isGoodsReceivedonInvoiceDate: objInv.isGoodsReceivedonInvoiceDate,
              goodsReceivedDate: objInv.goodsReceivedDate
                ? new Date(objInv.goodsReceivedDate)
                : objInv.goodsReceivedDate,
              purposeOfGoodsServiceReceived: objInv.purposeOfGoodsServiceReceived,
              isClaimforPartofTotalInvoice: objInv.isClaimforPartofTotalInvoice,
              reasonClaimingPartofTotalInvoice: objInv.reasonClaimingPartofTotalInvoice,
              netInvoiceBeingClaimed: objInv.netInvoiceBeingClaimed,
              pst: objInv.pst,
              grossGST: objInv.grossGST,
              actualInvoiceTotal: objInv.actualInvoiceTotal,
              eligibleGST: objInv.eligibleGST,
              totalBeingClaimed: objInv.totalBeingClaimed,
              emcrDecision: objInv.emcrDecision,
              emcrApprovedAmount: objInv.emcrApprovedAmount,
              decisionDate: objInv.decisionDate ? new Date(objInv.decisionDate) : objInv.decisionDate,
              emcrDecisionComments: objInv.emcrDecisionComments
            });
          });

          this.documentSummaryDataSource.data = lstInvoices;
          this.documentSummaryDataSourceFiltered.data = this.documentSummaryDataSource.data;
          this.invoicesCount = this.documentSummaryDataSource.data.length;

          // this.formCreationService.recoveryClaimForm.value
          //   .get('invoices')
          //   .setValue(this.documentSummaryDataSource.data);
          // this.formCreationService.recoveryClaimForm.value.updateValueAndValidity();

          // if (this.dfaClaimMainDataService.recoveryClaim) {
          //   this.dfaClaimMainDataService.recoveryClaim.invoices = this.documentSummaryDataSource.data;
          //   this.SummaryClaimCalc();
          // }
        },
        error: (_error) => { }
      });
    }
  }

  BackToDashboard() {
  }


}

export interface InvoiceExtended extends Invoice {
  invoiceId?: string;
}

