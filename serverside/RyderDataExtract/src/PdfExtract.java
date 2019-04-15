import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;



public class PdfExtract {

    public static void main(String[] args) throws InvalidPasswordException, IOException, ParseException {
        // TODO Auto-generated method stub
        String ryderID = /*args[0];*/"92306";
        String contractString = /*args[1];*/"true";
        boolean newContract = false; //false == old contract type

        if(contractString.equals("true")){
            newContract = true; //true == new contract type
        }

        //for (int i = 1; i < 20; i++) {

        ExtractPdf pdf1 = new ExtractPdf("C:\\MyJavaRepository\\DirectoryWatcher2018\\src\\cache\\"+ryderID +"-"+contractString+".pdf");

        //ExtractPdf pdf2 = new ExtractPdf("C:\\MyJavaRepository\\pdfExtracter\\invoice().pdf");

        LinkedList<Shift> shiftList = new LinkedList<Shift>();					 //init shiftList
        String[] invoiceTextArray1 = pdf1.extract();							 //array of string from invoice1

        LinkedList<Invoice> invoiceList = new LinkedList<Invoice>();			 //init invoice meta information list

        //extractStringArray if invoice is not empty
        if(invoiceTextArray1.length !=0){
            extractStringArray(invoiceTextArray1,shiftList,invoiceList, newContract);
        }

        DatabaseConnect dbc = new DatabaseConnect();							//connect to database

        for (Shift shift : shiftList) {
            dbc.executeInsertShift(shift.getWorkDate(),shift.getDay(), shift.getTimeIn(), shift.getTimeOut(), shift.getHours(),shift.getOrders(),shift.getTotal(), ryderID);
            //queury shiftid

        }
        for (Invoice invoice : invoiceList) {
            //dbc.executeInsertInvoiceInfo(ryderID,invoice.getDate(),invoice.getHourlyFees(),invoice.getDropFees(),invoice.getAdjustments(),invoice.getTips(),invoice.getTotal());
        }
        //queury invoiceid
        //insert invoiceid_ryderid shiftList amount of time loop foreach shift again

        dbc.executeDisplay();
        File ft = new File(pdf1.fileName);
        ft.delete(); 											//delete file from cache once processing is finished
    }
    LinkedList<Shift> invoiceLog = new LinkedList<Shift>();



    private static void extractStringArray(String[] textArray, LinkedList<Shift> shiftList,LinkedList<Invoice> invoiceList, boolean contract) throws ParseException {
        int shiftPosition = 0;
        int shiftCount = 0;
        Date Invoicedate = null;
        int shiftArraySize = 61;
        int shiftArraySizeCount= 0;
        boolean runFlag = false;
        boolean contractType = contract;								 //false == old contract type

        if(textArray.length !=0){
            for(int i = 0; i <= textArray.length-1; i++){
                if(textArray[i].contains("Invoice") &&  textArray[i+1].contains("Date:")){
                    shiftPosition = i+1;								 //move to date value
                    Invoicedate = extractInvoiceDate(textArray,shiftPosition);
                }

                if(textArray[i].contains("Friday") || textArray[i].contains("Saturday")
                        || textArray[i].contains("Sunday") || textArray[i].contains("Monday")
                        || textArray[i].contains("Tuesday") || textArray[i].contains("Wednesday")
                        || textArray[i].contains("Thursday")){

                    shiftPosition = i;
                    shiftCount += 1;
                    shiftArraySize = i;

                    shiftList.add(extractShift(textArray,shiftPosition,shiftArraySizeCount,contractType));
                    runFlag = true;
                }

                shiftArraySizeCount =  i- shiftArraySize;
                if(runFlag){
                    if(textArray[i].contains("Summary")){
                        shiftPosition = i;
                        invoiceList.add(extractInvoice(textArray,shiftPosition,Invoicedate));
                    }
                }
                System.out.println(textArray[i]);
            }

        }
        System.out.println("Shift Count = " + shiftCount);
        System.out.println(shiftList.toString());
        System.out.println(invoiceList.toString());
    }

