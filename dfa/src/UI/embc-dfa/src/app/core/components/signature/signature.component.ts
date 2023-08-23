import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { SignatureBlock } from 'src/app/core/api/models';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})

export class SignatureComponent implements AfterViewInit, OnChanges {

  @ViewChild('canvas', {static: false}) public canvas: ElementRef;

  @Input() isRequired: boolean;
  @Input() whoseSignature: string;
  @Input() initialSignature: SignatureBlock;
  @Output() public signature: EventEmitter<SignatureBlock> = new EventEmitter<SignatureBlock>();

  private canvasEl: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public signatureBlock: SignatureBlock;

  constructor() {
    this.signatureBlock = { signedName: "", dateSigned: "", signature: ""};
  }

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.canvasEl = canvasEl;
    this.context = canvasEl.getContext('2d');
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 1;
    this.captureEvents(canvasEl);
  }

  ngOnChanges(event: SimpleChanges): void {
    console.log(event);
    // reformat date from mm/dd/yyyy to yyyy-mm-dd cant use date pipe since it messes up time zone
    if (this.signatureBlock) {
      if (this.initialSignature?.dateSigned && !this.signatureBlock?.dateSigned) this.signatureBlock.dateSigned  = this.initialSignature?.dateSigned?.substring(6,4) + "-" + this.initialSignature?.dateSigned?.substring(0,2) + "-" + this.initialSignature?.dateSigned?.substring(3,2);
      this.signatureBlock.signedName = this.initialSignature?.signedName;
      this.signatureBlock.signature = this.initialSignature?.signature;
    }

    // Draw signature
    if (this.signatureBlock?.signature) {
      const canvasEl: HTMLCanvasElement = this.canvas?.nativeElement;
      var ctxt = canvasEl?.getContext("2d");
      var background = new Image();
        background.src = this.signatureBlock?.signature;
        background.onload = function() {
          ctxt.drawImage(background, 0, 0, canvasEl?.width, canvasEl?.height);
        };
    }
  }

  // store in signature block to emit
  updateCanvas() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    //this.signatureBlock.signature = canvasEl.toDataURL("image/jpeg").replace(/^data:image\/(png|jpeg);base64,/, "");
    this.signatureBlock.signature = canvasEl.toDataURL();
    this.updateSignatureBlock();
  }

  // emit changes to parent component
  updateSignatureBlock() {
    this.signature.emit(this.signatureBlock);
  }

  // For touch drawing prevent scrolling of page with mouse button down within canvas
  public preventDefault(e: Event) {
    e.preventDefault();
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: canvasEl.width * (res[0].clientX - rect.left) / rect.width,  // scale to canvas size
          y: canvasEl.height * (res[0].clientY - rect.top) / rect.height
        };

        const currentPos = {
          x: canvasEl.width * (res[1].clientX - rect.left) / rect.width,
          y: canvasEl.height * (res[1].clientY - rect.top) / rect.height
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });

      fromEvent(canvasEl, 'touchstart')
      .pipe(
        switchMap((e) => {
          // after a touch start, we'll record all touch moves
          return fromEvent(canvasEl, 'touchmove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the touch
              // this will trigger a 'touchend' event
              takeUntil(fromEvent(canvasEl, 'touchend')),
              // we'll also stop (and unsubscribe) once the touch leaves the canvas (touchcancel event)
              takeUntil(fromEvent(canvasEl, 'touchcancel')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            )
        })
      )
      .subscribe((res: [TouchEvent, TouchEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: canvasEl.width * (res[0].touches[0].clientX - rect.left) / rect.width,
          y: canvasEl.height * (res[0].touches[0].clientY - rect.top) / rect.height
        };

        const currentPos = {
          x: canvasEl.width * (res[1].touches[0].clientX - rect.left) / rect.width,
          y: canvasEl.height * (res[1].touches[0].clientY - rect.top) / rect.height
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.context) { return; }

    // start our drawing path
    this.context.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.context.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.context.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.context.stroke();
    }
  }

  public clearCanvas() {
      this.context
          .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }
}

new SignatureComponent();
