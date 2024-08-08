import { ErrorHandler } from "@angular/core";

export class GlobalErrorhandler implements ErrorHandler {
    handleError(error: any): void {
        var msg = error.message as string;
        console.debug("[DFA] GlobalErrorHandler: " + msg);
        if (msg.startsWith("Failed to fetch dynamically imported module")) {
            console.debug("[DFA] GlobalErrorHandler: reloading");
            //window.location.reload();
        }
    }
}