    private static Date extractInvoiceDate(String[] textArray, int shiftPosition) {
        int position = shiftPosition; //next string
        String dateDay = "";
        int workDate = 0;
        String month = "";
        int workMonth = 0;
        String year = "";
        int workYear = 0;
        position +=1;
        if(!textArray[position].isEmpty()){
            dateDay = textArray[position];
            workDate = Integer.parseInt(dateDay);

        }
        if(!textArray[position].isEmpty()){
            dateDay = textArray[position];
            workDate = Integer.parseInt(dateDay);

        }
        position +=1; //next string
        if(!textArray[position].isEmpty()){
            month = textArray[position];
            if(month.contains("January")){
                workMonth = 1;
            }else if(month.contains("February")){
                workMonth = 2;
            }else if(month.contains("March")){
                workMonth = 3;
            } else if(month.contains("April")){
                workMonth = 4;
            }else if(month.contains("May")){
                workMonth = 5;
            }else if(month.contains("June")){
                workMonth = 6;
            } else if(month.contains("July")){
                workMonth = 7;
            }else if(month.contains("August")){
                workMonth = 8;
            }else if(month.contains("September")){
                workMonth = 9;
            } else if(month.contains("October")){
                workMonth = 10;
            }else if(month.contains("November")){
                workMonth = 11;
            }else if(month.contains("December")){
                workMonth = 12;
            }

        }
        position +=1; //next string
        if(!textArray[position].isEmpty()){
            year = textArray[position];
            workYear = Integer.parseInt(year);

        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy MMM dd");
        // use this format to get always two digits for the day
        DateTimeFormatter f1 = DateTimeFormatter.ofPattern("yyyy MMM dd");
        LocalDate date = LocalDate.of(workYear, workMonth, workDate);
        date.format(formatter);
        date.format(f1);
        Date dateFix = java.sql.Date.valueOf(date);
        return dateFix;
    }

    private static Invoice extractInvoice(String[] textArray, int shiftPosition,Date invoiceDate) {
        int position = shiftPosition;
        String hourlyFees = "";
        double hourlyFee = 0.0;
        String dropFees ="";
        double dropFee = 0.0;
        String tips ="";
        double tip = 0.0;
        String adj = "";
        double adjV = 0.0;
        String total = "";
        double totalV = 0.0;

        //  extract invoice info from array from shiftPosition
        position +=2; //next string

        if(!textArray[position].isEmpty()){
            if(textArray[position].contains("Hourly") && textArray[position+1].contains("Fees")){
                position +=2; //next string

                hourlyFees = textArray[position];
                hourlyFees = hourlyFees.substring(1, hourlyFees.length());
                Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(hourlyFees);
                while (m.find())
                {
                    hourlyFee = Double.parseDouble(m.group(1));
                }
            }
        }
        position +=2; //next string

        if(!textArray[position].isEmpty()){
            if(textArray[position].contains("Drop")){
                position +=2; //next string
                dropFees = textArray[position];
                dropFees = dropFees.substring(1, dropFees.length());
                Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(dropFees);
                while (m.find())
                {
                    dropFee = Double.parseDouble(m.group(1));
                }
            }
        }
        position +=2;
        if(!textArray[position].isEmpty()){
            if(textArray[position].contains("Tips")){
                position +=1; //next string
                tips = textArray[position];
                tips = tips.substring(1, tips.length());
                Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(tips);
                while (m.find())
                {
                    tip = Double.parseDouble(m.group(1));
                }
            }
        }
        position +=2;
        if(!textArray[position].isEmpty()){
            if(textArray[position].contains("Adjustments")){
                position +=1; //next string
                adj = textArray[position];
                adj = adj.substring(1, adj.length());
                Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(adj);
                while (m.find())
                {
                    adjV = Double.parseDouble(m.group(1));
                }
            }else if(textArray[position].contains("Total")){
                position +=1; //next string
                total = textArray[position];
                total = total.substring(1, total.length());
                Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(total);
                while (m.find())
                {
                    totalV = Double.parseDouble(m.group(1));
                }
            }
        }
        position +=2;
        if(!textArray[position].isEmpty()){
            if(textArray[position].contains("Total")){
                position +=1; //next string
                total = textArray[position];
                total = total.substring(1, total.length());
                Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(total);
                while (m.find())
                {
                    totalV = Double.parseDouble(m.group(1));
                }
            }
        }
        double checkTotal = tip + adjV + dropFee;
        if(totalV != checkTotal){
            totalV = tip + adjV + dropFee;
        }
        Invoice invoice = new Invoice(invoiceDate, hourlyFee, dropFee,adjV,tip,totalV);
        return invoice;
    }

    private static Shift extractShift(String[] textArray, int shiftPosition, int shiftArraySize, boolean contractType) throws ParseException {
        String dateDay = "";
        int workDate = 0;
        String month = "";
        int workMonth = 0;
        String year = "";
        int workYear = 0;
        String timeIn = "";
        Time timeInf = null;
        Time timeOutf = null;
        String timeOut = "";
        double hours = 0.0;
        int orders = 0;
        double pay = 0.0;
        String day = "";

        int position = shiftPosition;

        //  extract shift from array from shiftPosition
        if(textArray[position].contains("Friday") || textArray[position].contains("Saturday") || textArray[position].contains("Sunday") ||
                textArray[position].contains("Monday") || textArray[position].contains("Tuesday") || textArray[position].contains("Wednesday") || textArray[position].contains("Thursday")){
            day =textArray[position];
        }
        if(!textArray[shiftPosition+1].isEmpty()){
            dateDay = textArray[shiftPosition+1];
            workDate = Integer.parseInt(dateDay);

        }
        if(!textArray[shiftPosition+2].isEmpty()){
            month = textArray[shiftPosition+2];
            if(month.contains("January")){
                workMonth = 1;
            }else if(month.contains("February")){
                workMonth = 2;
            }else if(month.contains("March")){
                workMonth = 3;
            } else if(month.contains("April")){
                workMonth = 4;
            }else if(month.contains("May")){
                workMonth = 5;
            }else if(month.contains("June")){
                workMonth = 6;
            } else if(month.contains("July")){
                workMonth = 7;
            }else if(month.contains("August")){
                workMonth = 8;
            }else if(month.contains("September")){
                workMonth = 9;
            } else if(month.contains("October")){
                workMonth = 10;
            }else if(month.contains("November")){
                workMonth = 11;
            }else if(month.contains("December")){
                workMonth = 12;
            }
        }

        if(!textArray[shiftPosition+3].isEmpty()){
            year = textArray[shiftPosition+3];
            workYear = Integer.parseInt(year);
        }

        if(!textArray[shiftPosition+4].isEmpty()){
            timeIn = textArray[shiftPosition+4];
            SimpleDateFormat formattime = new SimpleDateFormat("HH:mm");				 //if 24 hour format
            //SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss");

            java.util.Date d1 =(java.util.Date)formattime.parse(timeIn);

            timeInf = new java.sql.Time(d1.getTime());
        }

        if(!textArray[shiftPosition+5].isEmpty()){
            timeOut = textArray[shiftPosition+5];

            SimpleDateFormat formattime = new SimpleDateFormat("HH:mm"); 				//if 24 hour format

            java.util.Date d1 =(java.util.Date)formattime.parse(timeOut);

            timeOutf = new java.sql.Time(d1.getTime());
        }

        if(!textArray[shiftPosition+6].isEmpty()){
            String hoursString = textArray[shiftPosition+6];

            Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(hoursString);
            while (m.find())
            {
                hours = Double.parseDouble(m.group(1));
            }
        }

        if(contractType){
            if(!textArray[shiftPosition+7].isEmpty()){

                String order = textArray[shiftPosition+7];

                order = order.substring(0, order.length()-1);

                orders = Integer.parseInt(order);
            }else{
                //do nothing
            }
        }else{
            if(!textArray[shiftPosition+8].isEmpty()){

                String order = textArray[shiftPosition+8];

                order = order.substring(0, order.length()-1);

                orders = Integer.parseInt(order);
            }else{
                //do nothing
            }
        }

        if(contractType){
            if(shiftArraySize == 11){
                if (textArray[shiftPosition+11].contains("(Includes")){
                    String totalPay = textArray[shiftPosition+17];
                    totalPay = totalPay.substring(1, totalPay.length());
                    Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(totalPay);
                    while (m.find())
                    {
                        pay = Double.parseDouble(m.group(1));
                    }
                }else{
                    String totalPay = textArray[shiftPosition+16];

                    totalPay = totalPay.substring(1, totalPay.length());
                    Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(totalPay);
                    while (m.find())
                    {
                        pay = Double.parseDouble(m.group(1));
                    }
                }

            }else if(shiftArraySize == 17){
                if (textArray[shiftPosition+11].contains("(Includes")){
                    String totalPay = textArray[shiftPosition+17];
                    totalPay = totalPay.substring(1, totalPay.length());
                    Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(totalPay);

                    while (m.find())
                    {
                        pay = Double.parseDouble(m.group(1));
                    }
                }else{
                    String totalPay = textArray[shiftPosition+shiftArraySize-1];
                    totalPay = totalPay.substring(1, totalPay.length());
                    Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(totalPay);
                    while (m.find())
                    {
                        pay = Double.parseDouble(m.group(1));
                    }
                }
            }
        }else{
            //else if contractType is false I.e. old contract type
            if(shiftArraySize == 11){
                if (textArray[shiftPosition+11].contains("(Includes")){

                    String totalPay = textArray[shiftPosition+17];

                    totalPay = totalPay.substring(1, totalPay.length());
                    Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(totalPay);
                    while (m.find())
                    {
                        pay = Double.parseDouble(m.group(1));
                    }
                }else{

                    String totalPay = textArray[shiftPosition+shiftArraySize -1];

                    totalPay = totalPay.substring(1, totalPay.length());
                    Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(totalPay);
                    while (m.find())
                    {
                        pay = Double.parseDouble(m.group(1));
                    }
                }
            }else if(shiftArraySize == 18){
                if (textArray[shiftPosition+11].contains("(Includes")){

                    String totalPay = textArray[shiftPosition+17];

                    totalPay = totalPay.substring(1, totalPay.length());
                    Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(totalPay);
                    while (m.find())
                    {
                        pay = Double.parseDouble(m.group(1));
                    }
                }else{

                    String totalPay = textArray[shiftPosition+10];
                    totalPay = totalPay.substring(1, totalPay.length());
                    Matcher m = Pattern.compile("(?!=\\d\\.\\d\\.)([\\d.]+)").matcher(totalPay);
                    while (m.find())
                    {
                        pay = Double.parseDouble(m.group(1));
                    }
                }
            }
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy MMM dd");

        // use this format to get always two digits for the day

        DateTimeFormatter f1 = DateTimeFormatter.ofPattern("yyyy MMM dd");

        LocalDate date = LocalDate.of(workYear, workMonth, workDate);
        date.format(formatter);

        date.format(f1);

        Date dateFix = java.sql.Date.valueOf(date);

        Shift s = new Shift(dateFix,day, timeInf, timeOutf, hours, orders, pay);


        return s;

    }


}
