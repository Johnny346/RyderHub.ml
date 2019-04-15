import java.sql.Date;
import java.sql.Time;

public class Shift
{
    private Date workDate;
    private String day;
    private Time timeIn;
    private Time timeOut;
    private double hours;
    private int ordersDelivered;
    private double total;

    public Shift(Date workDate, String day, Time timeIn, Time timeOut, double hours, int ordersDelievered, double total)
    {
        this.workDate = workDate;
        this.day = day;
        this.timeIn = timeIn;
        this.timeOut = timeOut;
        this.hours = hours;
        this.ordersDelivered = ordersDelievered;
        this.total = total;
    }

    public Date getWorkDate()
    {
        return this.workDate;
    }

    public String getDay()
    {
        return this.day;
    }

    public Time getTimeIn()
    {
        return this.timeIn;
    }

    public Time getTimeOut()
    {
        return this.timeOut;
    }

    public double getHours()
    {
        return this.hours;
    }

    public int getOrders()
    {
        return this.ordersDelivered;
    }

    public double getTotal()
    {
        return this.total;
    }

    public String toString()
    {
        return this.workDate + "  " + this.timeIn + " " + this.timeOut + "  " + "Hours " + this.hours + " " + "Orders " + this.ordersDelivered + " " + "total " + this.total;
    }
}
