import java.sql.Date;

public class Invoice
{
    private Date invoiceDate;
    private double hourlyFees;
    private double dropFees;
    private double adjustments;
    private double tips;
    private double total;

    public Invoice(Date invoiceDate, double hourlyFees, double dropFees, double adjustments, double tips, double total)
    {
        this.invoiceDate = invoiceDate;
        this.hourlyFees = hourlyFees;
        this.dropFees = dropFees;
        this.adjustments = adjustments;
        this.tips = tips;
        this.total = total;
    }

    public Invoice() {}

    public Date getDate()
    {
        return this.invoiceDate;
    }

    public double getHourlyFees()
    {
        return this.hourlyFees;
    }

    public double getDropFees()
    {
        return this.dropFees;
    }

    public double getAdjustments()
    {
        return this.adjustments;
    }

    public double getTips()
    {
        return this.tips;
    }

    public double getTotal()
    {
        return this.total;
    }

    public String toString()
    {
        return this.invoiceDate + "  " + this.hourlyFees + " " + this.dropFees + "  " + this.adjustments + " " + this.tips + " " + this.total;
    }
}
