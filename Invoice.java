import javax.lang.model.util.ElementScanner6;

public class Invoice {
  private int _month;
  private int _day;
  private int _year;
  private int _invoiceNum;

  public Invoice(int month, int day, int year, int invoiceNum)

    // set the variables.
    _month = month;
    _day = day;
    _year = year;
    _invoiceNum = invoiceNum;

    // change or modify them if nessasary
    if ( invoiceNum < 1000 )
      _invoiceNum = 0;

    If ( month > 12 || month < 1) {
      _month = 0;
      _day = 0;     //there is no point to having a day if the month is 0.
    else {
      
      switch (month) {
        case 1:  if (day > 31)
                  _day = 31;
                 break;
        case 2:  if ( day > 28 )
                  _day = 28;
                 break;
        case 3:  //etc
                 break;
        case 4:  //etc
                 break;
        case 5:  //etc
                 break;
        case 6:  //etc
                 break;
        case 7:  //etc
                 break;
        case 8:  //etc
                 break;
        case 9:  //etc
                 break;
        case 10: //etc
                 break;
        case 11: //etc
                 break;
        case 12: //etc
                 break;
        default: _day = day;
                 break;
    }
  }
    
  void printMe() {
    System.out.println(//print out the variables)
  }
}

