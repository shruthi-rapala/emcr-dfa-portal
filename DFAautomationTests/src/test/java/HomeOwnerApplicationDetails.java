import dfa.WebDriverManager;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static dfa.WebDriverManager.getDriver;

public class HomeOwnerApplicationDetails {

    private WebDriver driver;


//    @After
//    public void tearDown() {
//        driver.close();
//        driver.quit();
//    }
//    @AfterClass
//    public static void afterClass() {
//        WebDriverManager.instance = null;
//    }


    @Test
    public void test() throws Exception {
        driver = getDriver();
        WebDriverWait driverWait = WebDriverManager.getDriverWait();
        WebElement element = WebDriverManager.getElement();
        WebDriverManager.getElements();

        CreateNewApplicationHomeowner applDetails = new CreateNewApplicationHomeowner();
        applDetails.test();
        Thread.sleep(1000);
        JavascriptExecutor js5 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-4")));
        js5.executeScript("arguments[0].scrollIntoView(true);", element);
        element.sendKeys("3220 Test");

        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-6")));
        element.sendKeys("Victoria");
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-8")));
        element.sendKeys("V8X1G3");

        //Questions
        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-15-input")));
        js2.executeScript("arguments[0].click();", element);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-18-input")));
        js.executeScript("arguments[0].click();", element);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-16")));
        element.sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu");
        Thread.sleep(1000);
        //Is your home a manufactured home?
        JavascriptExecutor js21 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-radio-22 .mat-radio-outer-circle")));
        js21.executeScript("arguments[0].click();", element);
        //As the Home Owner, are you eligible for a BC Home Owner Grant for this property?
        JavascriptExecutor js3 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-radio-24 .mat-radio-outer-circle")));
        js3.executeScript("arguments[0].click();", element);
        JavascriptExecutor js31 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Cause of Damage ')]")));
        js31.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        driver.findElement(By.cssSelector("#mat-checkbox-1 .mat-checkbox-inner-container")).click();
        driver.findElement(By.cssSelector("#mat-checkbox-2 .mat-checkbox-inner-container")).click();
        driver.findElement(By.cssSelector("#mat-checkbox-3 .mat-checkbox-inner-container")).click();
        driver.findElement(By.cssSelector("#mat-checkbox-4 .mat-checkbox-inner-container")).click();




    }
}
