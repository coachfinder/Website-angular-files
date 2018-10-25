export class a9 {
    clientName : string;
    clientID : number;
    eventType : string;
    segmentNumber : number ;
    segmentName : string;

    constructor(clientName, clientID,eventType, segmentNumber,segmentName){
        
        this.clientName = clientName;
        this.clientID = clientID;
        this.eventType = eventType;
        this.segmentNumber = segmentNumber;
        this.segmentName = segmentName;
    }
}
